import React, { useState } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid, Snackbar
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Delete from '@material-ui/icons/Delete'
import { useMutation, useApolloClient } from '@apollo/client'
import { DELETE_COLUMN } from '../graphql/column/columnQueries'
import { COLUMNORDER } from '../graphql/fragments'
import { boardPageStyles } from '../styles/styles'

const DropdownColumn = ({ columnId, boardId }) => {
    const [deleteColumn] = useMutation(DELETE_COLUMN)
    const [anchorEl, setAnchorEl] = useState(null)
    const client = useApolloClient()
    const classes = boardPageStyles()
    const [open, setOpen] = useState(false)
    const snackbarMsg = `This action will permanently remove the selected column from your project and can't be later examined! Are you sure you want to delete it?`

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const deleteColumnById = () => {
        deleteColumn({
            variables: {
                columnId,
            },
        })
    }

    const deleteColumnFromCache = () => {
        const idToBeDeleted = `Column:${columnId}`
        const boardIdForCache = `Board:${boardId}`
        const data = client.readFragment({
            id: boardIdForCache,
            fragment: COLUMNORDER,
        })
        const newColumnOrder = data.columnOrder.filter((id) => id !== columnId)

        client.writeFragment({
            id: boardIdForCache,
            fragment: COLUMNORDER,
            data: {
                columnOrder: newColumnOrder,
            },
        })
        client.cache.evict({ id: idToBeDeleted })
    }

    const openSnackbar = () => {
        setOpen(true)
        setAnchorEl(null)
    }

    const handleClose = (option) => {
        if (option === 'DELETE') {
            deleteColumnById()
            deleteColumnFromCache()
        } else {
            setOpen(false)
        }
    }

    return (
        <Grid item>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreHorizIcon fontSize="large" />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                getContentAnchorEl={null}
                elevation={0}
                selected
            >
                <MenuItem onClick={openSnackbar}>
                    <ListItemIcon>
                        <Delete fontSize="default" />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
            </Menu>
            <Snackbar
                classes={{ root: classes.snackbar }}
                open={open}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <Alert variant="outlined" severity="error">
                    <Grid item container direction="column">
                        <Grid item>
                            <span id="snackbarMessage">{snackbarMsg}</span>
                        </Grid>
                        <Grid item container direction="row" justify="flex-end">
                            <Button variant="contained" onClick={() => handleClose('UNDO')}>
                                UNDO
                            </Button>
                            <Button color="secondary" variant="contained" onClick={() => handleClose('DELETE')} classes={{ root: classes.snackbarButtonDelete }}>
                                DELETE
                            </Button>
                        </Grid>
                    </Grid>
                </Alert>
            </Snackbar>
        </Grid>
    )
}
export default DropdownColumn