import React, { useState } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {
    Delete, Archive, Add,
} from '@material-ui/icons'
import { useApolloClient } from '@apollo/client'
import AlertBox from '../AlertBox'
import AddSubtaskDialog from '../subtask/AddSubtaskDialog'
import { boardPageStyles } from '../../styles/styles'
import { COLUMNORDER_AND_COLUMNS } from '../../graphql/fragments'

const DropdownTask = ({
    columnId, task, boardId,
}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [action, setAction] = useState(null)
    const [count, setCount] = useState(null)
    const [alertDialogStatus, setAlertDialogStatus] = useState(false)
    const [addDialogStatus, setAddDialogStatus] = useState(false)
    const classes = boardPageStyles()
    const client = useApolloClient()

    const toggleAddDialog = () => {
        setAnchorEl(null)
        setAddDialogStatus(!addDialogStatus)
    }
    const toggleAlertDialog = () => setAlertDialogStatus(!alertDialogStatus)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const openAlertDialog = (order) => {
        const boardIdForCache = `Board:${boardId}`
        const columnData = client.readFragment({
            id: boardIdForCache,
            fragment: COLUMNORDER_AND_COLUMNS,
        })
        const columnsSubtasks = columnData.columns.map((column) => column.subtasks).flat()
        const subtasksOfTask = columnsSubtasks.filter((subtask) => subtask.task.id === task.id)
        if (order === 'DELETE_TASK' && subtasksOfTask.length) {
            setCount(subtasksOfTask.length)
            setAction('DELETE_TASK_IF_SUBTASKS')
            setAlertDialogStatus(true)
            setAnchorEl(null)
        }
        if (order === 'ARCHIVE_TASK' && subtasksOfTask.length) {
            setCount(subtasksOfTask.length)
            setAction('ARCHIVE_TASK_IF_SUBTASKS')
            setAlertDialogStatus(true)
            setAnchorEl(null)
        }
        else {
            setAction(order)
            setAlertDialogStatus(true)
            setAnchorEl(null)
        }
    }
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
                taskId={task.id}
                columnId={columnId}
                boardId={boardId}
                action={action}
                count={count}
            />
            <AddSubtaskDialog
                addDialogStatus={addDialogStatus}
                toggleAddDialog={toggleAddDialog}
                columnId={columnId}
                taskId={task.id}
                boardId={boardId}
            />
        </Grid>
    )
}
export default DropdownTask
