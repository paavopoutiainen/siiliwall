import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import DropDownSubtask from './DropdownSubtask'
import { boardPageStyles } from '../../styles/styles'

const Subtask = ({ subtask, index, columnId }) => {
    const classes = boardPageStyles()
    const titleLimit = 22
    const title = subtask.task?.title
    const dots = '...'
    const add3Dots = (titleParam) => {
        let checkedTitle = titleParam
        if (titleParam.length > titleLimit) {
            checkedTitle = title.substring(0, titleLimit) + dots
        }
        return checkedTitle
    }

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
                    spacing={1}
                >
                    <Grid item container direction="row" justify="space-between" alignItems="center" classes={{ root: classes.subtaskHeader }}>
                        <Grid item>
                            <h4>{add3Dots(title)}</h4>
                        </Grid>
                        <Grid item classes={{ root: classes.subtaskdropDown }}>
                            <DropDownSubtask
                                subtaskId={subtask.id}
                                columnId={columnId}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container direction="column">
                        <Grid item>
                            <p>
                                {`Content: ${subtask.content}`}
                            </p>
                        </Grid>
                        <Grid item>
                            {subtask.owner ? (
                                <p>
                                    {`Owner: ${subtask.owner.userName}`}
                                </p>
                            ) : null}
                        </Grid>
                        <Grid item>
                            {subtask.members.length !== 0 ? (
                                <p>
                                    {`Members:  ${subtask.members.map((member) => ` ${member.userName}`)}`}
                                </p>
                            ) : null}
                        </Grid>
                    </Grid>
                </Grid>
            )}

        </Draggable>

    )
}
export default Subtask
