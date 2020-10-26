import React from 'react'
import { Grid } from '@material-ui/core'
import Swimlane from './Swimlane'

const SwimlaneList = ({ tasksInOrder }) => {

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
