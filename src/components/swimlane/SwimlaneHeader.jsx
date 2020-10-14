import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneHeader = ({ taskName }) => {
    const classes = swimlaneStyles()

    return (
        <Grid container direction="row" classes={{ root: classes.swimlaneHeader }}>
            <Grid item classes={{ root: classes.swimlaneTitle }}><h3>{taskName}</h3></Grid>
        </Grid>
    )
}
export default SwimlaneHeader 