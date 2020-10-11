/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Grid } from '@material-ui/core'
import { Droppable } from 'react-beautiful-dnd'
import { swimlaneStyles } from '../../styles/styles'
import Subtask from '../subtask/Subtask'

const SwimlaneColumn = ({ swimlaneColumn, taskId }) => {
    const { subtaskOrder, subtasks } = swimlaneColumn
    const classes = swimlaneStyles()

    const subtasksInOrder = subtaskOrder.map((obj) => subtasks.find((subtask) => subtask.id === obj.ticketId))

    const idForDroppable = `${swimlaneColumn.id}${taskId}`
    return (
        <Droppable droppableId={idForDroppable} type="subtask">
            {(provided) => (
                <Grid
                    container
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    classes={{ root: classes.swimlaneColumn }}
                    direction="column"
                    spacing={2}
                >
                    {subtasksInOrder.map((subtask, index) => (
                        <Grid item key={subtask.id}>
                            <Subtask subtask={subtask} index={subtask.index} columnId={swimlaneColumn.id} />
                        </Grid>
                    ))}
                    {provided.placeholder}
                </Grid>
            )}
        </Droppable>

    )
}
export default SwimlaneColumn
