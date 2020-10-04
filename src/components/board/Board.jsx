/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useState } from 'react'
import {
    Grid, TextField, Button, FormControlLabel, Switch,
} from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import {
    useApolloClient,
} from '@apollo/client'
import { boardPageStyles } from '../../styles/styles'
import ColumnList from '../column/ColumnList'
import useBoardById from '../../graphql/board/hooks/useBoardById'
import useMoveTicketInColumn from '../../graphql/ticket/hooks/useMoveTicketInColumn'
import useMoveTicketFromColumn from '../../graphql/ticket/hooks/useMoveTicketFromColumn'
import useMoveColumn from '../../graphql/column/hooks/useMoveColumn'
import useAddColumn from '../../graphql/column/hooks/useAddColumn'
import { onDragEnd } from '../../utils/onDragEnd'
import '../../styles.css'

const Board = ({ id }) => {
    const { data, loading } = useBoardById(id)
    const [moveTicketInColumn] = useMoveTicketInColumn()
    const [moveTicketFromColumn] = useMoveTicketFromColumn()
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
                <Grid container item direction="row" justify="space-between">
                    <Grid item>
                        <h1>{board.name}</h1>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={<Switch />}
                            label="Show swimlanes"
                            labelPlacement="end"
                        />
                    </Grid>

                </Grid>
                <DragDropContext onDragEnd={(result) => onDragEnd(result, moveTicketInColumn, moveTicketFromColumn, moveColumn, client, columns, board)}>
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
                                            id="inputColumnName"
                                        />
                                        <Button
                                            disabled={!columnName.length}
                                            color="primary"
                                            onClick={handleSave}
                                            id="addColumnButton"
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
