/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useApolloClient } from '@apollo/client'
import { boardPageStyles } from '../../styles/styles'
import ColumnList from '../column/ColumnList'
import useBoardById from '../../graphql/board/hooks/useBoardById'
import useMoveTaskInColumn from '../../graphql/task/hooks/useMoveTaskInColumn'
import useMoveTaskFromColumn from '../../graphql/task/hooks/useMoveTaskFromColumn'
import useMoveColumn from '../../graphql/column/hooks/useMoveColumn'
import useAddColumn from '../../graphql/column/hooks/useAddColumn'
import { onDragEnd } from '../../utils/onDragEnd'
import '../../styles.css'

const Board = ({ id }) => {
    const { data, loading } = useBoardById(id)
    const [moveTaskInColumn] = useMoveTaskInColumn()
    const [moveTaskFromColumn] = useMoveTaskFromColumn()
    const [moveColumn] = useMoveColumn()
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
                <Grid container item direction="row" classes={{ root: classes.boardTitle }}>
                    <h1>{board.name}</h1>
                </Grid>
                <DragDropContext onDragEnd={(result) => onDragEnd(result, moveTaskInColumn, moveTaskFromColumn, moveColumn, client, columns, board)}>
                    <Grid item container direction="row">
                        <Droppable droppableId={id} direction="horizontal" type="column">
                            {(provided) => (
                                <Grid classes={{ root: classes.columnRow }} item container {...provided.droppableProps} ref={provided.innerRef}>
                                    <ColumnList columns={columns} columnOrder={columnOrder} />
                                    {provided.placeholder}
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
                            )}
                        </Droppable>

                    </Grid>
                </DragDropContext>
            </Grid>
        </div>
    )
}
export default Board
