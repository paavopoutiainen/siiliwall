import React, { useState } from 'react'
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Delete from '@material-ui/icons/Delete'
import { DELETE_COLUMN, DELETE_TASK } from '../graphql/mutations'
import { useMutation, useApolloClient } from '@apollo/client'

const DropdownMenu = ({ columnId, taskId }) => {
    const [deleteColumn] = useMutation(DELETE_COLUMN)
    const [deleteTask] = useMutation(DELETE_TASK)
    const [anchorEl, setAnchorEl] = useState(null)
    const client = useApolloClient()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        if (columnId) {
            deleteColumnById()
            deleteColumnFromCache()
        }
        if (taskId) {
            deleteTaskById()
            deleteTaskFromCache()
        }
        setAnchorEl(null)
    }

    const deleteColumnById = () => {
        deleteColumn({
            variables: {
                columnId: columnId
            }
        })
    }

    const deleteColumnFromCache = () => {
        const idToBeDeleted = `Column:${columnId}`
        client.cache.evict({ id: idToBeDeleted })
    }

    const deleteTaskById = () => {
        deleteTask({
            variables: {
                taskId: taskId
            }
        })
    }

    const deleteTaskFromCache = () => {
        const idToBeDeleted = `Task:${taskId}`
        client.cache.evict({ id: idToBeDeleted })
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
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                getContentAnchorEl={null}
                elevation={0}
            >
                <MenuItem onClick={handleClose} >
                    <ListItemIcon>
                        <Delete fontSize="default" />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
            </Menu>
        </div>
    )
}
export default DropdownMenu