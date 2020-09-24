import React, { useEffect, useState } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { Delete, Edit, Archive } from '@material-ui/icons'
import AlertBox from './AlertBox'
import { DELETE_TASK/*, EDIT_TASK */ } from '../graphql/task/taskQueries'
import useTaskById from '../graphql/task/hooks/useTaskById'
import { TASKORDER } from '../graphql/fragments'
import { useMutation, useApolloClient } from '@apollo/client'
import useEditTask from '../graphql/task/hooks/useEditTask'

const DropdownTask = ({ columnId, taskId, handleEdit }) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const alertMsg = "This action will permanently delete this task from the board and can't be later examined! Are you sure you want to delete it?"
    const client = useApolloClient()
    const [deleteTask] = useMutation(DELETE_TASK)
    const [editTask] = useEditTask()
    const { data, loading } = useTaskById(taskId)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const openSnackbar = () => {
        setOpen(true)
        setAnchorEl(null)
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

    useEffect(() => {
        if (handleEdit) {
            setAnchorEl(null)
        }
    }, [handleEdit])

    if (loading) return null

    // Adding current time to the deletedAt attribute of the Task module
    const archivingTimeCreation = () => {
        let task = data.taskById
        let date = new Date().toString()
        let deletedAt = date.slice(0, 24)
        editTask({
            variables: {
                taskId: task.id,
                title: task.title,
                size: task.size,
                owner: task.owner,
                deletedAt: deletedAt
            }
        })
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
                        <Edit />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                </MenuItem>
                <MenuItem onClick={archivingTimeCreation}>
                    <ListItemIcon>
                        <Archive />
                    </ListItemIcon>
                    <ListItemText primary="Archive" />
                </MenuItem>
                <MenuItem onClick={openSnackbar}>
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
            </Menu>
            <AlertBox
                open={open}
                setOpen={setOpen}
                alertMsg={alertMsg}
                deleteTaskById={deleteTaskById}
                deleteTaskFromCache={deleteTaskFromCache}
                type={'TASK'}
            />
        </Grid>
    )
}
export default DropdownTask