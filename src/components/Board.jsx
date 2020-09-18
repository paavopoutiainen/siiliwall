/* eslint-disable max-len */
import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import { DragDropContext } from 'react-beautiful-dnd'
import { useMutation, useApolloClient } from '@apollo/client'
import { boardPageStyles } from '../styles/styles'
import ColumnList from './ColumnList'
import { useBoardById } from '../graphql/board/hooks/useBoardById'
import { BOARD_BY_ID } from '../graphql/board/boardQueries'
import { COLUMNORDER_AND_COLUMNS } from '../graphql/fragments'
import { CHANGE_TASKORDER_IN_COLUMN, CHANGE_TASKORDER_IN_TWO_COLUMNS, ADD_COLUMN } from '../graphql/mutations'
import { onDragEnd } from '../utils/onDragEnd'
import '../styles.css'

const Board = ({ id }) => {
    const { data, loading } = useBoardById(id)

    const [changeTaskOrderInColumn] = useMutation(CHANGE_TASKORDER_IN_COLUMN)
    const [changeTaskOrdersInColumns] = useMutation(CHANGE_TASKORDER_IN_TWO_COLUMNS)
    const client = useApolloClient()
    const classes = boardPageStyles()
    const [columnName, setColumnName] = useState('')
    const [addColumn] = useMutation(ADD_COLUMN, {
        update: async (cache, response) => {
            const cached = cache.readQuery({ query: BOARD_BY_ID, variables: { boardId: id } })
            const { columns, columnOrder } = cached.boardById
            const newColumns = columns.concat(response.data.addColumnForBoard)
            const newColumnOrder = columnOrder.concat(response.data.addColumnForBoard.id)

            client.writeFragment({
                id: `Board:${id}`,
                fragment: COLUMNORDER_AND_COLUMNS,
                data: {
                    columnOrder: newColumnOrder,
                    columns: newColumns,
                },
            })
        },
    })

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
