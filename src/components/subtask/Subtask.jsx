/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import DropDownSubtask from './DropdownSubtask'
import { boardPageStyles } from '../../styles/styles'
import EditSubtaskDialog from './EditSubtaskDialog'

const Subtask = ({ subtask, index, columnId }) => {
    const classes = boardPageStyles()
    const [dialogStatus, setDialogStatus] = useState(false)
    const toggleDialog = () => setDialogStatus(!dialogStatus)

    const handleClick = () => {
        toggleDialog()
    }

    const handleDialogClick = (e) => e.stopPropagation()

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
                    onClick={handleClick}
                >
                    <Grid item container classes={{ root: classes.subtaskHeader }} direction="row" alignItems="center">
                        <Grid item>
                            <b>{subtask.prettyId}</b>
                        </Grid>
                        <Grid item classes={{ root: classes.subtaskDropdownGrid }} onClick={handleDialogClick}>
                            <DropDownSubtask
                                subtaskId={subtask.id}
                                columnId={columnId}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container direction="column">
                        {subtask.name && (
                            <Grid item className={classes.subtaskContentAndName}>
                                <p className={classes.subtaskContentAndNameText}>
                                    {`Name: ${subtask.name}`}
                                </p>
                            </Grid>
                        )}
                        <Grid item className={classes.subtaskContentAndName}>
                            <p className={classes.subtaskContentAndNameText}>
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
                        {subtask.size && (
                            <Grid item>
                                <p>
                                    {`Size: ${subtask.size}`}
                                </p>
                            </Grid>
                        )}
                        <Grid item>
                            {subtask.members?.length !== 0 ? (
                                <p>
                                    {`Members:  ${subtask.members.map((member) => ` ${member.userName}`)}`}
                                </p>
                            ) : null}
                        </Grid>
                    </Grid>
                    <EditSubtaskDialog
                        dialogStatus={dialogStatus}
                        toggleDialog={toggleDialog}
                        editId={subtask.id}
                        subtask={subtask}
                    />
                </Grid>
            )}

        </Draggable>

    )
}
export default Subtask
