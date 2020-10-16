import React, { useState } from 'react'
import {
    Dialog, Grid, Button, TextField, DialogContent, DialogActions, DialogTitle,
} from '@material-ui/core'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import useEditTask from '../../graphql/task/hooks/useEditTask'
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
    const arrayOfOldMemberIds = task.members.map((user) => user.id)
    const [members, setMembers] = useState(task.members.length > 0 ? arrayOfOldMemberIds : [])
    const animatedComponents = makeAnimated()
    const classes = boardPageStyles()
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

    const handleDescriptionChange = (event) => {
        if (event.target.value === '') {
            setDescription(null)
            return
        }
        setDescription(event.target.value)
    }

    const handleMembersChange = (event) => {
        setMembers(Array.isArray(event) ? event.map((user) => user.value) : [])
    }

    const handleSave = (event) => {
        event.preventDefault()
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

    // Prevents closing dialog when clicking on it to edit task's fields
    const handleDialogClick = (e) => e.stopPropagation()

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
    const modifiedMemberOptions = modifiedData
        .filter((user) => !arrayOfOldMemberIds.includes(user.id))

    return (
        <Grid>
            <Dialog
                fullWidth
                maxWidth="md"
                onClose={toggleDialog}
                open={dialogStatus}
                aria-labelledby="max-width-dialog-title"
                classes={{ paper: classes.dialogPaper }}
                onClick={handleDialogClick}
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
                        id="standard-multiline-static"
                        autoComplete="off"
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        multiline
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
