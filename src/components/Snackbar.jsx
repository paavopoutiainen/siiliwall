import React from 'react'

const Snackbar = ({ snackbarStatus, toggleSnacbar, snackbarAction }) => {
    let message

    switch (snackbarAction) {
    case 'COLUMN_MOVED':
        message = 'Column moved'
        break
    default:
        message = 'jee'
        break
    }

    return (
        <Snackbar
            open={snackbarStatus}
            onClose={toggleSnacbar}
            message={message}
        />
    )
}

export default Snackbar
