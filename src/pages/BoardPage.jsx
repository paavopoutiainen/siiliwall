import React, { useState, useEffect } from 'react'
import {
    Grid, FormControlLabel, Switch,
} from '@material-ui/core'
import { useApolloClient, useSubscription, gql } from '@apollo/client'
import Board from '../components/board/Board'
import SwimlaneView from '../components/swimlane/SwimlaneView'
import { boardPageStyles } from '../styles/styles'
import useBoardById from '../graphql/board/hooks/useBoardById'
import { TICKETORDER_AND_TASKS, SWIMLANE_ORDER } from '../graphql/fragments'

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
        swimlaneOrderNumber
        column {
            id
        }
        board {
            id
        }
      }
    }
  }
`

const BoardPage = ({ id }) => {
    const classes = boardPageStyles()
    const [view, toggleView] = useState('kanban')
    const queryResult = useBoardById(id)
    const client = useApolloClient()
    const { data, loading } = useSubscription(
        TASK_SUBSCRIPTION,
        { variables: { boardId: id } },
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
        // Update the board's swimlaneOrder
        const boardIdForCache = `Board:${addedTask.board.id}`
        const { swimlaneOrder } = client.readFragment({
            id: boardIdForCache,
            fragment: SWIMLANE_ORDER,
        })
        client.writeFragment({
            id: boardIdForCache,
            fragment: SWIMLANE_ORDER,
            data: {
                swimlaneOrder: swimlaneOrder.filter((id) => id !== addedTask.id),
            },
        })
    }, [data, client])

    if (queryResult.loading) return null

    const board = queryResult.data.boardById
    const switchView = () => {
        toggleView(view === 'kanban' ? 'swimlane' : 'kanban')
    }

    return (
        <Grid
            container
            direction="row"
            classes={{ root: classes.root }}
            id="boardElement"
            spacing={3}
        >
            <Grid container item direction="column" justify="space-between" classes={{ root: classes.boardHeader }} id="boardHeader">
                <Grid item>
                    <h1>{board.name}</h1>
                </Grid>
                <Grid item classes={{ root: classes.switchView }}>
                    <FormControlLabel
                        control={<Switch onChange={switchView} />}
                        label="Show swimlanes"
                        labelPlacement="end"
                    />
                </Grid>
            </Grid>

            <Grid item classes={{ root: classes.boardView }}>
                {view === 'kanban' ? <Board board={board} /> : <SwimlaneView board={board} />}
            </Grid>
        </Grid>
    )
}
export default BoardPage
