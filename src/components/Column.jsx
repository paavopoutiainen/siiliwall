import React from 'react'
import { Grid } from '@material-ui/core'
import { boardPageStyles } from '../styles/styles'
import TaskList from './TaskList'

const Column = ({ column }) => {
    const classes = boardPageStyles()
    const { tasks } = column
    const taskOrderArray = column.taskOrder

    return (
        <Grid
            item
            classes={{ root: classes.column }}
        >
            <h1>{column.name}</h1>
            <Grid container direction="column" justify="center">
                <TaskList tasks={tasks} taskOrder={taskOrderArray} />
            </Grid>
        </Grid>
    )
}

export default Column
