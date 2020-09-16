/* eslint-disable max-len */
import React from 'react'
import { Grid } from '@material-ui/core'
import {
    useMutation, useApolloClient, gql,
} from '@apollo/client'
import { DragDropContext } from 'react-beautiful-dnd'
import { BOARD_BY_ID } from '../graphql/board/boardQueries'
import { boardPageStyles } from '../styles/styles'
import ColumnList from './ColumnList'
import { CHANGE_TASKORDER_IN_COLUMN, CHANGE_TASKORDER_IN_TWO_COLUMNS } from '../graphql/mutations'
import { useBoardById } from '../graphql/board/hooks/useBoardById'
import '../styles.css'

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

            // Find from the cache the board
            const dataInCache = client.readQuery({ query: BOARD_BY_ID, variables: { boardId: board.id } })

            // Find from the cache the columns being manipulated
            const sourceColumnFromCache = dataInCache.boardById.columns.find((column) => column.id === sourceColumn.id)
            const destinationColumnFromCache = dataInCache.boardById.columns.find((column) => column.id === destinationColumn.id)

            // Find the task being moved using draggableId
            const taskBeingMoved = sourceColumnFromCache.tasks.find((task) => task.id === draggableId)

            // From the source column filter out the moved task using draggableId
            const updatedTasksOfSourceColumn = sourceColumnFromCache.tasks.filter((task) => task.id !== draggableId)
            // To the destination column add the moved task
            const updatedTasksOfDestinationColumn = destinationColumnFromCache.tasks.concat(taskBeingMoved)

            const sourceColumnId = `Column:${sourceColumn.id}`
            const destinationColumnId = `Column:${destinationColumn.id}`
            // update the manipulated columns in the cache
            client.writeFragment({
                id: sourceColumnId,
                fragment: gql`
                    fragment taskOrder on Column {
                        taskOrder
                        tasks
                    }
                `,
                data: {
                    taskOrder: newTaskOrderOfSourceColumn,
                    tasks: updatedTasksOfSourceColumn,
                },
            })

            client.writeFragment({
                id: destinationColumnId,
                fragment: gql`
                    fragment taskOrder on Column {
                        taskOrder
                        tasks
                    }
                `,
                data: {
                    taskOrder: newTaskOrderOfDestinationColumn,
                    tasks: updatedTasksOfDestinationColumn,
                },
            })

            await changeTaskOrdersInColumns({
                variables: {
                    taskId: draggableId,
                    sourceColumnId: sourceColumn.id,
                    destColumnId: destinationColumn.id,
                    sourceTaskOrder: newTaskOrderOfSourceColumn,
                    destTaskOrder: newTaskOrderOfDestinationColumn,
                },
            })
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
                        <ColumnList columns={columns} columnOrder={columnOrder} />
                    </Grid>
                </DragDropContext>
            </Grid>
        </div>
    )
}
export default Board
