import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneHeader from './SwimlaneHeader'
import SwimlaneColumnList from './SwimlaneColumnList'

const Swimlane = ({ task }) => {
    const classes = swimlaneStyles()

    return (
        <Grid container direction="column" spacing={3} classes={{ root: classes.swimlane }}>
            <Grid item><SwimlaneHeader taskName={task.title} /></Grid>
            <Grid item><SwimlaneColumnList swimlaneColumns={task.swimlaneColumns} taskId={task.id} /></Grid>
        </Grid>
    )
}
export default Swimlane
