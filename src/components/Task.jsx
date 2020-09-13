import React from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import { boardPageStyles } from '../styles/styles'

const Task = ({ task, index }) => {
    const classes = boardPageStyles()

    return (
        <Grid
            classes={{ root: classes.task }}
            item
            container
        >
            <Grid classes={{ root: classes.taskTitle }}>
                <h1>{task.title}</h1>
            </Grid>
        </Grid>
    )
}

export default Task
