/* eslint-disable max-len */
import React, { useState } from 'react'
import {
    Dialog, Grid, Button, TextField, DialogContent, DialogActions, DialogTitle,
} from '@material-ui/core'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import useEditTask from '../../graphql/task/hooks/useEditTask'
import {
    sizeSchema, titleSchema, descriptionSchema, taskSchema,
} from './validationSchema'
import { boardPageStyles } from '../../styles/styles'

import useAllUsers from '../../graphql/user/hooks/useAllUsers'

const EditTaskDialog = ({
    dialogStatus, editId, toggleDialog, task,
}) => {
    const [editTask] = useEditTask()
    const { loading, data } = useAllUsers()
    const [title, setTitle] = useState(task?.title)
    const [size, setSize] = useState(task?.size ? task.size : null)
    const [description, setDescription] = useState(task?.description)
    const [owner, setOwner] = useState(task?.owner ? task.owner.id : null)
    const [sizeError, setSizeError] = useState('')
    const [titleError, setTitleError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const arrayOfOldMemberIds = task.members.map((user) => user.id)
    const [members, setMembers] = useState(task.members.length > 0 ? arrayOfOldMemberIds : [])
    const animatedComponents = makeAnimated()
    const classes = boardPageStyles()
    if (loading) return null

    const handleTitleChange = (event) => {
        const input = event.target.value
        titleSchema.validate(input).catch((err) => {
            setTitleError(err.message)
        })
        setTitleError('')
        setTitle(input)
    }

    const handleOwnerChange = (action) => {
        setOwner(action.value)
    }

    const handleSizeChange = (event) => {
        const input = parseInt(event.target.value, 10)
        if (input === '') {
            setSize(null)
            return
        }
        sizeSchema.validate(input).catch((err) => {
            setSizeError(err.message)
        })
        setSize(input)
        setSizeError('')
    }

    const handleDescriptionChange = (event) => {
        const input = event.target.value
        if (input === '') {
            setDescription(null)
            return
        }
        descriptionSchema.validate(input).catch((err) => {
            setSizeError(err.message)
        })
        setDescriptionError('')
        setDescription(input)
    }

    const handleMembersChange = (event) => {
        setMembers(Array.isArray(event) ? event.map((user) => user.value) : [])
    }

    const handleSave = async (event) => {
        event.preventDefault()
        const isValid = await taskSchema.isValid({ title, size, description })
        if (isValid) {
            editTask({
                variables: {
                    taskId: editId,
                    title,
                    size,
                    ownerId: owner,
                    oldMemberIds: arrayOfOldMemberIds,
                    newMemberIds: members,
                    description,
                },
            })
            toggleDialog()
        }
    }

    // Modifiying userData to be of form expected by the react select component
    const modifiedData = data.allUsers.map((user) => {
        const newObject = { value: user.id, label: user.userName }
        return newObject
    })

    const chosenMembersData = task.members.map((user) => {
        const newObject = { value: user.id, label: user.userName }
        return newObject
    })
    // data for showing only the members not yet chosen
    const modifiedMemberOptions = modifiedData.filter((user) => !arrayOfOldMemberIds.includes(user.id))

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
                <DialogTitle aria-labelledby="max-width-dialog-title">Edit task</DialogTitle>
                <DialogContent>
                    <TextField
                        error={titleError.length > 0}
                        id="filled-error-helper-text"
                        autoComplete="off"
                        autoFocus={true}
                        required={true}
                        margin="dense"
                        name="title"
                        label="Name"
                        type="text"
                        value={title}
                        fullWidth
                        helperText={titleError}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        error={sizeError.length > 0}
                        id="filled-error-helper-text"
                        autoComplete="off"
                        margin="dense"
                        name="size"
                        label="Size"
                        type="number"
                        value={size || ''}
                        fullWidth
                        helperText={sizeError}
                        onChange={handleSizeChange}
                    />
                    <Select
                        className="selectField"
                        placeholder={task?.owner ? task.owner.userName : 'Select owner'}
                        options={modifiedData}
                        onChange={handleOwnerChange}
                    />
                    <Select
                        className="selectField"
                        closeMenuOnSelect={false}
                        placeholder="Select members"
                        options={modifiedMemberOptions}
                        defaultValue={chosenMembersData}
                        components={animatedComponents}
                        isMulti
                        onChange={handleMembersChange}
                    />
                    <TextField
                        error={descriptionError.length > 0}
                        id="standard-multiline-static, filled-error-helper-text"
                        autoComplete="off"
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        multiline
                        helperText={descriptionError}
                        rows={3}
                        value={description || ''}
                        fullWidth
                        onChange={handleDescriptionChange}
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
export default EditTaskDialog
