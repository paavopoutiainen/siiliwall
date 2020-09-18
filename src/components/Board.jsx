/* eslint-disable max-len */
import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import {
    useQuery, useMutation, useApolloClient,
} from '@apollo/client'
import { DragDropContext } from 'react-beautiful-dnd'
import { GET_BOARD_BY_ID } from '../graphql/queries'
import { TASKORDER_AND_TASKS, TASKORDER, COLUMNORDER_AND_COLUMNS } from '../graphql/fragments'
import { boardPageStyles } from '../styles/styles'
import ColumnList from './ColumnList'
import { CHANGE_TASKORDER_IN_COLUMN, CHANGE_TASKORDER_IN_TWO_COLUMNS, ADD_COLUMN } from '../graphql/mutations'
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
    const [changeTaskOrdersInColumns] = useMutation(CHANGE_TASKORDER_IN_TWO_COLUMNS)
    const client = useApolloClient()
    const classes = boardPageStyles()
    const [columnName, setColumnName] = useState('')
    const [addColumn] = useMutation(ADD_COLUMN, {
        update: async (cache, response) => {
            const cached = cache.readQuery({ query: GET_BOARD_BY_ID, variables: { boardId: id } })
            const { columns, columnOrder } = cached.boardById
            const newColumns = columns.concat(response.data.addColumnForBoard)
            const newColumnOrder = columnOrder.concat(response.data.addColumnForBoard.id)

            client.writeFragment({
                id: `Board:${id}`,
                fragment: COLUMNORDER_AND_COLUMNS,
                data: {
                    columnOrder: newColumnOrder,
                    columns: newColumns,
                },
            })
        },
    })

    const handleChange = (event) => {
        setColumnName(event.target.value)
    }

    const handleSave = () => {
        addColumn({
            variables: {
                boardId: id,
                columnName,
            },
        })
        setColumnName('')
    }

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
                fragment: TASKORDER,
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
            const dataInCache = client.readQuery({ query: GET_BOARD_BY_ID, variables: { boardId: board.id } })

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
                fragment: TASKORDER_AND_TASKS,
                data: {
                    taskOrder: newTaskOrderOfSourceColumn,
                    tasks: updatedTasksOfSourceColumn,
                },
            })

            client.writeFragment({
                id: destinationColumnId,
                fragment: TASKORDER_AND_TASKS,
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
                        <ColumnList columns={columns} columnOrder={columnOrderArray} />
                        <Grid item>
                            <TextField
                                margin="dense"
                                name="title"
                                label="Name"
                                type="text"
                                value={columnName}
                                fullWidth
                                onChange={handleChange}
                            />
                            <Button
                                color="primary"
                                onClick={handleSave}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </DragDropContext>
            </Grid>
        </div>
    )
}
export default Board