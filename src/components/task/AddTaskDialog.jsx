import React, { useState } from 'react'
import {
    Dialog, Grid, Button, TextField, DialogContent, DialogActions, DialogTitle,
} from '@material-ui/core'
import * as yup from 'yup'
import Select from 'react-select'
import { boardPageStyles } from '../../styles/styles'
import '../../styles.css'
import useAddTask from '../../graphql/task/hooks/useAddTask'
import useAllUsers from '../../graphql/user/hooks/useAllUsers'

const AddTaskDialog = ({ dialogStatus, column, toggleDialog }) => {
    const { loading, data } = useAllUsers()
    const [addTask] = useAddTask(column.id)
    const [title, setTitle] = useState('')
    const [size, setSize] = useState(null)
    const [owner, setOwner] = useState(null)
    const classes = boardPageStyles()
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
        setSize(event.target.value)
    }
    const handleMembersChange = (event) => {
        setMembers(Array.isArray(event) ? event.map((user) => user.value) : [])
    }

    const addTaskSchema = yup.object().shape({
        title: yup.string().trim().required(),
        size: yup.number().integer().min(1).max(10),
    })

    const handleSave = (event) => {
        event.preventDefault()
        addTask({
            variables: {
                columnId: column.id,
                title,
                size,
                ownerId: owner,
                memberIds: members,
            },
        })
        toggleDialog()
        setTitle('')
        setSize(null)
        setOwner(null)
        setMembers([])
    }

    const validate = addTaskSchema.isValid(title, size).then(handleSave)

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
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle aria-labelledby="max-width-dialog-title">Create new task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoComplete="off"
                        autoFocus={true}
                        required={true}
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
                        onChange={handleMembersChange}
                        closeMenuOnSelect={false}
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
                        onClick={validate}
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
