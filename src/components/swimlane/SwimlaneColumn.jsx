import React from 'react'
import { Grid } from '@material-ui/core'
import { swimlaneStyles } from '../../styles/styles'
import Subtask from '../subtask/Subtask'

const SwimlaneColumn = ({ swimlaneColumn }) => {
    const { subtaskOrder, subtasks } = swimlaneColumn
    const classes = swimlaneStyles()

    const subtasksInOrder = subtaskOrder.map((obj) => subtasks.find((subtask) => subtask.id === obj.ticketId))
    return (
        <Grid container>
            {subtasksInOrder.map((subtask, index) => (
                <Grid item key={subtask.id}>
                    <Subtask subtask={subtask} index={index} columnId={swimlaneColumn.id} />
                </Grid>
            ))}
        </Grid>

    )
}
export default SwimlaneColumn
