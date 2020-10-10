import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneViewHeader = ({ columns }) => {
    const classes = swimlaneStyles()

    return (
        <Grid container direction="row" justify="space-evenly" classes={{ root: classes.swimlaneColumnNames }}>
            {columns.map((column) => <Grid item classes={{ root: classes.swimlaneColumnName }} key={column.id}><h3>{column.name}</h3></Grid>)}
        </Grid>
    )
}
export default SwimlaneViewHeader
