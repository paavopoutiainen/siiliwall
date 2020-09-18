import React from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { boardPageStyles } from '../styles/styles'
import DropdownMenu from './DropdownMenu'

const Task = ({ task, index }) => {
    const classes = boardPageStyles()

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Grid
                    item
                    container
                    direction="column"
                    classes={{ root: classes.task }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid
                        item
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                        classes={{ root: classes.taskHeader }}
                    >
                        <Grid item><h1>{task.title}</h1></Grid>
                        <Grid item><DropdownMenu taskId={task.id} /></Grid>
                    </Grid>
                </Grid>
            )}
        </Draggable>
    )
}
export default Task