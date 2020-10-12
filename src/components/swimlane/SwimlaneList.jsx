import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import Swimlane from './Swimlane'

const SwimlaneList = ({ tasks, swimlaneOrder }) => {
    const classes = swimlaneStyles()

    const newSwimlaneOrder = swimlaneOrder.map((id) => tasks.find((task) => task.id === id))
    return (
        <Grid
            container
            direction="column"
            spacing={4}
        >
            {newSwimlaneOrder.map((task, index) =>
                <Grid item key={task.id}><Swimlane task={task} index={index} /></Grid>
            )}
        </Grid>
    )
}
export default SwimlaneList