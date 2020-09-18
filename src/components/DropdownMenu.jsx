import React, { useState } from 'react'
import { Menu, MenuItem, Button, ListItemIcon, ListItemText } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Delete from '@material-ui/icons/Delete'
import { DELETE_COLUMN } from '../graphql/mutations'
import { useMutation, useApolloClient } from '@apollo/client'

const DropdownMenu = ({ id, board }) => {
    const [deleteColumn] = useMutation(DELETE_COLUMN)
    const [anchorEl, setAnchorEl] = useState(null)
    const client = useApolloClient()

    function handleClick(event) {
        setAnchorEl(event.currentTarget)
    }

    function handleClose() {
        deleteColumnById()
        updateCache()
        setAnchorEl(null)
    }

    function deleteColumnById() {
        deleteColumn({
            variables: {
                columnId: id
            }
        })
    }
    // Halutaan poistaa cachen board oliosta columnOrder taulukosta se columnId mikä poistettiin tietokannasta

    console.log(client.cache.data.data.ROOT_QUERY)

    // const dataInCache = client.readQuery({ query: GET_BOARD_BY_ID, variables: { boardId: boardId } })
    /*const columnOrder = dataInCache.boardById.columnOrder
    console.log(columnOrder)*/
    /*const newColumnOrder = []
    client.writeFragment({
        id: boardId,
        fragment: gql`
            fragment columnOrder on Board {
                columnOrder
            }
        `,
        data: {
            columnOrder: newColumnOrder,
        }
    })*/
    console.log(board)
    function updateCache() {


        const columnId = `Column:${id}`
        client.cache.evict({ id: columnId })
    }

    return (
        <div>
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
            >
                <MenuItem onClick={handleClose} >
                    <ListItemIcon>
                        <Delete fontSize="default" />
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                </MenuItem>
            </Menu>
        </div>
    )
}
export default DropdownMenu