import React from 'react'
import { Grid, Button, Dialog } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useMutation, useApolloClient } from '@apollo/client'
import { boardPageStyles } from '../styles/styles'
import { DELETE_COLUMN } from '../graphql/column/columnQueries'
import { COLUMNORDER, TICKETORDER } from '../graphql/fragments'
import { DELETE_TASK } from '../graphql/task/taskQueries'
import useArchiveTask from '../graphql/task/hooks/useArchiveTask'
import useArchiveSubtask from '../graphql/subtask/hooks/useArchiveSubtask'
import useDeleteSubtask from '../graphql/subtask/hooks/useDeleteSubtask'

const AlertBox = ({
    alertDialogStatus, toggleAlertDialog, action, columnId, boardId, taskId, subtaskId, count,
}) => {
    const [archiveTask] = useArchiveTask(columnId)
    const [archiveSubtask] = useArchiveSubtask(columnId)
    const [callDeleteSubtask] = useDeleteSubtask(columnId)
    const classes = boardPageStyles()
    const client = useApolloClient()
    const [callDeleteColumn] = useMutation(DELETE_COLUMN)
    const [callDeleteTask] = useMutation(DELETE_TASK)
    const alertMsgDeleteColumn = 'This action will permanently remove the selected column and the tasks inside the column from your board and they can\'t be later examined! Are you sure you want to delete it?'
    const alertMsgDeleteTask = 'This action will permanently delete this task from the board and it can\'t be later examined! Are you sure you want to delete it?'
    const alertMsgArchiveTask = 'The task is removed from the board, but can be examined through the archive setting.'
    const alertMsgArchiveSubtask = 'The subtask is removed from the board, but can be examined through the archive setting.'
    const alertMsgDeleteSubtask = 'This action will permanently delete this task from the board and it can\'t be later examined! Are you sure you want to delete it?.'
    const alertMsgDeleteTaskIfSubtasks = `This task has ${count} unfinished subtask on the board! Are you sure you want to delete it?`
    let alertMsg
    let buttonText = 'DELETE'
    if (action === 'DELETE_TASK_IF_SUBTASKS') {
        buttonText = 'DELETE ANYWAY'
    }
    switch (action) {
        case 'DELETE_COLUMN':
            alertMsg = alertMsgDeleteColumn
            break
        case 'DELETE_TASK':
            alertMsg = alertMsgDeleteTask
            break
        case 'DELETE_TASK_IF_SUBTASKS':
            alertMsg = alertMsgDeleteTaskIfSubtasks
            break
        case 'ARCHIVE_TASK':
            alertMsg = alertMsgArchiveTask
            break
        case 'ARCHIVE_SUBTASK':
            alertMsg = alertMsgArchiveSubtask
            break
        case 'DELETE_SUBTASK':
            alertMsg = alertMsgDeleteSubtask
            break
        default:
            break
    }

    const archiveTaskById = () => {
        archiveTask({
            variables: {
                taskId,
            },
        })
    }

    const archiveSubtaskById = () => {
        archiveSubtask({
            variables: {
                subtaskId,
            },
        })
    }

    const deleteColumn = () => {
        const idToBeDeleted = `Column:${columnId}`
        const boardIdForCache = `Board:${boardId}`
        const data = client.readFragment({
            id: boardIdForCache,
            fragment: COLUMNORDER,
        })
        const newColumnOrder = data.columnOrder.filter((id) => id !== columnId)

        client.writeFragment({
            id: boardIdForCache,
            fragment: COLUMNORDER,
            data: {
                columnOrder: newColumnOrder,
            },
        })
        client.cache.evict({ id: idToBeDeleted })
        callDeleteColumn({
            variables: {
                columnId,
            },
        })
    }

    const deleteTask = () => {
        const idToBeDeleted = `Task:${taskId}`
        const columnIdForCache = `Column:${columnId}`

        const data = client.readFragment({
            id: columnIdForCache,
            fragment: TICKETORDER,
        })
        const newTicketOrder = data.ticketOrder.filter((obj) => obj.ticketId !== taskId)
        client.writeFragment({
            id: columnIdForCache,
            fragment: TICKETORDER,
            data: {
                ticketOrder: newTicketOrder,
            },
        })
        client.cache.evict({ id: idToBeDeleted })
        callDeleteTask({
            variables: {
                taskId,
            },
        })
    }

    const deleteSubtask = () => {
        const subtaskIdForCache = `Subtask:${subtaskId}`
        const columnIdForCache = `Column:${columnId}`
        const data = client.readFragment({
            id: columnIdForCache,
            fragment: TICKETORDER,
        })
        const newTicketOrder = data.ticketOrder.filter((obj) => obj.ticketId !== subtaskId)
        client.writeFragment({
            id: columnIdForCache,
            fragment: TICKETORDER,
            data: {
                ticketOrder: newTicketOrder,
            },
        })
        client.cache.evict({ id: subtaskIdForCache })
        callDeleteSubtask({
            variables: {
                subtaskId,
            },
        })
    }

    const handleDelete = () => {
        if (action === 'DELETE_TASK') {
            deleteTask()
        }
        if (action === 'DELETE_COLUMN') {
            deleteColumn()
        }
        if (action === 'DELETE_SUBTASK') {
            deleteSubtask()
        }
    }

    const handleUndo = () => {
        toggleAlertDialog()
    }

    const handleArchive = () => {
        if (action === 'ARCHIVE_TASK') {
            archiveTaskById()
        }
        if (action === 'ARCHIVE_SUBTASK') {
            archiveSubtaskById()
        }
    }

    return (
        <Grid item>
            <Dialog
                classes={alertDialogStatus ? { root: classes.dialogFocus } : { root: classes.dialogUnfocus }}
                open={alertDialogStatus}
                onClose={toggleAlertDialog}
            >
                <Alert variant="filled" severity="error">
                    <Grid item container direction="column" spacing={2}>
                        <Grid item>
                            <span id="alertMessage">{alertMsg}</span>
                        </Grid>
                        <Grid item container direction="row" justify="flex-end">
                            <Button size="small" variant="contained" onClick={() => handleUndo()} classes={{ root: classes.undoAlertButton }}>
                                UNDO
                            </Button>
                            {action === 'DELETE_TASK' || action === 'DELETE_COLUMN' || action === 'DELETE_SUBTASK' || 'DELETE_TASK_IF_SUBTASKS'
                                ? (
                                    <Button size="small" color="secondary" variant="contained" onClick={() => handleDelete()} classes={{ root: classes.deleteAlertButton }}>
                                        {buttonText}
                                    </Button>
                                )
                                : null}
                            {action === 'ARCHIVE_TASK' || action === 'ARCHIVE_SUBTASK'
                                ? (
                                    <Button size="small" variant="contained" onClick={() => handleArchive()} classes={{ root: classes.archiveAlertButton }}>
                                        ARCHIVE
                                    </Button>
                                )
                                : null}
                        </Grid>
                    </Grid>
                </Alert>
            </Dialog>
        </Grid>
    )
}
export default AlertBox
