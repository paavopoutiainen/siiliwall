import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneColumn from './SwimlaneColumn'

const SwimlaneColumnList = ({ swimlaneColumns, columnOrder }) => {
    const classes = swimlaneStyles()

    const swimlaneColumnsInOrder = columnOrder.map((id) => swimlaneColumns.find((swimlaneColumn) => swimlaneColumn.id === id))

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            classes={{ root: classes.swimlaneColumnList }}
        >
            {swimlaneColumnsInOrder.map((swimlaneColumn, index) => (
                <Grid item key={swimlaneColumn.id}>
                    <SwimlaneColumn swimlaneColumn={swimlaneColumn} />
                </Grid>
            ))}
        </Grid>
    )
}
export default SwimlaneColumnList
