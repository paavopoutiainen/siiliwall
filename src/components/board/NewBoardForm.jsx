import React, { useState } from 'react'
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField, Button,
} from '@material-ui/core'
import useAddBoard from '../../graphql/board/hooks/useAddBoard'

const NewBoardForm = ({ setOpen, open }) => {
    const [addBoard] = useAddBoard()
    const [name, setName] = useState('')
    const handleChange = (event) => {
        setName(event.target.value)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
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
                        autoComplete="off"
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        onChange={(event) => handleChange(event)}
                        id="inputName"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={!name.length} onClick={handleSave} color="primary" id="addBoard">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default NewBoardForm
