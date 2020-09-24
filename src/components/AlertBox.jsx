import React from 'react'
import { Grid, Snackbar, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { boardPageStyles } from '../styles/styles'
import { DELETE_TASK } from '../graphql/task/taskQueries'
import { useMutation, useApolloClient } from '@apollo/client'
import { TASKORDER } from '../graphql/fragments'

const AlertBox = ({ open, setOpen, columnId, taskId }) => {
    const classes = boardPageStyles()
    const snackbarMsg = "This action will permanently delete this task from the board and can't be later examined! Are you sure you want to delete it?"
    const [deleteTask] = useMutation(DELETE_TASK)
    const client = useApolloClient()

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
        if (option === 'DELETE') {
            deleteTaskById()
            deleteTaskFromCache()
        } else {
            setOpen(false)
        }
    }

    return (
        <Grid item classes={{ root: classes.alertBox }}>
            <Snackbar
                classes={{ root: classes.snackbar }}
                open={open}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <Alert variant="filled" severity="error">
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
            {open ?
                <Grid classes={{ root: classes.invisible }} onClick={() => setOpen(false)} />
                : null
            }
        </Grid>
    )
}
export default AlertBox