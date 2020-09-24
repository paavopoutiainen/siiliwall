import React from 'react'
import { Grid, Snackbar, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { boardPageStyles } from '../styles/styles'

const AlertBox = ({ open, setOpen, alertMsg, deleteTaskById, deleteTaskFromCache, deleteColumnById, deleteColumnFromCache, type }) => {
    const classes = boardPageStyles()

    const handleDelete = (type, option) => {
        if (type === 'TASK' && option === 'DELETE') {
            deleteTaskById()
            deleteTaskFromCache()
        }
        if (type === 'COLUMN' && option === 'DELETE') {
            deleteColumnById()
            deleteColumnFromCache()
        }
        else {
            setOpen(false)
        }
    }

    return (
        <Grid item classes={{ root: classes.alertBox }}>
            <Snackbar
                classes={{ root: classes.snackbar }}
                open={open}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <Alert variant="filled" severity="error">
                    <Grid item container direction="column" spacing={2}>
                        <Grid item>
                            <span id="alertMessage">{alertMsg}</span>
                        </Grid>
                        <Grid item container direction="row" justify="flex-end">
                            <Button variant="contained" onClick={() => handleDelete(type, 'UNDO')}>
                                UNDO
                            </Button>
                            <Button color="secondary" variant="contained" onClick={() => handleDelete(type, 'DELETE')} classes={{ root: classes.snackbarButtonDelete }}>
                                DELETE
                            </Button>
                        </Grid>
                    </Grid>
                </Alert>
            </Snackbar>
            {open ?
                <Grid classes={{ root: classes.invisible }} onClick={() => setOpen(false)} />
                : null
            }
        </Grid>
    )
}
export default AlertBox