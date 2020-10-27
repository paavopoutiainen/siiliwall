import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneColumn from './SwimlaneColumn'

const SwimlaneColumnList = ({ swimlaneColumns, taskId }) => {
    const classes = swimlaneStyles()
    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            spacing={1}
            classes={{ root: classes.swimlaneColumnList }}
        >
            {swimlaneColumns.map((swimlaneColumn, index) => (
                <Grid item key={swimlaneColumn.id}>
                    <SwimlaneColumn swimlaneColumn={swimlaneColumn} taskId={taskId} />
                </Grid>
            ))}
        </Grid>
    )
}
export default SwimlaneColumnList
