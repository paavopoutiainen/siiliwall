/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Grid } from '@material-ui/core'
import { Droppable } from 'react-beautiful-dnd'
import { swimlaneStyles } from '../../styles/styles'
import Subtask from '../subtask/Subtask'

const SwimlaneColumn = ({ swimlaneColumn, taskId }) => {
    const { subtasks } = swimlaneColumn
    const classes = swimlaneStyles()

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
                    {subtasks.map((subtask) => (
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
