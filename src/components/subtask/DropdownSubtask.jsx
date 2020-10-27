import React, { useState } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Delete, Archive } from '@material-ui/icons'
import { boardPageStyles } from '../../styles/styles'
import AlertBox from '../AlertBox'

const DropdownSubtask = ({ columnId, subtaskId }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = boardPageStyles()
    const [alertDialogStatus, setAlertDialogStatus] = useState(false)
    const [action, setAction] = useState(null)

    const toggleAlertDialog = () => setAlertDialogStatus(!alertDialogStatus)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const openAlertDialog = (order) => {
        setAction(order)
        setAlertDialogStatus(true)
        setAnchorEl(null)
    }

    return (
        <Grid item classes={{ root: classes.subtaskDropdownComponent }}>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                classes={{ root: classes.subtaskDropdownButton }}
            >
                <MoreHorizIcon />
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
                <MenuItem onClick={() => openAlertDialog('ARCHIVE_SUBTASK')}>
                    <ListItemIcon>
                        <Archive />
                    </ListItemIcon>
                    <ListItemText primary="Archive" />
                </MenuItem>
                <MenuItem onClick={() => openAlertDialog('DELETE_SUBTASK')}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
            </Menu>
            <AlertBox
                alertDialogStatus={alertDialogStatus}
                toggleAlertDialog={toggleAlertDialog}
                action={action}
                subtaskId={subtaskId}
                columnId={columnId}
            />
        </Grid>
    )
}
export default DropdownSubtask
