/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useApolloClient } from '@apollo/client'
import { boardPageStyles } from '../../styles/styles'
import ColumnList from '../column/ColumnList'
import useMoveTicketInColumn from '../../graphql/ticket/hooks/useMoveTicketInColumn'
import useMoveTicketFromColumn from '../../graphql/ticket/hooks/useMoveTicketFromColumn'
import useMoveColumn from '../../graphql/column/hooks/useMoveColumn'
import useAddColumn from '../../graphql/column/hooks/useAddColumn'
import { onDragEnd } from '../../utils/onDragEnd'
import SnackbarAlert from '../SnackbarAlert'
import '../../styles.css'

const Board = ({ board }) => {
    const [moveTicketInColumn] = useMoveTicketInColumn()
    const [moveTicketFromColumn] = useMoveTicketFromColumn()
    const [moveColumn] = useMoveColumn()
    const client = useApolloClient()
    const classes = boardPageStyles()
    const [columnName, setColumnName] = useState('')
    const [addColumn] = useAddColumn(board.id)
    const [snackbarStatus, setSnackbarStatus] = useState(false)
    const [snackbarAction, setSnackbarAction] = useState(null)

    const toggleSnackbar = (action) => {
        setSnackbarAction(action)
        setSnackbarStatus(!snackbarStatus)
    }

    const handleChange = (event) => {
        setColumnName(event.target.value)
    }

    const handleSave = () => {
        addColumn({
            variables: {
                boardId: board.id,
                columnName,
            },
        })
        setColumnName('')
    }

    const { columnOrder, columns } = board

    return (
        <Grid
            container
            direction="column"
            spacing={2}
            id="columnRow"
        >
            <DragDropContext onDragEnd={(result) => onDragEnd(result, moveTicketInColumn, moveTicketFromColumn, moveColumn, client, columns, board, toggleSnackbar)}>
                <Grid item container direction="row">
                    <Droppable droppableId={board.id} direction="horizontal" type="column">
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
            <Grid container item>
                <SnackbarAlert snackbarStatus={snackbarStatus} toggleSnackbar={toggleSnackbar} snackbarAction={snackbarAction} />
            </Grid>
        </Grid>
    )
}
export default Board