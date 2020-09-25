import React, { useEffect, useState } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Delete, Edit, Archive } from '@material-ui/icons'
import AlertBox from '../AlertBox'

const DropdownTask = ({ columnId, taskId, handleEdit }) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [action, setAction] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const openSnackbar = (order) => {
        setAction(order)
        setOpen(true)
        setAnchorEl(null)
    }

    useEffect(() => {
        if (handleEdit) {
            setAnchorEl(null)
        }
    }, [handleEdit])

    return (
        <Grid item>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
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
                <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                </MenuItem>
                <MenuItem onClick={() => openSnackbar('ARCHIVE_TASK')}>
                    <ListItemIcon>
                        <Archive />
                    </ListItemIcon>
                    <ListItemText primary="Archive" />
                </MenuItem>
                <MenuItem onClick={() => openSnackbar('DELETE_TASK')}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
            </Menu>
            <AlertBox
                open={open}
                setOpen={setOpen}
                taskId={taskId}
                columnId={columnId}
                action={action}
            />
        </Grid>
    )
}
export default DropdownTask
