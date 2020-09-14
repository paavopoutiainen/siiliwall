import React, { useState } from 'react'
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField, Button,
} from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { ADD_BOARD } from '../graphql/mutations'

const NewBoardForm = ({ setOpen, open }) => {
    const [addBoard] = useMutation(ADD_BOARD)
    const [name, setName] = useState('')

    function handleChange(event) {
        setName(event.target.value)
    }

    function handleClose() {
        setOpen(false)
    }

    async function handleSave(event) {
        event.preventDefault()
        addBoard({
            variables: {
                name,
            },
        })
        setName('')
        setOpen(false)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New board</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the credentials for the board.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        onChange={(event) => handleChange(event)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default NewBoardForm
