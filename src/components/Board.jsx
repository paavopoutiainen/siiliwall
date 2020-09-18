/* eslint-disable max-len */
import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import { DragDropContext } from 'react-beautiful-dnd'
import { useApolloClient } from '@apollo/client'
import { boardPageStyles } from '../styles/styles'
import ColumnList from './ColumnList'
import useBoardById from '../graphql/board/hooks/useBoardById'
import useMoveTaskInColumn from '../graphql/task/hooks/useMoveTaskInColumn'
import useMoveTaskFromColumn from '../graphql/task/hooks/useMoveTaskFromColumn'
import useAddColumn from '../graphql/column/hooks/useAddColumn'
import { onDragEnd } from '../utils/onDragEnd'
import '../styles.css'

const Board = ({ id }) => {
    const { data, loading } = useBoardById(id)
    const [changeTaskOrderInColumn] = useMoveTaskInColumn()
    const [changeTaskOrdersInColumns] = useMoveTaskFromColumn()
    const client = useApolloClient()
    const classes = boardPageStyles()
    const [columnName, setColumnName] = useState('')
    const [addColumn] = useAddColumn(id)

    const handleChange = (event) => {
        setColumnName(event.target.value)
    }

    const handleSave = () => {
        addColumn({
            variables: {
                boardId: id,
                columnName,
            },
        })
        setColumnName('')
    }

    if (loading) return null

    const board = data.boardById
    const { columnOrder, columns } = board

    return (
        <div className="container">
            <Grid
                container
                direction="column"
                classes={{ root: classes.root }}
                spacing={2}
            >
                <Grid container item direction="row" justify="center" classes={{ root: classes.boardTitle }}>
                    <h1>{board.name}</h1>
                </Grid>
                <DragDropContext onDragEnd={(result) => onDragEnd(result, changeTaskOrderInColumn, changeTaskOrdersInColumns, client, columns, board)}>
                    <Grid item container direction="row">
                        <ColumnList columns={columns} columnOrder={columnOrder} />
                        <Grid item>
                            <TextField
                                margin="dense"
                                name="title"
                                label="Name"
                                type="text"
                                value={columnName}
                                fullWidth
                                onChange={handleChange}
                            />
                            <Button
                                disabled={!columnName.length}
                                color="primary"
                                onClick={handleSave}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </DragDropContext>
            </Grid>
        </div>
    )
}
export default Board
