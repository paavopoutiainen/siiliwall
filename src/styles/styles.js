import { makeStyles } from '@material-ui/styles'

export const landingPageStyles = makeStyles({
    root: {
        minHeight: '100vh',
    },

    title: {
        fontSize: '2rem',
    },

    boardButtonGrid: {
        minWidth: 200,
    },
    boardButtonGridLongText: {
        maxHeight: 200,
        maxWidth: 200,
    },

    boardButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        fontSize: '0.9rem',
        minWidth: '16rem',
    },

    addBoardButton: {
        height: '6rem',
        width: '6rem',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        borderRadius: '50%',
        border: '2px solid #ff8d58',
        color: '#ff8d58',
        textAlign: 'center',
        textDecoration: 'none',
    },
})

export const boardPageStyles = makeStyles({
    root: {
        minHeight: '100vh',
    },

    columnRow: {
        flexWrap: 'nowrap',
    },

    column: {
        backgroundColor: '#EBECF0',
        height: 600,
        width: 350,
        margin: 5,
        borderRadius: 6,
        padding: 5,
    },

    task: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        margin: 3,
        borderRadius: 4,
        padding: 5,
    },

    taskInner: {
        flexWrap: 'nowrap',
    },

    dropDownMenu: {
        backgroundColor: '!important lightgrey',
    },

    snackbar: {
        maxWidth: 350,
    },

    alertBox: {
        zIndex: 1,
    },

    invisible: {
        height: '100vh',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100vw',
        zIndex: 0,
    },
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
})
