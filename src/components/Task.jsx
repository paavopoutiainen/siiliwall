import React from 'react'
import { Grid } from '@material-ui/core'
import { boardPageStyles } from '../styles/styles'

const Task = ({ task }) => {
    const classes = boardPageStyles()

    return (
        <Grid
            item
            classes={{ root: classes.task }}
        >
            <h1>
                {task.title}
            </h1>
        </Grid>
    )
}

export default Task
