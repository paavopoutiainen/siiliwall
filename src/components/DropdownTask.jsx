import React, { useState } from 'react'
import { Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Delete from '@material-ui/icons/Delete'
import { DELETE_TASK } from '../graphql/mutations'
import { useMutation, useApolloClient, gql } from '@apollo/client'

const DropdownTask = ({ columnId, taskId }) => {
    const [deleteTask] = useMutation(DELETE_TASK)
    const [anchorEl, setAnchorEl] = useState(null)
    const client = useApolloClient()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        deleteTaskById()
        deleteTaskFromCache()
        setAnchorEl(null)
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
        const columnIdForCache = `Column:${columnId}`
        const data = client.readFragment({
            id: columnIdForCache,
            fragment: gql`
                fragment taskOrder on Column {
                    taskOrder
                }
            `
        })
        const newTaskOrder = data.taskOrder.filter((id) => id !== taskId)

        client.writeFragment({
            id: columnIdForCache,
            fragment: gql`
                fragment taskOrder on Column {
                    taskOrder
                }
            `,
            data: {
                taskOrder: newTaskOrder,
            },
        })
        client.cache.evict({ id: idToBeDeleted })
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
                <MenuItem onClick={handleClose} >
                    <ListItemIcon>
                        <Delete fontSize="default" />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
            </Menu>
        </Grid>
    )
}
export default DropdownTask