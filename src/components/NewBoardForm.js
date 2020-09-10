import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText,
     DialogTitle, TextField, Button } from '@material-ui/core'

const NewBoardForm = ({ setOpen, open }) => {

    function handleClose() {
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
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
       </div>
    )
}
export default NewBoardForm