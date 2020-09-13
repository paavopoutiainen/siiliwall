import React from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { boardPageStyles } from '../styles/styles'

const Task = ({ task, index }) => {
    const classes = boardPageStyles()

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Grid
                    classes={{ root: classes.task }}
                    item
                    container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid classes={{ root: classes.taskTitle }}>
                        <h1>{task.title}</h1>
                    </Grid>
                </Grid>
            )}

        </Draggable>

    )
}

export default Task
