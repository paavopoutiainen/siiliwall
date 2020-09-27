/* eslint-disable object-curly-newline */
import React, { useState } from 'react'
import { Dialog, Grid, Button, TextField, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import Select from 'react-select'
import '../../styles.css'
import useAddTask from '../../graphql/task/hooks/useAddTask'
import useAllUsers from '../../graphql/user/hooks/useAllUsers'

const AddTaskDialog = ({ dialogStatus, column, toggleDialog }) => {
    const { loading, data } = useAllUsers()
    const [addTask] = useAddTask(column.id)
    const [title, setTitle] = useState('')
    const [size, setSize] = useState(null)
    const [owner, setOwner] = useState(null)
    const [members, setMembers] = useState([])

    if (loading) return null

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleOwnerChange = (action) => {
        setOwner(action.value)
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
                ownerId: owner,
                members,
            },
        })
        toggleDialog()
        setTitle('')
        setSize(null)
        setOwner(null)
    }

    const modifiedData = data.allUsers.map((user) => {
        const newObject = { value: user.id, label: user.userName }
        return newObject
    })

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
                        onChange={handleTitleChange}
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
                    <Select
                        className="selectField"
                        placeholder="Select owner"
                        options={modifiedData}
                        onChange={handleOwnerChange}
                    />
                    <Select
                        isMulti
                        className="selectField"
                        placeholder="Select members"
                        options={modifiedData}
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
export default AddTaskDialog
