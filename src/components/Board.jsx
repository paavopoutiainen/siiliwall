import React from 'react'
import { Grid } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { DragDropContext } from 'react-beautiful-dnd'
import { GET_BOARD_BY_ID } from '../graphql/queries'
import { boardPageStyles } from '../styles/styles'
import ColumnList from './ColumnList'
import '../styles.css'

const Board = ({ id }) => {
    const { loading, error, data } = useQuery(GET_BOARD_BY_ID, {
        variables: {
            boardId: id,
        },
    })
    const classes = boardPageStyles()

    if (loading) return <h1>Loading board..</h1>
    if (error) return `Error: ${error.message}`

    const board = data.boardById

    const columnOrderArray = board.columnOrder
    const { columns } = board

    const onDragEnd = () => {
        console.log('here')
    }

    return (
        <div style={{ padding: 20 }}>
            <Grid
                container
                direction="column"
                classes={{ root: classes.root }}
                spacing={3}
            >
                <Grid item classes={{ root: classes.title }} xs={12}>
                    <h1>{board.name}</h1>
                </Grid>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Grid item container direction="row">
                        <ColumnList columns={columns} columnOrder={columnOrderArray} />
                    </Grid>
                </DragDropContext>
            </Grid>
        </div>

    )
}
export default Board
