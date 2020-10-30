/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useApolloClient, useSubscription, gql } from '@apollo/client'
import ColumnList from '../column/ColumnList'
import useMoveTicketInColumn from '../../graphql/ticket/hooks/useMoveTicketInColumn'
import useMoveTicketFromColumn from '../../graphql/ticket/hooks/useMoveTicketFromColumn'
import useMoveColumn from '../../graphql/column/hooks/useMoveColumn'
import { onDragEnd } from '../../utils/onDragEnd'
import SnackbarAlert from '../SnackbarAlert'
import { TICKETORDER_AND_TASKS, SWIMLANE_ORDER } from '../../graphql/fragments'
import '../../styles.css'

const TASK_SUBSCRIPTION = gql`
  subscription taskMutated($boardId: ID!) {
    taskMutated(boardId: $boardId) {
      mutationType
      node {
        id
        title
        size
        owner {
          id
          userName
        }
        members {
            id
            userName
        }
        description
        prioritized
        swimlaneOrderNumber
        column {
            id
        }
      }
    }
  }
`

const Board = ({ board }) => {
    const [moveTicketInColumn] = useMoveTicketInColumn()
    const [moveTicketFromColumn] = useMoveTicketFromColumn()
    const [moveColumn] = useMoveColumn()
    const client = useApolloClient()
    const [snackbarStatus, setSnackbarStatus] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState(null)
    const { data, loading } = useSubscription(
        TASK_SUBSCRIPTION,
        { variables: { boardId: board.id } },

    )
    useEffect(() => {
        if (!data) return
        console.log('herre', data.taskMutated.node)
        // Update the column's tasks and ticketOrder lists
        const addedTask = data.taskMutated.node
        const columnIdForCache = `Column:${addedTask.column.id}`
        const { ticketOrder, tasks } = client.readFragment({
            id: columnIdForCache,
            fragment: TICKETORDER_AND_TASKS,
        })
        const newTasks = tasks.concat(addedTask)
        const newTicketOrder = ticketOrder.concat({ ticketId: addedTask.id, type: 'task' })
        client.writeFragment({
            id: columnIdForCache,
            fragment: TICKETORDER_AND_TASKS,
            data: {
                ticketOrder: newTicketOrder,
                tasks: newTasks,
            },
        })
    }, [data, client])

    const toggleSnackbar = (message) => {
        setSnackbarMessage(message)
        setSnackbarStatus(!snackbarStatus)
    }

    const { columnOrder, columns } = board

    return (
        <Grid container>
            <DragDropContext onDragEnd={(result) => onDragEnd(
                result, moveTicketInColumn, moveTicketFromColumn, moveColumn, client, columns, board, toggleSnackbar,
            )}
            >

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
                <SnackbarAlert snackbarStatus={snackbarStatus} toggleSnackbar={toggleSnackbar} message={snackbarMessage} />
            </Grid>
        </Grid>
    )
}
export default Board
