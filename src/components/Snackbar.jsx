import React, { useState } from 'react'

const Snackbar = ({ snackbarStatus, toggleSnacbar }) => {

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            message="I love snacks"
            key={Transition.name}
        />
    )
}
export default Snackbar
