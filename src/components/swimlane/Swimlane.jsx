/* eslint-disable array-callback-return */
import React from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { useApolloClient } from '@apollo/client'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneHeader from './SwimlaneHeader'
import SwimlaneColumnList from './SwimlaneColumnList'
import {
    PRIORITIZED_AND_SWIMLANEORDERNUMBER,
} from '../../graphql/fragments'
import useUnPrioritizeTask from '../../graphql/task/hooks/useUnPrioritizeTask'

const Swimlane = ({ tasksInOrder, task, index }) => {
    const classes = swimlaneStyles()
    const client = useApolloClient()
    const [unPrioritizeTask] = useUnPrioritizeTask()

    const removePrioritization = () => {
        client.writeFragment({
            id: `Task:${task.id}`,
            fragment: PRIORITIZED_AND_SWIMLANEORDERNUMBER,
            data: {
                prioritized: false,
                swimlaneOrderNumber: null,
            },
        })
        // When swimlane/task gets unprioritized we have to change the swimlaneOrderNumber of
        // all the prioritized tasks beneath the swimlane
        const prioritizedTasksBeneathTheSwimlane = tasksInOrder
            .filter((taskObj) => taskObj.prioritized)
            .filter((taskObj) => taskObj.id !== task.id)
            .filter((taskObj) => taskObj.swimlaneOrderNumber > task.swimlaneOrderNumber)
        // Update the cache
        prioritizedTasksBeneathTheSwimlane.map((taskObj) => {
            client.writeFragment({
                id: `Task:${taskObj.id}`,
                fragment: PRIORITIZED_AND_SWIMLANEORDERNUMBER,
                data: {
                    prioritized: true,
                    swimlaneOrderNumber: taskObj.swimlaneOrderNumber - 1,
                },
            })
        })
        // SwimlaneOrderNumbers need to be updatetd to the database aswell
        const prioritizedTasksBeneathTheSwimlaneIds = prioritizedTasksBeneathTheSwimlane.map((taskObj) => taskObj.id)

        unPrioritizeTask({
            variables: {
                id: task.id,
                prioritizedTaskIds: prioritizedTasksBeneathTheSwimlaneIds,
            },
        })
    }
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Grid
                    container
                    direction="column"
                    spacing={3}
                    classes={{ root: classes.swimlane }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid item><SwimlaneHeader taskName={task.title} /></Grid>
                    {task.prioritized ? <Grid item><button onClick={() => removePrioritization()}>remove prio</button></Grid> : null}
                    <Grid item><SwimlaneColumnList swimlaneColumns={task.swimlaneColumns} taskId={task.id} /></Grid>
                </Grid>
            )}
        </Draggable>

    )
}
export default Swimlane
