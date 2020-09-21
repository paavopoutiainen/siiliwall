import React, { useState } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid, Snackbar
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Delete from '@material-ui/icons/Delete'
import { useMutation, useApolloClient } from '@apollo/client'
import { DELETE_TASK } from '../graphql/task/taskQueries'
import { TASKORDER } from '../graphql/fragments'
import { boardPageStyles } from '../styles/styles'

const DropdownTask = ({ columnId, taskId }) => {
    const client = useApolloClient()
    const classes = boardPageStyles()
    const [deleteTask] = useMutation(DELETE_TASK)
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const snackbarMsg = `This action will permanently remove the selected task from your project and can't be later examined! Are you sure you want to delete it?`

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const deleteTaskById = () => {
        deleteTask({
            variables: {
                taskId,
            },
        })
    }

    const deleteTaskFromCache = () => {
        const idToBeDeleted = `Task:${taskId}`
        const columnIdForCache = `Column:${columnId}`
        const data = client.readFragment({
            id: columnIdForCache,
            fragment: TASKORDER,
        })
        const newTaskOrder = data.taskOrder.filter((id) => id !== taskId)

        client.writeFragment({
            id: columnIdForCache,
            fragment: TASKORDER,
            data: {
                taskOrder: newTaskOrder,
            },
        })
        client.cache.evict({ id: idToBeDeleted })
    }

    const openSnackbar = () => {
        setOpen(true)
        setAnchorEl(null)
    }

    const handleClose = (option) => {
        if (option === 'DELETE') {
            deleteTaskById()
            deleteTaskFromCache()
        } else {
            setOpen(false)
        }
    }


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
                <MenuItem onClick={openSnackbar}>
                    <ListItemIcon>
                        <Delete fontSize="default" />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
            </Menu>
            <Snackbar
                classes={{ root: classes.snackbar }}
                open={open}
                message={<span id="snackbarMessage">{snackbarMsg}</span>}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                action={
                    <Grid item>
                        <Button color="secondary" size="large" onClick={() => handleClose('UNDO')} classes={{ root: classes.snackbarButtonUndo }}>
                            UNDO
                        </Button>
                        <Button color="secondary" size="large" onClick={() => handleClose('DELETE')} classes={{ root: classes.snackbarButtonDelete }}>
                            DELETE
                        </Button>
                    </Grid>
                }
            />
        </Grid>
    )
}
export default DropdownTask
