/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { BOARD_BY_ID } from '../graphql/board/boardQueries'
import { TASKORDER_AND_TASKS, TASKORDER, COLUMNORDER } from '../graphql/fragments'

export const onDragEnd = async (result, moveTaskInColumn, moveTaskFromColumn, moveColumn, client, columns, board) => {
    const { destination, source, draggableId } = result

    console.log(result)

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // When user is moving column
    if (result.type === 'column') {
        const newColumnOrder = Array.from(board.columnOrder)
        newColumnOrder.splice(source.index, 1)
        newColumnOrder.splice(destination.index, 0, draggableId)

        const boardId = `Board:${board.id}`
        client.writeFragment({
            id: boardId,
            fragment: COLUMNORDER,
            data: {
                columnOrder: newColumnOrder,
            },
        })

        await moveColumn({
            variables: {
                orderArray: newColumnOrder,
                boardId: board.id,
            },
        })
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

        await moveTaskInColumn({
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

        await moveTaskFromColumn({
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
