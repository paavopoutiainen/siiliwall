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
            container
            direction="column"
            classes={{ root: classes.column }}
        >
            <Grid item container>
                <Grid item classes={{ root: classes.columnTitle }}><h1>{column.name}</h1></Grid>
            </Grid>

            <Grid item container>
                <TaskList tasks={tasks} taskOrder={taskOrderArray} />
            </Grid>
        </Grid>
    )
}

export default Column
