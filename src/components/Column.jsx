import React from 'react'
import { Grid } from '@material-ui/core'
import { boardPageStyles } from '../styles/styles'
import TaskList from './TaskList'

const Column = ({ column }) => {
    const classes = boardPageStyles()

    return (
        <Grid
            container
            item
            direction="column"
            classes={{ root: classes.column }}
            alignItems="center"
        >
            <Grid item container classes={{ root: classes.title }}>
                <h1>{column.name}</h1>
            </Grid>
            <TaskList tasks={column.tasks} taskOrder={column.taskOrder} />
        </Grid>
    )
}

export default Column
