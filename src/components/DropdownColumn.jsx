import React, { useState } from 'react'
import { Menu, MenuItem, Button, ListItemIcon, ListItemText, Grid } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Delete from '@material-ui/icons/Delete'
import { DELETE_COLUMN } from '../graphql/mutations'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import { boardPageStyles } from '../styles/styles'

const DropdownColumn = ({ columnId, boardId }) => {
    const [deleteColumn] = useMutation(DELETE_COLUMN)
    const [anchorEl, setAnchorEl] = useState(null)
    const client = useApolloClient()
    const classes = boardPageStyles()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        deleteColumnById()
        deleteColumnFromCache()
        setAnchorEl(null)
    }

    const deleteColumnById = () => {
        deleteColumn({
            variables: {
                columnId: columnId
            }
        })
    }

    const deleteColumnFromCache = () => {
        const idToBeDeleted = `Column:${columnId}`
        const boardIdForCache = `Board:${boardId}`
        const data = client.readFragment({
            id: boardIdForCache,
            fragment: gql`
                fragment columnOrder on Board {
                    columnOrder
                }
            `
        })
        const newColumnOrder = data.columnOrder.filter((id) => id !== columnId)

        client.writeFragment({
            id: boardIdForCache,
            fragment: gql`
                fragment columnOrder on Board {
                    columnOrder
                }
            `,
            data: {
                columnOrder: newColumnOrder
            }
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
                onSelect
                selected
            >
                <MenuItem onClick={handleClose} >
                    <ListItemIcon>
                        <Delete fontSize="default" />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
            </Menu>
        </Grid>
    )
}
export default DropdownColumn