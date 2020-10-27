/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { BOARD_BY_ID } from '../graphql/board/boardQueries'
import {
    TICKETORDER_AND_SUBTASKS, TICKETORDER, SUBTASKS_COLUMN, SWIMLANE_ORDER_NUMBER, SWIMLANE_ORDER,
} from '../graphql/fragments'

export const onDragEndSwimlane = async (result, moveTicketInColumn, moveTicketFromColumn, moveSwimlane, columns, client, tasksInOrder, boardId) => {
    const { destination, source, draggableId } = result
    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    /*
    WHEN SWIMLANE IS MOVED
    */
    if (result.type === 'swimlane') {
        const movedTask = tasksInOrder.find((task) => task.id === draggableId)
        const indexOfTaskBeforeDrag = tasksInOrder.findIndex((task) => task.id === draggableId)

        let affectedTasks
        let newSwimlaneOrderObjects
        // First figure out the tasks that were affected by the drag and drop, the swimlaneOrderNumbers are affected
        // differently whether task was moved upwards or downwards
        // IF SWIMLANE WAS MOVED UPWARDS
        if (indexOfTaskBeforeDrag > destination.index) {
            // Find out the tasks the drag and drop affected
            affectedTasks = tasksInOrder.slice(destination.index, destination.index + (source.index - destination.index + 1))
            const affectedTasksWithoutTheMovedTask = affectedTasks.filter((taskObj) => taskObj.id !== draggableId)

            // Increase the swimlaneOrderNumbers of the affected tasks by one
            const newSwimlaneOrderObjectsWithoutMovedTask = affectedTasksWithoutTheMovedTask
                .map((task) => ({ id: task.id, swimlaneOrderNumber: task.swimlaneOrderNumber + 1 }))

            // Change the swimlaneOrderNumber of the moved task to be the index which it was dropped into
            newSwimlaneOrderObjects = newSwimlaneOrderObjectsWithoutMovedTask.concat({ id: movedTask.id, swimlaneOrderNumber: destination.index })

        // IF SWIMLANE IS MOVED DOWNWARDS
        } else {
            // Find out the tasks the drag and drop affected
            affectedTasks = tasksInOrder.slice(source.index, source.index + (destination.index - source.index + 1))
            const affectedTasksWithoutTheMovedTask = affectedTasks.filter((taskObj) => taskObj.id !== draggableId)

            // Decrease the swimlaneOrderNumbers of the affected tasks by one
            const newSwimlaneOrderObjectsWithoutMovedTask = affectedTasksWithoutTheMovedTask
                .map((task) => ({ id: task.id, swimlaneOrderNumber: task.swimlaneOrderNumber - 1 }))

            // Change the swimlaneOrderNumber of the moved task to be the index which it was dropped into
            newSwimlaneOrderObjects = newSwimlaneOrderObjectsWithoutMovedTask.concat({ id: movedTask.id, swimlaneOrderNumber: destination.index })
        }

        // Update the board's swimlaneOrder in the cache
        const { swimlaneOrder } = client.readFragment({
            id: `Board:${boardId}`,
            fragment: SWIMLANE_ORDER,
        })
        const newSwimlaneOrder = Array.from(swimlaneOrder)

        const [movedId] = newSwimlaneOrder.splice(indexOfTaskBeforeDrag, 1)
        newSwimlaneOrder.splice(destination.index, 0, movedId)

        client.writeFragment({
            id: `Board:${boardId}`,
            fragment: SWIMLANE_ORDER,
            data: {
                swimlaneOrder: newSwimlaneOrder,
            },
        })

        // Update the swimlaneOrderNumbers of the affected tasks to the cache
        newSwimlaneOrderObjects.map((task) => {
            client.writeFragment({
                id: `Task:${task.id}`,
                fragment: SWIMLANE_ORDER_NUMBER,
                data: {
                    swimlaneOrderNumber: task.swimlaneOrderNumber,
                },
            })
        })

        // Send mutation to the server for updating the database
        moveSwimlane({
            variables: {
                boardId,
                newSwimlaneOrder: newSwimlaneOrderObjects,
            },
        })

        return
    }

    /*
        WHEN SUBTASK IS MOVED
    */
    // For swimlaneColumn droppables the id is constructed of both columnId
    // and taskId in order to avoid duplicates, here we take the columnId part
    const sourceColumnId = source.droppableId.substring(0, 36)
    const destinationColumnId = destination.droppableId.substring(0, 36)
    // Task parts of droppable ids are needed for checking if subtask is tried to be moved to another swimlane
    const sourceTaskId = source.droppableId.substring(36, 72)
    const destinationTaskId = destination.droppableId.substring(36, 72)

    // When subtask is tried to be moved outside its parent swimlane
    if (sourceTaskId !== destinationTaskId) return

    // When ticket is moved within one column
    if (destination.droppableId === source.droppableId) {
        const column = columns.find((col) => col.id === sourceColumnId)
        // We want to modify column's ticketOrder attribute in the cache
        const newTicketOrder = Array.from(column.ticketOrder.map((obj) => ({ ticketId: obj.ticketId, type: obj.type })))
        const [movedTicketOrderObject] = newTicketOrder.splice(source.index, 1)
        newTicketOrder.splice(destination.index, 0, movedTicketOrderObject)

        const columnIdForCache = `Column:${column.id}`
        client.writeFragment({
            id: columnIdForCache,
            fragment: TICKETORDER,
            data: {
                ticketOrder: newTicketOrder,
            },
        })

        await moveTicketInColumn({
            variables: {
                orderArray: newTicketOrder,
                columnId: column.id,
            },
        })
        return
    }

    // When ticket is moved into another swimlaneColumn
    if (destination.droppableId !== source.droppableId) {
        const sourceColumn = columns.find((col) => col.id === sourceColumnId)
        const destinationColumn = columns.find((col) => col.id === destinationColumnId)
        const newTicketOrderOfSourceColumn = Array.from(sourceColumn.ticketOrder.map((obj) => ({ ticketId: obj.ticketId, type: obj.type })))
        const newTicketOrderOfDestinationColumn = Array.from(destinationColumn.ticketOrder.map((obj) => ({ ticketId: obj.ticketId, type: obj.type })))
        let destinationIndex = destination.index

        // Find from the cache the board
        const dataInCache = client.readQuery({ query: BOARD_BY_ID, variables: { boardId } })

        // Find from the cache the columns being manipulated
        const sourceColumnFromCache = dataInCache.boardById.columns.find((column) => column.id === sourceColumn.id)
        const destinationColumnFromCache = dataInCache.boardById.columns.find((column) => column.id === destinationColumn.id)

        // Find the subtasks of source and destination columns and update them
        const updatedSubtasksOfSourceColumn = Array.from(sourceColumnFromCache.subtasks)
        const updatedSubtasksOfDestinationColumn = Array.from(destinationColumnFromCache.subtasks)

        const indexOfMovedSubtask = updatedSubtasksOfSourceColumn.findIndex((subtask) => subtask.id === draggableId)

        const [movedSubtask] = updatedSubtasksOfSourceColumn.splice(indexOfMovedSubtask, 1)
        updatedSubtasksOfDestinationColumn.splice(destination.index, 0, movedSubtask)

        const containsParentTask = destinationColumn.tasks.map((task) => task.id).includes(movedSubtask.task.id)
        const hasSubtasks = destinationColumn.subtasks.some((subtask) => subtask.task.id === movedSubtask.task.id)
        // Check if destination column contains the parent task of the moved subtask and is empty of sibling subtasks
        // If so, change the destination index, so that the subtask will be situated under its parent task
        if (containsParentTask && !hasSubtasks) {
            destinationIndex = destinationColumnFromCache.ticketOrder.findIndex((obj) => obj.ticketId === movedSubtask.task.id) + 1
        }

        // Check if destination column doesn't contain sibling subtasks or parent task
        // If so, change the destination index to be the biggest in the column so that the subtask will be situated at the bottom
        if (!containsParentTask && !hasSubtasks) {
            destinationIndex = destinationColumnFromCache.ticketOrder.length
        }

        const [movedTicketOrderObject] = newTicketOrderOfSourceColumn.splice(source.index, 1)
        newTicketOrderOfDestinationColumn.splice(destinationIndex, 0, movedTicketOrderObject)

        const sourceColumnIdForCache = `Column:${sourceColumnId}`
        const destinationColumnIdForCache = `Column:${destinationColumnId}`

        // Column attribute of the moved subtask has to be updated to the
        // cache in order to avoid lagging when subtask is moved
        const newColumnForMovedSubtask = { id: destinationColumnFromCache.id, __typename: 'Column' }

        client.writeFragment({
            id: `Subtask:${draggableId}`,
            fragment: SUBTASKS_COLUMN,
            data: {
                column: newColumnForMovedSubtask,
            },
        })

        client.writeFragment({
            id: sourceColumnIdForCache,
            fragment: TICKETORDER_AND_SUBTASKS,
            data: {
                ticketOrder: newTicketOrderOfSourceColumn,
                subtasks: updatedSubtasksOfSourceColumn,
            },
        })

        client.writeFragment({
            id: destinationColumnIdForCache,
            fragment: TICKETORDER_AND_SUBTASKS,
            data: {
                ticketOrder: newTicketOrderOfDestinationColumn,
                subtasks: updatedSubtasksOfDestinationColumn,
            },
        })

        await moveTicketFromColumn({
            variables: {
                type: movedTicketOrderObject.type,
                ticketId: draggableId,
                sourceColumnId,
                destColumnId: destinationColumnId,
                sourceTicketOrder: newTicketOrderOfSourceColumn,
                destTicketOrder: newTicketOrderOfDestinationColumn,
            },
        })
    }
}
