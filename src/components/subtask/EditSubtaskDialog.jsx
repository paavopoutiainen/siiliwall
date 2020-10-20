import React, { useState } from 'react'
import {
    Dialog, Grid, Button, TextField, DialogContent, DialogActions, DialogTitle,
} from '@material-ui/core'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import useEditSubtask from '../../graphql/subtask/hooks/useEditSubtask'
import { boardPageStyles } from '../../styles/styles'

import useAllUsers from '../../graphql/user/hooks/useAllUsers'

const EditSubtaskDialog = ({
    dialogStatus, editId, toggleDialog, subtask,
}) => {
    const [editSubtask] = useEditSubtask()
    const { loading, data } = useAllUsers()
    const [name, setName] = useState(subtask?.name)
    //const [size, setSize] = useState(task?.size ? task.size : null)
    const [content, setContent] = useState(subtask?.content)
    const [owner, setOwner] = useState(subtask?.owner ? subtask.owner.id : null)
    const arrayOfOldMemberIds = subtask.members.map((user) => user.id)
    const [members, setMembers] = useState(subtask.members.length > 0 ? arrayOfOldMemberIds : [])
    const animatedComponents = makeAnimated()
    const classes = boardPageStyles()

    if (loading) return null

    const handleOwnerChange = (action) => {
        setOwner(action.value)
    }

    /*const handleSizeChange = (event) => {
        if (event.target.value === '') {
            setSize(null)
            return
        }
        setSize(parseFloat(event.target.value))
    }*/

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleContentChange = (event) => {
        setContent(event.target.value)
    }

    const handleMembersChange = (event) => {
        setMembers(Array.isArray(event) ? event.map((user) => user.value) : [])
    }

    const handleSave = (event) => {
        event.preventDefault()
        editSubtask({
            variables: {
                id: editId,
                name,
                content,
                //size,
                ownerId: owner,
                oldMemberIds: arrayOfOldMemberIds,
                newMemberIds: members,
            },
        })
        toggleDialog()
    }

    // Prevents closing dialog when clicking on it to edit subtask's fields
    const handleDialogClick = (e) => e.stopPropagation()

    // Modifiying userData to be of form expected by the react select component
    const modifiedData = data.allUsers.map((user) => {
        const newObject = { value: user.id, label: user.userName }
        return newObject
    })

    const chosenMembersData = subtask.members.map((user) => {
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
                <DialogTitle aria-labelledby="max-width-dialog-title">Edit subtask</DialogTitle>
                <DialogContent>
                    <TextField
                        autoComplete="off"
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        value={name || ''}
                        fullWidth
                        onChange={handleNameChange}
                    />
                    <TextField
                        autoComplete="off"
                        margin="dense"
                        name="content"
                        label="Content"
                        type="text"
                        multiline
                        rows={3}
                        value={content}
                        fullWidth
                        onChange={handleContentChange}
                    />
                    <Select
                        className="selectField"
                        placeholder={subtask?.owner ? subtask.owner.userName : 'Select owner'}
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
                        disabled={!content.length}
                    >
                        Submit edit
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}
export default EditSubtaskDialog