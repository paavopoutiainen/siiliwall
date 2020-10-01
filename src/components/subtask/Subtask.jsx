import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import DropDownSubtask from './DropdownSubtask'
import { boardPageStyles } from '../../styles/styles'
import { Draggable } from 'react-beautiful-dnd'

const Subtask = ({ subtask, index, columnId }) => {
    const classes = boardPageStyles()
    return (
        <Grid item container direction="column" classes={{ root: classes.subtaskComponent }}>
            <Grid item container direction="row" justify="space-between" alignItems="center" classes={{ root: classes.subtaskHeader }}>
                <Grid item classes={{ root: classes.subtaskHeaderText }}>
                    <p>{subtask.task.title}</p>
                </Grid>
                <Grid item classes={{ root: classes.subtaskdropDown }}>
                    <DropDownSubtask />
                </Grid>
            </Grid>
            <Grid item classes={{ root: classes.subtaskContent }}>
                <p>{subtask.content}</p>
            </Grid>
        </Grid>
    )
}
export default Subtask