import React, { useState } from 'react'
import {
    Dialog, Grid, Button, TextField, DialogContent, DialogActions, DialogTitle,
} from '@material-ui/core'
import useEditTask from '../graphql/task/hooks/useEditTask'

const TaskDialog = ({
    dialogStatus, editId, toggleDialog, task,
}) => {
    console.log(task)
    const [editTask] = useEditTask()
    const [title, setTitle] = useState(task?.title)
    const [size, setSize] = useState(task?.size ? task.size : null)
    const [owner, setOwner] = useState(task?.owner ? task.owner : null)

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleOwnerChange = (event) => {
        if (event.target.value === '') {
            setOwner(null)
            return
        }
        setOwner(event.target.value)
    }

    const handleSizeChange = (event) => {
        if (event.target.value === '') {
            setSize(null)
            return
        }
        setSize(parseFloat(event.target.value))
    }

    const handleSave = (event) => {
        event.preventDefault()
        editTask({
            variables: {
                taskId: editId,
                title,
                size,
                owner,
            },
        })
        toggleDialog()
    }

    return (
        <Grid>
            <Dialog
                fullWidth
                maxWidth="md"
                onClose={toggleDialog}
                open={dialogStatus}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle aria-labelledby="max-width-dialog-title">Edit task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoComplete="off"
                        margin="dense"
                        name="title"
                        label="Name"
                        type="text"
                        value={title}
                        fullWidth
                        onChange={handleChange}
                    />
                    <TextField
                        autoComplete="off"
                        margin="dense"
                        name="owner"
                        label="Owner"
                        type="text"
                        value={owner || ''}
                        fullWidth
                        onChange={handleOwnerChange}
                    />
                    <TextField
                        autoComplete="off"
                        margin="dense"
                        name="size"
                        label="Size"
                        type="number"
                        value={size || ''}
                        fullWidth
                        onChange={handleSizeChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={toggleDialog}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        color="primary"
                    >
                        Submit edit
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}
export default TaskDialog
