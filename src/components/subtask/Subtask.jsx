import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import DropDownSubtask from './DropdownSubtask'
import { boardPageStyles } from '../../styles/styles'

const Subtask = ({ subtask, index, columnId }) => {
    const classes = boardPageStyles()

    return (
        <Draggable draggableId={subtask.id} index={index}>
            {(provided) => (
                <Grid
                    item
                    container
                    direction="column"
                    classes={{ root: classes.subtaskComponent }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Grid item container direction="row" justify="space-between" alignItems="center" classes={{ root: classes.subtaskHeader }}>
                        <Grid item classes={{ root: classes.subtaskHeaderText }}>
                            <p>{subtask.task.title}</p>
                        </Grid>
                        <Grid item classes={{ root: classes.subtaskdropDown }}>
                            <DropDownSubtask
                                subtaskId={subtask.id}
                                columnId={columnId}
                            />
                        </Grid>
                    </Grid>
                    <Grid item classes={{ root: classes.subtaskContent }}>
                        <p>
                            {`Content: ${subtask.content}`}
                        </p>
                        {subtask.owner ? (
                            <p>
                                {`Owner: ${subtask.owner.userName}`}
                            </p>
                        ) : null}
                        {subtask.members.length !== 0 ? (
                            <p>
                                {`Members:  ${subtask.members.map((member) => ` ${member.userName}`)}`}
                            </p>
                        ) : null}
                    </Grid>
                </Grid>
            )}

        </Draggable>

    )
}
export default Subtask
