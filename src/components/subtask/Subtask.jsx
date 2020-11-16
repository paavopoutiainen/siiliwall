/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { Draggable } from 'react-beautiful-dnd'
import DropDownSubtask from './DropdownSubtask'
import { boardPageStyles } from '../../styles/styles'
import EditSubtaskDialog from './EditSubtaskDialog'

const Subtask = ({ subtask, index, columnId }) => {
    const classes = boardPageStyles()
    const { name } = subtask
    const nameLimit = 25
    const dots = '...'
    const [dialogStatus, setDialogStatus] = useState(false)

    const toggleDialog = () => setDialogStatus(!dialogStatus)

    const handleClick = () => {
        toggleDialog()
    }

    const handleDialogClick = (e) => e.stopPropagation()

    const add3Dots = () => {
        let checkedName = name
        if (name.length > nameLimit) {
            checkedName = name.substring(0, nameLimit) + dots
        }
        return checkedName
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
                    onClick={handleClick}
                >
                    <Grid item
                        container
                        classes={{ root: classes.subtaskHeader }}
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item classes={{ root: classes.subtaskTitle }}>
                            <b>{subtask.prettyId}</b>
                        </Grid>
                        <Grid item classes={{ root: classes.subtaskDropdownGrid }} onClick={handleDialogClick}>
                            <DropDownSubtask
                                subtaskId={subtask.id}
                                columnId={columnId}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container direction="column" classes={{ root: classes.subtaskName }}>
                        <Grid item>
                            <p>{add3Dots(subtask.name)}</p>
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
