import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import SwimlaneColumn from './SwimlaneColumn'

const SwimlaneColumnList = ({ swimlaneColumns, taskId }) => {
    const classes = swimlaneStyles()
    const mostSubtasks = Math.max(...swimlaneColumns.map((swimlaneColumn) => swimlaneColumn.subtasks.length))
    console.log(mostSubtasks)
    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            classes={{ root: classes.swimlaneColumnList }}
        >
            {swimlaneColumns.map((swimlaneColumn, index) => (
                <Grid item key={swimlaneColumn.id}>
                    <SwimlaneColumn
                        swimlaneColumn={swimlaneColumn}
                        taskId={taskId}
                        isTheLeftMost={index === swimlaneColumns.length - 1}
                        mostSubtasks={mostSubtasks}
                    />
                </Grid>
            ))}
        </Grid>
    )
}
export default SwimlaneColumnList
