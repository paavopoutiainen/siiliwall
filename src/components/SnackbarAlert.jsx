import React from 'react'
import { Button, Snackbar } from '@material-ui/core'
import { boardPageStyles } from '../styles/styles'

const SnackbarAlert = ({
    snackbarStatus, toggleSnackbar, message,
}) => {
    const classes = boardPageStyles()
    let renderMsg = null
    if (typeof message === 'string') {
        renderMsg = message
    }

    return (
        <Snackbar
            open={snackbarStatus}
            onClose={toggleSnackbar}
            message={renderMsg}
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
