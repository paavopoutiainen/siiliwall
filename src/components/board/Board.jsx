/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useApolloClient } from '@apollo/client'
import { boardPageStyles } from '../../styles/styles'
import ColumnList from '../column/ColumnList'
import useMoveTicketInColumn from '../../graphql/ticket/hooks/useMoveTicketInColumn'
import useMoveTicketFromColumn from '../../graphql/ticket/hooks/useMoveTicketFromColumn'
import useMoveColumn from '../../graphql/column/hooks/useMoveColumn'
import { onDragEnd } from '../../utils/onDragEnd'
import SnackbarAlert from '../SnackbarAlert'
import '../../styles.css'

const Board = ({ board }) => {
    const [moveTicketInColumn] = useMoveTicketInColumn()
    const [moveTicketFromColumn] = useMoveTicketFromColumn()
    const [moveColumn] = useMoveColumn()
    const client = useApolloClient()
    const classes = boardPageStyles()
    const [snackbarStatus, setSnackbarStatus] = useState(false)
    const [snackbarAction, setSnackbarAction] = useState(null)

    const toggleSnackbar = (action) => {
        setSnackbarAction(action)
        setSnackbarStatus(!snackbarStatus)
    }

    const { columnOrder, columns } = board

    return (
        <Grid
            container

        >
            <DragDropContext onDragEnd={(result) => onDragEnd(result, moveTicketInColumn, moveTicketFromColumn, moveColumn, client, columns, board, toggleSnackbar)}>

                <Droppable droppableId={board.id} direction="horizontal" type="column">
                    {(provided) => (
                        <Grid
                            item
                            container
                            direction="row"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            spacing={2}
                        >
                            <Grid item><ColumnList columns={columns} columnOrder={columnOrder} boardId={board.id} /></Grid>
                            {provided.placeholder}

                        </Grid>
                    )}
                </Droppable>

            </DragDropContext>
            <Grid container item>
                <SnackbarAlert snackbarStatus={snackbarStatus} toggleSnackbar={toggleSnackbar} snackbarAction={snackbarAction} />
            </Grid>
        </Grid>
    )
}
export default Board
