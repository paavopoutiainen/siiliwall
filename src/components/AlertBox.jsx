import React, { useEffect } from 'react'
import { Grid, Snackbar, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useMutation, useApolloClient } from '@apollo/client'
import { boardPageStyles } from '../styles/styles'
import { DELETE_COLUMN } from '../graphql/column/columnQueries'
import { COLUMNORDER, TASKORDER } from '../graphql/fragments'
import { DELETE_TASK } from '../graphql/task/taskQueries'
import useArchiveTask from '../graphql/task/hooks/useArchiveTask'

const AlertBox = ({
    open, setOpen, action, columnId, boardId, taskId,
}) => {
    const [archiveTask] = useArchiveTask(columnId)
    const classes = boardPageStyles()
    const client = useApolloClient()
    const [deleteColumn] = useMutation(DELETE_COLUMN)
    const [deleteTask] = useMutation(DELETE_TASK)
    const alertMsgDeleteColumn = 'This action will permanently remove the selected column and the tasks inside the column from your board and they can\'t be later examined! Are you sure you want to delete it?'
    const alertMsgDeleteTask = 'This action will permanently delete this task from the board and it can\'t be later examined! Are you sure you want to delete it?'
    const alertMsgArchiveTask = 'The task is removed from the board, but can be examined through the archive setting.'
    let alertMsg

    switch (action) {
        case 'DELETE_COLUMN':
            alertMsg = alertMsgDeleteColumn
            break
        case 'DELETE_TASK':
            alertMsg = alertMsgDeleteTask
            break
        case 'ARCHIVE_TASK':
            alertMsg = alertMsgArchiveTask
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

    const deleteColumnById = () => {
        deleteColumn({
            variables: {
                columnId,
            },
        })
    }

    const deleteColumnFromCache = () => {
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

    const handleDelete = (option) => {
        if (action === 'DELETE_TASK' && option === 'DELETE') {
            deleteTaskById()
            deleteTaskFromCache()
        }
        if (action === 'DELETE_COLUMN' && option === 'DELETE') {
            deleteColumnById()
            deleteColumnFromCache()
        } else {
            setOpen(false)
        }
    }

    const handleArchive = (option) => {
        if (action === 'ARCHIVE_TASK' && option === 'ARCHIVE') {
            archiveTaskById()
        } else {
            setOpen(false)
        }
    }


    useEffect(() => {
        const boardEl = document.getElementById('boardElement')
        if (open === true) {
            boardEl.style.pointerEvents = 'none'
            boardEl.style.backgroundColor = 'rgba(200, 200, 200, .8)'
        } else {
            boardEl.style.pointerEvents = 'auto'
            boardEl.style.backgroundColor = 'rgba(255, 255, 255, 1)'
        }
    }, [open])

    return (
        <Grid item>
            <Snackbar
                classes={open ? { root: classes.snackbarFocus } : { root: classes.snackbarUnfocus }}
                open={open}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                id="snackbarElement"
            >
                <Alert variant="filled" severity="error">
                    <Grid item container direction="column" spacing={2}>
                        <Grid item>
                            <span id="alertMessage">{alertMsg}</span>
                        </Grid>
                        <Grid item container direction="row" justify="flex-end">
                            <Button size="small" variant="contained" onClick={() => handleDelete('UNDO')} classes={{ root: classes.undoAlertButton }}>
                                UNDO
                            </Button>
                            {action === 'DELETE_TASK' || action === 'DELETE_COLUMN'
                                ? (
                                    <Button size="small" color="secondary" variant="contained" onClick={() => handleDelete('DELETE')} classes={{ root: classes.deleteAlertButton }}>
                                        DELETE
                                    </Button>
                                )
                                : null}
                            {action === 'ARCHIVE_TASK'
                                ? (
                                    <Button size="small" variant="contained" onClick={() => handleArchive('ARCHIVE')} classes={{ root: classes.archiveAlertButton }}>
                                        ARCHIVE
                                    </Button>
                                )
                                : null}
                        </Grid>
                    </Grid>
                </Alert>
            </Snackbar>
        </Grid>
    )
}
export default AlertBox
