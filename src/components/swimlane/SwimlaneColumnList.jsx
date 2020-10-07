import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneColumn from './SwimlaneColumn'

const SwimlaneColumnList = ({ swimlaneColumns }) => {
    const classes = swimlaneStyles()

    return (
        <Grid container direction="row" spacing={2}>
            {swimlaneColumns.map((swimlaneColumn, index) => <Grid item key={swimlaneColumn.id}><SwimlaneColumn swimlaneColumn={swimlaneColumn} /></Grid>)}
        </Grid>
    )
}
export default SwimlaneColumnList
