import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneHeaderRow = ({ prettyId, title, numberOfSubtasks }) => {
    const classes = swimlaneStyles()

    return (
        <Grid container item direction="row" classes={{ root: classes.swimlaneHeaderRow }}>
            <Grid item container spacing={3} classes={{ root: classes.swimlaneHeaderRowLeft }}>
                <Grid item><ExpandMoreIcon /></Grid>
                <Grid item><p style={{ color: '#3232FF' }}>{prettyId}</p></Grid>
                <Grid item><p>{title}</p></Grid>
            </Grid>
            <Grid item container spacing={3} classes={{ root: classes.swimlaneHeaderRowRight }} justify="flex-end">
                <Grid item>{numberOfSubtasks}</Grid>
                <Grid item><MoreVertIcon /></Grid>
            </Grid>
        </Grid>
    )
}

export default SwimlaneHeaderRow
