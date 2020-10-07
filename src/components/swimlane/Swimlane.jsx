import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneHeader from './SwimlaneHeader'
import SwimlaneColumnList from './SwimlaneColumnList'

const Swimlane = () => {
    const classes = swimlaneStyles()

    return (
        <Grid container direction="column">
            <Grid item><SwimlaneHeader /></Grid>
            <Grid item><SwimlaneColumnList /></Grid>
        </Grid>
    )
}
export default Swimlane