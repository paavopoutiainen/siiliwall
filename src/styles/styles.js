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
        minHeight: 600,
        width: 350,
        margin: 5,
        borderRadius: 6,
        padding: 5,
    },

    columnHeader: {
        flexWrap: 'nowrap',
    },

    task: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 4,
        padding: 5,
    },

    taskInner: {
        flexWrap: 'nowrap',
    },

    subtaskComponent: {
        borderRadius: 5,
        backgroundColor: '#fff',
        height: 150,
        marginTop: 2,
        marginBottom: 2,
    },

    subtaskHeader: {
        backgroundColor: 'rgba(255, 140, 85, .8)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flexWrap: 'nowrap',
    },

    subtaskHeaderText: {
        paddingLeft: 10,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },

    subtaskDropdownComponent: {
        height: 30,
    },

    subtaskDropdownButton: {
        height: '100%',
    },

    subtaskContent: {
        padding: 10,
        maxWidth: '310px',
    },

    subtaskContentText: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },

    dialogFocus: {
        minWidth: '100vw',
        maxWidth: '100vw',
        borderRadius: 10,
        boxShadow: '0  9px 46px  8px rgba(0, 0, 0, 0.14),0 11px 15px -7px rgba(0, 0, 0, 0.12),0 24px 38px  3px rgba(0, 0, 0, 0.20)',
        minHeight: '100vh',
        maxHeight: '100vh',
    },

    dialogUnfocus: {
        minWidth: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',
        maxHeight: '100vh',
    },

    undoAlertButton: {
        margin: 5,
    },

    deleteAlertButton: {
        margin: 5,
    },

    archiveAlertButton: {
        margin: 5,
    },

    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
    textColor: {
        color: '#3F51C0',
    },
})
