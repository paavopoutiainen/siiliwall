import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneHeader from './SwimlaneHeader'
import SwimlaneColumnList from './SwimlaneColumnList'

const Swimlane = ({ task }) => {
    const classes = swimlaneStyles()

    return (
        <Grid container direction="column">
            <Grid item><SwimlaneHeader taskName={task.title} /></Grid>
            <Grid item><SwimlaneColumnList /></Grid>
        </Grid>
    )
}
export default Swimlane
