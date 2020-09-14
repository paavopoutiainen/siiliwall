import React from 'react'
import { Grid } from '@material-ui/core'
import { useQuery, useMutation } from '@apollo/client'
import { DragDropContext } from 'react-beautiful-dnd'
import { GET_BOARD_BY_ID } from '../graphql/queries'

import { boardPageStyles } from '../styles/styles'
import ColumnList from './ColumnList'
import { CHANGE_TASKORDER_FOR_ONE_COLUMN } from '../graphql/mutations'
import '../styles.css'

const Board = ({ id }) => {
    const {
        loading, error, data,
    } = useQuery(GET_BOARD_BY_ID, {
        variables: {
            boardId: id,
        },
    })

    const [changeTaskOrderForOneColumn, dataOfMutation] = useMutation(CHANGE_TASKORDER_FOR_ONE_COLUMN)
    const classes = boardPageStyles()

    if (loading) return <h1>Loading board..</h1>
    if (error) return `Error: ${error.message}`

    const board = data.boardById

    const columnOrderArray = board.columnOrder
    const { columns } = board

    // TODO, move this function into utils folder
    const onDragEnd = async (result) => {
        console.log('here', result)
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        // When task is moved within one column
        if (destination.droppableId === source.droppableId) {
            const column = columns.find((col) => col.id === source.droppableId)
            const newTaskOrder = Array.from(column.taskOrder)

            newTaskOrder.splice(source.index, 1)
            newTaskOrder.splice(destination.index, 0, draggableId)

            await changeTaskOrderForOneColumn({
                variables: {
                    orderArray: newTaskOrder,
                    columnId: column.id,
                },
            })
            // TODO, figure out if the cache can be updated here before the mutation is sent
            // Now there is a lag when showing the new order of tasks in the client
            // When reordering the tasks the cache is updated and the new order is shown
            // only once the response arrives from the server, this needs to be fixed
        }

        // When task is moved into another column
        if (destination.droppableId !== source.droppableId) {
            const sourceColumn = columns.find((col) => col.id === source.droppableId)
            const destinationColumn = columns.find((col) => col.id === destination.droppableId)
            const newTaskOrderOfSourceColumn = Array.from(sourceColumn.taskOrder)
            const newTaskOrderOfDestinationColumn = Array.from(destinationColumn.taskOrder)

            newTaskOrderOfSourceColumn.splice(source.index, 1)
            newTaskOrderOfDestinationColumn.splice(destination.index, 0, draggableId)
            // TODO, write a mutation and call for it
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <Grid
                container
                direction="column"
                classes={{ root: classes.root }}
                spacing={2}
            >
                <Grid container item direction="row" justify="center" classes={{ root: classes.boardTitle }}>
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
