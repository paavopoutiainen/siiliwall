import React from 'react'
import { Grid } from '@material-ui/core'
import Swimlane from './Swimlane'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneList = ({ tasks, swimlaneOrder }) => {
    const classes = swimlaneStyles()
    const newSwimlaneOrder = swimlaneOrder.map((obj) => tasks.find((task) => task.id === obj.ticketId))
    //const newSwimlaneOrder = tasks.filter((task) => swimlaneOrder.find((obj) => obj.id === task.id && obj.type === 'task'))
    console.log('newSwimlaneOrder', newSwimlaneOrder)
    //console.log(tasks)
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
