import React from 'react'
import { Button, Snackbar } from '@material-ui/core'
import { boardPageStyles } from '../styles/styles'

const SnackbarAlert = ({ snackbarStatus, toggleSnackbar, snackbarAction }) => {
    const classes = boardPageStyles()
    let message = null

    switch (snackbarAction) {
    case 'MOVED_COLUMN':
        message = 'Moved column'
        break
    case 'MOVED_TASK_IN_COLUMN':
        message = 'Moved task'
        break
    case 'MOVED_TASK_FROM_COLUMN':
        message = 'Moved task'
        break
    default:
        message = null
        break
    }

    return (
        <Snackbar
            open={snackbarStatus}
            onClose={toggleSnackbar}
            message={message}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            action={(
                <Button
                    onClick={toggleSnackbar}
                    classes={{ root: classes.textColor }}
                >
                    Close
                </Button>
            )}
        />
    )
}

export default SnackbarAlert
