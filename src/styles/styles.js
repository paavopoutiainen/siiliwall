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

    boardButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        fontSize: '1.4rem',
    },

    addBoardButton: {
        height: '8rem',
        width: '8rem',
        fontSize: '1rem',
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

    title: {
        fontSize: '2rem',
        alignSelf: 'center',
    },

    columnTitle: {
        fontSize: '0.7rem',
    },

    taskTitle: {
        fontSize: '1rem',
    },

    column: {
        backgroundColor: '#EBECF0',
        height: 600,
        width: 350,
        margin: 6,
        borderRadius: 6,
        padding: 5,
    },

    task: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 2,
        marginBottom: 4,
        padding: 5,
    },
})
