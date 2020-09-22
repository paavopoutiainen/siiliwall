/* eslint-disable object-curly-newline */
import React, { useState } from 'react'
import { Dialog, Grid, Button, TextField, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import useAddTask from '../graphql/task/hooks/useAddTask'

const TaskDialog = ({ dialogStatus, column, toggleDialog }) => {
    const [addTask] = useAddTask(column.id)
    const [title, setTitle] = useState('')
    const [size, setSize] = useState(null)

    const handleChange = (event) => {
        setTitle(event.target.value)
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
        addTask({
            variables: {
                columnId: column.id,
                title,
                size,
            },
        })
        toggleDialog()
        setTitle('')
        setSize(null)
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
                <DialogTitle aria-labelledby="max-width-dialog-title">Create new task</DialogTitle>
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
                        disabled={!title.length}
                        onClick={handleSave}
                        color="primary"
                    >
                        Create task
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}
export default TaskDialog
