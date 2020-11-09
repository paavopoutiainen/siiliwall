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

    addNewButton: {
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
        minHeight: '100%',
        minWidth: '100%',
        padding: 30,
    },

    boardHeader: {
        width: '100%',
    },

    addColumn: {
        minWidth: 250,
    },

    columnRow: {
        flexWrap: 'nowrap',
    },

    column: {
        backgroundColor: '#F5F5F5',
        minHeight: 600,
        width: 330,
    },

    columnHeader: {
        flexWrap: 'nowrap',
        alignItems: 'space-between'
    },

    columnButton: {
        minWidth: 20,
        color: '#949494'
    },

    columnButtonGrid: {
        width: 80

    },

    columnButtons: {
        minWidth: 80,
    },

    columnName: {
        fontFamily: 'Arial, Helvetica, sans-serif',
    },

    task: {
        minHeight: 100,
        borderRadius: 4,
        backgroundColor: 'white',
        width: 312
    },

    taskInner: {
        background: '#000000',
        flexWrap: 'nowrap',
        color: 'white'

    },

    taskInnerDropDownGrid: {
        width: '50px'
    },
    taskTitle: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: 'white',
        fontSize: 12
    },
    taskName: {
        fontSize: 24,
    },


    subtaskComponent: {
        borderRadius: 5,
        backgroundColor: '#fff',
        minHeight: 115,
    },

    subtaskHeader: {
        backgroundColor: 'rgba(255, 140, 85, .8)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    subtaskHeaderTitleItem: {
        width: 200,
    },

    foreingKeyIcon: {
        fontSize: 12
    },

    taskPrettyIdInSubtask: {
        fontSize: 12,
    },

    subtaskHeaderTitleText: {
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

    subtaskContentAndName: {
        maxWidth: 300,

    },

    subtaskContentAndNameText: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },

    taskDropdownComponent: {
        height: 25,
    },
    taskDropdownButton: {
        height: '100%',
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

    alertCheckbox: {
        color: 'white',
        '&$checked': {
            color: 'white',
        },
    },

    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
    textColor: {
        color: '#3F51C0',
    },
})
export const swimlaneStyles = makeStyles({
    swimlaneColumnNames: {
        width: '100%',
        flexWrap: 'nowrap',
    },

    swimlaneColumnName: {
        textAlign: 'center',
        width: 335,
    },

    swimlane: {
        border: '2px solid rgba(0, 0, 0, .3)',
        backgroundColor: 'white',
    },

    swimlaneTitle: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        width: '100%',
    },

    swimlaneColumnList: {
        minHeight: 133,
        width: '100%',
        flexWrap: 'nowrap',
    },

    swimlaneColumn: {
        border: '2px solid lightgrey',
        width: 327,
        minHeight: 133,
        backgroundColor: '#EBECF0',
        flexWrap: 'nowrap',
    },
})
