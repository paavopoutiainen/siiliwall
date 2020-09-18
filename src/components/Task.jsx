import React from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { boardPageStyles } from '../styles/styles'
import DropdownMenu from './DropdownMenu'

const Task = ({ task, index }) => {
    const classes = boardPageStyles()
    const { title } = task
    const titleLimit = 27

    const add3Dots = (title, titleLimit) => {
        let dots = '...'
        if (title.length > titleLimit) {
            title = title.substring(0, titleLimit) + dots
        }
        return title
    }

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
                    >
                        <Grid item classes={{ root: classes.taskTitle }}><h1>{add3Dots(title, titleLimit)}</h1></Grid>
                        <Grid item><DropdownMenu taskId={task.id} /></Grid>
                    </Grid>
                </Grid>
            )}
        </Draggable>
    )
}
export default Task