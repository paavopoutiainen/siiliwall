import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import Swimlane from './Swimlane'

const SwimlaneList = ({ tasks }) => {
    const classes = swimlaneStyles()
    return (
        <Grid container direction="column" spacing={2}>
            {tasks.map((task, index) => <Grid item key={task.id}><Swimlane task={task} /></Grid>)}
        </Grid>
    )
}
export default SwimlaneList
