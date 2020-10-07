import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneViewHeader = ({ columnNames }) => {
    const classes = swimlaneStyles()

    return (
        <Grid container direction="row" justify="space-evenly" classes={{ root: classes.swimlaneColumnNames }}>
            {columnNames.map((name) => (
                <Grid item classes={{ root: classes.swimlaneColumnName }}><h3>{name}</h3></Grid>
            ))}
        </Grid>
    )
}
export default SwimlaneViewHeader