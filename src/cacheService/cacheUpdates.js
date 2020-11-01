/* eslint-disable import/prefer-default-export */
import { client } from '../apollo'
import { TICKETORDER_AND_TASKS, SWIMLANE_ORDER } from '../graphql/fragments'

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
