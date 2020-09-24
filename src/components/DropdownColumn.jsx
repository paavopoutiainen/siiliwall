import React, { useState } from 'react'
import {
    Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid
} from '@material-ui/core'
import AlertBox from './AlertBox'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Delete from '@material-ui/icons/Delete'
import { useMutation, useApolloClient } from '@apollo/client'
import { DELETE_COLUMN } from '../graphql/column/columnQueries'
import { COLUMNORDER } from '../graphql/fragments'

const DropdownColumn = ({ columnId, boardId }) => {
    const client = useApolloClient()
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const alertMsg = `This action will permanently remove the selected column and the tasks inside the column from your board and can't be later examined! Are you sure you want to delete it?`
    const [deleteColumn] = useMutation(DELETE_COLUMN)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const openSnackbar = () => {
        setOpen(true)
        setAnchorEl(null)
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
            <AlertBox
                open={open}
                setOpen={setOpen}
                alertMsg={alertMsg}
                deleteColumnById={deleteColumnById}
                deleteColumnFromCache={deleteColumnFromCache}
                type={'COLUMN'}
            />
        </Grid>
    )
}
export default DropdownColumn