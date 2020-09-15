import React from 'react'
import { Grid } from '@material-ui/core'
import {
    useQuery, useMutation, useApolloClient, gql,
} from '@apollo/client'
import { DragDropContext } from 'react-beautiful-dnd'
import { GET_BOARD_BY_ID } from '../graphql/queries'
import { boardPageStyles } from '../styles/styles'
import ColumnList from './ColumnList'
import { CHANGE_TASKORDER_IN_COLUMN } from '../graphql/mutations'
import '../styles.css'

const Board = ({ id }) => {
    const {
        loading, error, data,
    } = useQuery(GET_BOARD_BY_ID, {
        variables: {
            boardId: id,
        },
    })

    const [changeTaskOrderInColumn] = useMutation(CHANGE_TASKORDER_IN_COLUMN)
    const client = useApolloClient()
    const classes = boardPageStyles()

    if (loading) return <h1>Loading board..</h1>
    if (error) return `Error: ${error.message}`

    const board = data.boardById

    const columnOrderArray = board.columnOrder
    const { columns } = board

    // TODO, move this function into utils folder
    const onDragEnd = async (result) => {
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

            const columnId = `Column:${column.id}`
            client.writeFragment({
                id: columnId,
                fragment: gql`
                    fragment taskOrder on Column {
                        taskOrder
                    }
                `,
                data: {
                    taskOrder: newTaskOrder,
                },
            })

            await changeTaskOrderInColumn({
                variables: {
                    orderArray: newTaskOrder,
                    columnId: column.id,
                },
            })
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
