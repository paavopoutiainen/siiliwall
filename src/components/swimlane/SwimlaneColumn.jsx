/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Grid } from '@material-ui/core'
import { Droppable } from 'react-beautiful-dnd'
import { swimlaneStyles } from '../../styles/styles'
import Subtask from '../subtask/Subtask'

const SwimlaneColumn = ({ swimlaneColumn }) => {
    const { subtaskOrder, subtasks } = swimlaneColumn
    const classes = swimlaneStyles()

    const subtasksInOrder = subtaskOrder.map((obj) => subtasks.find((subtask) => subtask.id === obj.ticketId))
    return (
        <Droppable droppableId={swimlaneColumn.id} type="subtask">
            {(provided) => (
                <Grid
                    container
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {subtasksInOrder.map((subtask) => (
                        <Grid item key={subtask.id}>
                            <Subtask subtask={subtask} index={subtask.index} columnId={swimlaneColumn.id} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Droppable>

    )
}
export default SwimlaneColumn
