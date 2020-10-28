/* eslint-disable object-curly-newline */
import React, { useState } from 'react'
import { Dialog, Grid, Button, TextField, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import Select from 'react-select'
import { useApolloClient } from '@apollo/client'
import { boardPageStyles } from '../../styles/styles'
import '../../styles.css'
import useAddSubtask from '../../graphql/subtask/hooks/useAddSubtask'
import useAllUsers from '../../graphql/user/hooks/useAllUsers'
import { TICKETORDER, BOARDS_COLUMNS_AND_COLUMNORDER } from '../../graphql/fragments'

const AddSubtaskDialog = ({ addDialogStatus, toggleAddDialog, columnId, taskId, boardId }) => {
    const { loading, data } = useAllUsers()
    const classes = boardPageStyles()
    const [addSubtask] = useAddSubtask()
    const client = useApolloClient()
    const [name, setName] = useState('')
    const [size, setSize] = useState(null)
    const [content, setContent] = useState('')
    const [owner, setOwner] = useState(null)
    const [members, setMembers] = useState([])
    const [inputColumnId, setInputColumnId] = useState(null)

    const { columns, columnOrder } = client.cache.readFragment({
        id: `Board:${boardId}`,
        fragment: BOARDS_COLUMNS_AND_COLUMNORDER,
    })

    const columnOfParentTask = columns.find((col) => col.id === columnId).name

    if (loading) return null

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleContentChange = (event) => {
        setContent(event.target.value)
    }

    const handleSizeChange = (event) => {
        if (event.target.value === '') {
            setSize(null)
            return
        }
        setSize(parseFloat(event.target.value))
    }

    const handleOwnerChange = (action) => {
        setOwner(action.value)
    }

    const handleMembersChange = (event) => {
        setMembers(Array.isArray(event) ? event.map((user) => user.value) : [])
    }

    const handleColumnChange = (action) => {
        setInputColumnId(action.value)
    }

    const emptyState = () => {
        setName('')
        setContent('')
        setSize(null)
        setOwner(null)
        setInputColumnId(null)
        setMembers([])
    }

    const handleSave = (event) => {
        event.preventDefault()
        // Get the ticketOrder of the column to which user is creating the subtask
        const { ticketOrder } = client.cache.readFragment({
            id: `Column:${inputColumnId || columnId}`,
            fragment: TICKETORDER,
        })
        const ticketOrderWithoutTypename = ticketOrder.map((obj) => ({ ticketId: obj.ticketId, type: obj.type }))
        addSubtask({
            variables: {
                columnId: inputColumnId || columnId,
                taskId,
                boardId,
                ownerId: owner,
                memberIds: members,
                name,
                content,
                size,
                ticketOrder: ticketOrderWithoutTypename,
            },
        })
        emptyState()
        toggleAddDialog(event)
    }

    const handleCancel = () => {
        emptyState()
        toggleAddDialog()
    }

    const modifiedData = data.allUsers.map((user) => {
        const newObject = { value: user.id, label: user.userName }
        return newObject
    })

    const columnsData = columnOrder.map((id) => columns.find((col) => col.id === id)).map((col) => {
        const newObject = { value: col.id, label: col.name }
        return newObject
    })

    return (
        <Grid>
            <Dialog
                fullWidth
                maxWidth="md"
                onClose={toggleAddDialog}
                open={addDialogStatus}
                aria-labelledby="max-width-dialog-title"
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle aria-labelledby="max-width-dialog-title">Create new subtask</DialogTitle>
                <DialogContent>
                    <TextField
                        autoComplete="off"
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        value={name}
                        fullWidth
                        onChange={handleNameChange}
                    />
                    <TextField
                        required
                        autoComplete="off"
                        margin="dense"
                        name="content"
                        label="Content"
                        type="text"
                        value={content}
                        fullWidth
                        onChange={handleContentChange}
                    />
                    <TextField
                        autoComplete="off"
                        margin="dense"
                        name="size"
                        label="Size"
                        type="text"
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
                    <Select
                        className="selectField"
                        placeholder={`Select column - ${columnOfParentTask}`}
                        options={columnsData}
                        onChange={handleColumnChange}
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
                        disabled={!content.length}
                        onClick={handleSave}
                        color="primary"
                    >
                        Create subtask
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}
export default AddSubtaskDialog
