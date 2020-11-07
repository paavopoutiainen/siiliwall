import React, { useEffect, useState } from 'react'
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
    const [title, setTitle] = useState()
    const [size, setSize] = useState()
    const [description, setDescription] = useState()
    const [owner, setOwner] = useState()
    const [members, setMembers] = useState()
    const arrayOfOldMemberIds = task.members.map((user) => user.id)
    const animatedComponents = makeAnimated()
    const classes = boardPageStyles()

    useEffect(() => {
        setTitle(task.title)
        setSize(task.size)
        setOwner(task.owner ? task.owner.id : null)
        setMembers(task.members.length > 0 ? arrayOfOldMemberIds : [])
        setDescription(task.description)
    }, [task])

    if (loading) return null

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleOwnerChange = (action) => {
        setOwner(action != null ? action.value : null)
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

    const recoverState = () => {
        setTitle(task?.title)
        setSize(task?.size ? task.size : null)
        setOwner(task?.owner ? task.owner.id : null)
        setMembers(task.members.length > 0 ? arrayOfOldMemberIds : [])
        setDescription(task?.description)
    }

    const handleCancel = () => {
        recoverState()
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

    const chosenOwnerData = modifiedData.map((user) => {
        if (user.value === owner) {
            const newObject = { value: user.value, label: user.label }
            return newObject
        }
    })

    return (
        <Grid>
            <Dialog
                fullWidth
                maxWidth="md"
                onClose={handleCancel}
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
                        isClearable
                        placeholder="Select owner"
                        options={modifiedData}
                        defaultValue={chosenOwnerData}
                        onChange={handleOwnerChange}
                        id="taskSelectOwner"
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
                        id="taskSelectMember"
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
                        onClick={handleCancel}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        color="primary"
                        id="submitEditTaskButton"
                    >
                        Submit edit
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}
export default EditTaskDialog
