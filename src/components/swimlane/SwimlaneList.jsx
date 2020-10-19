import React from 'react'
import { Grid } from '@material-ui/core'
import Swimlane from './Swimlane'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneList = ({ tasksInOrder }) => {
    const classes = swimlaneStyles()

    return (
        <Grid
            container
            direction="column"
            spacing={4}
        >
            {tasksInOrder.map((task, index) => <Grid item key={task.id}><Swimlane tasksInOrder={tasksInOrder} task={task} index={index} /></Grid>)}
        </Grid>
    )
}
export default SwimlaneList
