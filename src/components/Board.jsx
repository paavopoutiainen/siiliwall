/* eslint-disable max-len */
import React from 'react'
import { Grid } from '@material-ui/core'
import {
    useMutation, useApolloClient,
} from '@apollo/client'
import { DragDropContext } from 'react-beautiful-dnd'
import { boardPageStyles } from '../styles/styles'
import ColumnList from './ColumnList'
import { CHANGE_TASKORDER_IN_COLUMN, CHANGE_TASKORDER_IN_TWO_COLUMNS } from '../graphql/mutations'
import { useBoardById } from '../graphql/board/hooks/useBoardById'
import '../styles.css'
import { onDragEnd } from '../utils/onDragEnd'

const Board = ({ id }) => {
    const { data, loading } = useBoardById(id)

    const [changeTaskOrderInColumn] = useMutation(CHANGE_TASKORDER_IN_COLUMN)
    const [changeTaskOrdersInColumns] = useMutation(CHANGE_TASKORDER_IN_TWO_COLUMNS)
    const client = useApolloClient()
    const classes = boardPageStyles()

    if (loading) return null

    const board = data.boardById
    const { columnOrder, columns } = board

    // TODO, move this function into utils folder

    return (
        <div className="container">
            <Grid
                container
                direction="column"
                classes={{ root: classes.root }}
                spacing={2}
            >
                <Grid container item direction="row" justify="center" classes={{ root: classes.boardTitle }}>
                    <h1>{board.name}</h1>
                </Grid>
                <DragDropContext onDragEnd={(result) => onDragEnd(result, changeTaskOrderInColumn, changeTaskOrdersInColumns, client, columns, board)}>
                    <Grid item container direction="row">
                        <ColumnList columns={columns} columnOrder={columnOrder} />
                    </Grid>
                </DragDropContext>
            </Grid>
        </div>
    )
}
export default Board
