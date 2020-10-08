import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import Swimlane from './Swimlane'

const SwimlaneList = ({ tasks, columnOrder }) => {
    const classes = swimlaneStyles()
    return (
        <Grid container direction="column" spacing={3}>
            {tasks.map((task, index) => <Grid item key={task.id}><Swimlane task={task} columnOrder={columnOrder} /></Grid>)}
        </Grid>
    )
}
export default SwimlaneList
