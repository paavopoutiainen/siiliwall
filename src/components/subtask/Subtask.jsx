/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
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
                    spacing={1}
                >
                    <Grid item container classes={{ root: classes.subtaskHeader }}>
                        {/* Styles.js ellipsis doesn't work with classes={{ root: classes.x}} */}
                        <Grid item className={classes.subtaskHeaderTitleItem}>
                            <p className={classes.subtaskHeaderTitleText}>
                                {subtask.task?.title}
                            </p>
                        </Grid>
                        <Grid item classes={{ root: classes.subtaskdropDown }}>
                            <DropDownSubtask
                                subtaskId={subtask.id}
                                columnId={columnId}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container direction="column">
                        {/* Styles.js ellipsis doesn't work with classes={{ root: classes.x}} */}
                        <Grid item className={classes.subtaskContent}>
                            <p className={classes.subtaskContentText}>
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
                            {subtask.members?.length !== 0 ? (
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
