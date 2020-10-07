import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'

const Swimlane = () => {
    const classes = swimlaneStyles()

    return (
        <Grid container direction="column" classes={{ root: classes.root }}>
            <Grid item classes={{ root: classes.swimlaneTitle }}><h3>Swimlane title</h3></Grid>
        </Grid>
    )
}
export default Swimlane
