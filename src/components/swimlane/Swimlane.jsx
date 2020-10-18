/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
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
    const [show, setShow] = useState(false)
    const client = useApolloClient()
    const [unPrioritizeTask] = useUnPrioritizeTask()

    const handleShowClick = () => {
        setShow(!show)
    }

    const removePrioritization = () => {
        client.writeFragment({
            id: `Task:${task.id}`,
            fragment: PRIORITIZED_AND_SWIMLANEORDERNUMBER,
            data: {
                prioritized: false,
                swimlaneOrderNumber: null,
            },
        })
        // When swimlane/task gets unprioritized we have to change the swimlaneOrderNumbers of
        // all the prioritized tasks the unprioritization affects
        // These are the indexes between the swimlaneOrderNumber and indexInNormalFlow of the unprioritized task
        // TODO: THIS LOGIC IS NOT YET PERFECT - there might be cases where swimlaneorderNumbers of the tasks above needs to be changed
        const affectedPrioritizedTasks = tasksInOrder
            .filter((taskObj) => taskObj.prioritized)
            .filter((taskObj) => taskObj.id !== task.id)
            .filter((taskObj) => taskObj.swimlaneOrderNumber > task.swimlaneOrderNumber
                                && taskObj.swimlaneOrderNumber < task.indexInNormalFlow)

        // Update the cache
        affectedPrioritizedTasks.map((taskObj) => {
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
        const affectedPrioritizedTaskIds = affectedPrioritizedTasks
            .map((taskObj) => taskObj.id)

        unPrioritizeTask({
            variables: {
                id: task.id,
                prioritizedTaskIds: affectedPrioritizedTaskIds,
            },
        })
    }
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    classes={{ root: classes.swimlane }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid item><SwimlaneHeader taskName={task.title} /></Grid>
                    <Grid item container direction="row">
                        <Grid item>
                            <Button size="small" variant="outlined" onClick={() => handleShowClick()}>{show ? 'hide' : 'show'}</Button>
                        </Grid>
                        {task.prioritized
                                && (
                                    <Grid item>
                                        <Button variant="outlined" size="small" onClick={() => removePrioritization()}>remove prioritization</Button>
                                    </Grid>
                                )}
                    </Grid>
                    {show
                    && (
                        <Grid item>
                            <SwimlaneColumnList swimlaneColumns={task.swimlaneColumns} taskId={task.id} />
                        </Grid>
                    )}

                </Grid>
            )}
        </Draggable>

    )
}
export default Swimlane
