import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'

const SwimlaneViewHeader = ({ columns, columnOrder }) => {
    const classes = swimlaneStyles()

    const columnsInOrder = columnOrder.map((id) => columns.find((column) => column.id === id))

    return (
        <Grid container direction="row" justify="space-evenly" classes={{ root: classes.swimlaneColumnNames }}>
            {columnsInOrder.map((column, index) => <Grid item classes={{ root: classes.swimlaneColumnName }} key={column.id}><h3>{column.name}</h3></Grid>)}
        </Grid>
    )
}
export default SwimlaneViewHeader
