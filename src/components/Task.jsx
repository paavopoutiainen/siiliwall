import React from 'react'
import { Grid } from '@material-ui/core'
import { boardPageStyles } from '../styles/styles'

const Task = ({ task }) => {
    const classes = boardPageStyles()

    return (
        <Grid
            item
            container
            classes={{ root: classes.task }}
        >
            <Grid classes={{ root: classes.taskTitle }}>
                <h1>{task.title}</h1>
            </Grid>

        </Grid>
    )
}

export default Task
