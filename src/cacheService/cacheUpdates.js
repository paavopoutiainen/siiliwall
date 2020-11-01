/* eslint-disable import/prefer-default-export */
import { client } from '../apollo'
import {
    TICKETORDER_AND_TASKS, SWIMLANE_ORDER, COLUMNORDER_AND_COLUMNS, TICKETORDER,
} from '../graphql/fragments'

export const addNewTask = (addedTask) => {
    // Update the column's tasks and ticketOrder lists
    const columnIdForCache = `Column:${addedTask.column.id}`
    const { ticketOrder, tasks } = client.readFragment({
        id: columnIdForCache,
        fragment: TICKETORDER_AND_TASKS,
    })
    const newTasks = tasks.concat(addedTask)
    const newTicketOrder = ticketOrder.concat({ ticketId: addedTask.id, type: 'task' })
    client.writeFragment({
        id: columnIdForCache,
        fragment: TICKETORDER_AND_TASKS,
        data: {
            ticketOrder: newTicketOrder,
            tasks: newTasks,
        },
    })
    // Update the board's swimlaneOrder
    const boardIdForCache = `Board:${addedTask.board.id}`
    const { swimlaneOrder } = client.readFragment({
        id: boardIdForCache,
        fragment: SWIMLANE_ORDER,
    })
    client.writeFragment({
        id: boardIdForCache,
        fragment: SWIMLANE_ORDER,
        data: {
            swimlaneOrder: swimlaneOrder.filter((id) => id !== addedTask.id),
        },
    })
}

export const removeTaskFromCache = (taskId, columnId, boardId) => {
    // Deleting task affects column's tasks list, column's ticketOrder list and board's swimlaneOrder list
    // In addition the normalized cache object is deleted itself
    const taskToBeDeleted = `Task:${taskId}`
    const columnIdForCache = `Column:${columnId}`
    const boardIdForCache = `Board:${boardId}`
    const data = client.readFragment({
        id: columnIdForCache,
        fragment: TICKETORDER,
    })

    const newTicketOrder = data.ticketOrder.filter((taskObj) => taskObj.ticketId !== taskId)
    client.writeFragment({
        id: columnIdForCache,
        fragment: TICKETORDER,
        data: {
            ticketOrder: newTicketOrder,
        },
    })
    // Delete related taskId from the board's swimlaneOrder list
    const { swimlaneOrder } = client.readFragment({
        id: `Board:${boardId}`,
        fragment: SWIMLANE_ORDER,
    })
    const newSwimlaneOrder = swimlaneOrder.filter((id) => id !== taskId)
    client.writeFragment({
        id: boardIdForCache,
        fragment: SWIMLANE_ORDER,
        data: {
            swimlaneOrder: newSwimlaneOrder,
        },
    })
    // Delete normalized object itself
    client.cache.evict({ id: taskToBeDeleted })
}
