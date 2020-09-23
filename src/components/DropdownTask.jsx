import React, { useState, useEffect } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid, Snackbar
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Delete, Edit, Archive } from '@material-ui/icons'
import { useMutation, useApolloClient } from '@apollo/client'
import { DELETE_TASK } from '../graphql/task/taskQueries'
import { TASKORDER } from '../graphql/fragments'
import { boardPageStyles } from '../styles/styles'

const DropdownTask = ({ columnId, taskId, handleEdit }) => {
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

    useEffect(() => {
        if (handleEdit) {
            setAnchorEl(null)
        }
    }, [handleEdit])

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

    const handleDelete = (option) => {
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
                <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                        <Edit fontSize="default" />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                </MenuItem>
                <MenuItem onClick={openSnackbar}>
                    <ListItemIcon>
                        <Delete fontSize="default" />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Archive fontSize="default" />
                    </ListItemIcon>
                    <ListItemText primary="Archive" />
                </MenuItem>
            </Menu>
            <Snackbar
                classes={{ root: classes.snackbar }}
                open={open}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <Alert variant="outlined" severity="error">
                    <Grid item container direction="column">
                        <Grid item>
                            <span id="snackbarMessage">{snackbarMsg}</span>
                        </Grid>
                        <Grid item container direction="row" justify="flex-end">
                            <Button variant="contained" onClick={() => handleDelete('UNDO')}>
                                UNDO
                            </Button>
                            <Button color="secondary" variant="contained" onClick={() => handleDelete('DELETE')} classes={{ root: classes.snackbarButtonDelete }}>
                                DELETE
                            </Button>
                        </Grid>
                    </Grid>
                </Alert>
            </Snackbar>
        </Grid>
    )
}
export default DropdownTask