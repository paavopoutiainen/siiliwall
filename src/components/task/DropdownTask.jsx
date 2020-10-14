import React, { useEffect, useState } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {
    Delete, Edit, Archive, Add,
} from '@material-ui/icons'
import AlertBox from '../AlertBox'
import AddSubtaskDialog from '../subtask/AddSubtaskDialog'
import { boardPageStyles } from '../../styles/styles'

const DropdownTask = ({
    columnId, taskId, handleEdit, boardId,
}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [action, setAction] = useState(null)
    const [alertDialogStatus, setAlertDialogStatus] = useState(false)
    const [addDialogStatus, setAddDialogStatus] = useState(false)
    const classes = boardPageStyles()

    const toggleAddDialog = () => {
        setAnchorEl(null)
        setAddDialogStatus(!addDialogStatus)
    }
    const toggleAlertDialog = () => setAlertDialogStatus(!alertDialogStatus)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const openAlertDialog = (order) => {
        setAction(order)
        setAlertDialogStatus(true)
        setAnchorEl(null)
    }

    useEffect(() => {
        if (handleEdit) {
            setAnchorEl(null)
        }
    }, [handleEdit])

    return (
        <Grid item classes={{ root: classes.taskDropdownComponent }}>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                classes={{ root: classes.taskDropdownButton }}
            >
                <MoreHorizIcon fontSize="large" />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                getContentAnchorEl={null}
                elevation={0}
            >
                <MenuItem onClick={toggleAddDialog}>
                    <ListItemIcon>
                        <Add />
                    </ListItemIcon>
                    <ListItemText primary="Create subtask" />
                </MenuItem>
                <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                </MenuItem>
                <MenuItem onClick={() => openAlertDialog('ARCHIVE_TASK')}>
                    <ListItemIcon>
                        <Archive />
                    </ListItemIcon>
                    <ListItemText primary="Archive" />
                </MenuItem>
                <MenuItem onClick={() => openAlertDialog('DELETE_TASK')}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
            </Menu>
            <AlertBox
                alertDialogStatus={alertDialogStatus}
                toggleAlertDialog={toggleAlertDialog}
                taskId={taskId}
                columnId={columnId}
                action={action}
            />
            <AddSubtaskDialog
                addDialogStatus={addDialogStatus}
                toggleAddDialog={toggleAddDialog}
                columnId={columnId}
                taskId={taskId}
                boardId={boardId}
            />
        </Grid>
    )
}
export default DropdownTask
