import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneHeader from './SwimlaneHeader'
import SwimlaneColumnList from './SwimlaneColumnList'

const Swimlane = ({ task }) => {
    const classes = swimlaneStyles()
    console.log(task)

    return (
        <Grid container direction="column" spacing={3}>
            <Grid item><SwimlaneHeader taskName={task.title} /></Grid>
            <Grid item><SwimlaneColumnList swimlaneColumns={task.swimlaneColumns} /></Grid>
        </Grid>
    )
}
export default Swimlane
