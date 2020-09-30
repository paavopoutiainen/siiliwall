/* eslint-disable object-curly-newline */
import React, { useState } from 'react'
import { Dialog, Grid, Button, TextField, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import Select from 'react-select'
import { boardPageStyles } from '../../styles/styles'
import '../../styles.css'
import useAllUsers from '../../graphql/user/hooks/useAllUsers'

const AddSubtaskDialog = ({ dialogStatus, column, toggleDialog }) => {
    const { loading, data } = useAllUsers()
    const classes = boardPageStyles()
    const [content, setContent] = useState('')
    const [owner, setOwner] = useState(null)
    const [members, setMembers] = useState([])

    if (loading) return null

    const handleContentChange = (event) => {
        setContent(event.target.value)
    }

    const handleOwnerChange = (action) => {
        setOwner(action.value)
    }

    const handleMembersChange = (event) => {
        setMembers(Array.isArray(event) ? event.map((user) => user.value) : [])
    }

    const handleSave = (event) => {
        event.preventDefault()
        toggleDialog()
        setOwner(null)
        setMembers([])
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
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle aria-labelledby="max-width-dialog-title">Create new subtask</DialogTitle>
                <DialogContent>
                    <TextField
                        autoComplete="off"
                        margin="dense"
                        name="content"
                        label="Content"
                        type="text"
                        value={content}
                        fullWidth
                        onChange={handleContentChange}
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
                        disabled={!content.length}
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
export default AddSubtaskDialog