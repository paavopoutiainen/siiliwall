import React, { useState } from 'react'
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Delete from '@material-ui/icons/Delete'
import { DELETE_COLUMN } from '../graphql/mutations'
import { useMutation } from '@apollo/client'

const DropdownMenu = ({ key }) => {
    const [deleteColumn] = useMutation(DELETE_COLUMN) // deleteData?
    const [anchorEl, setAnchorEl] = useState(null)

    function handleClick(event) {
        setAnchorEl(event.currentTarget)
    }

    function handleClose() {
        deleteColumnById()
        setAnchorEl(null)
    }

    function deleteColumnById(key) {
        deleteColumn({
            variables: {
                columnId: key
            }
        })
    }

    return (
        <div>
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
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                getContentAnchorEl={null}
                elevation={0}
            >
                <MenuItem onClick={handleClose} >
                    <ListItemIcon>
                        <Delete fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
            </Menu>
        </div>
    )
}
export default DropdownMenu