import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneColumnList = () => {
    const classes = swimlaneStyles()

    return (
        <Grid container direction="row" spacing={2} classes={{ root: classes.columnList }}>

        </Grid>
    )
}
export default SwimlaneColumnList