/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { BOARD_BY_ID } from '../graphql/board/boardQueries'
import {
     TICKETORDER_AND_TICKETS, TICKETORDER, COLUMNORDER,
} from '../graphql/fragments'

export const onDragEnd = async (result, moveTicketInColumn, moveTicketFromColumn, moveColumn, client, columns, board, toggleSnackbar) => {
    const { destination, source, draggableId } = result
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

        toggleSnackbar('MOVED_COLUMN')
        return
    }

    // When task is moved within one column
    if (destination.droppableId === source.droppableId) {
        const column = columns.find((col) => col.id === source.droppableId)
        const newTicketOrder = Array.from(column.ticketOrder.map((obj) => ({ ticketId: obj.ticketId, type: obj.type })))

        const movedTicket = newTicketOrder.splice(source.index, 1)
        newTicketOrder.splice(destination.index, 0, movedTicket[0])

        const columnId = `Column:${column.id}`
        client.writeFragment({
            id: columnId,
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

        toggleSnackbar('MOVED_TASK_IN_COLUMN')
    }

    // When ticket is moved into another column
    if (destination.droppableId !== source.droppableId) {
        const sourceColumn = columns.find((col) => col.id === source.droppableId)
        const destinationColumn = columns.find((col) => col.id === destination.droppableId)
        const newTicketOrderOfSourceColumn = Array.from(sourceColumn.ticketOrder.map((obj) => ({ ticketId: obj.ticketId, type: obj.type })))
        const newTicketOrderOfDestinationColumn = Array.from(destinationColumn.ticketOrder.map((obj) => ({ ticketId: obj.ticketId, type: obj.type })))

        const [movedTicketOrderObject] = newTicketOrderOfSourceColumn.splice(source.index, 1)
        newTicketOrderOfDestinationColumn.splice(destination.index, 0, movedTicketOrderObject)

        // Find from the cache the board
        const dataInCache = client.readQuery({ query: BOARD_BY_ID, variables: { boardId: board.id } })

        // Find from the cache the columns being manipulated
        const sourceColumnFromCache = dataInCache.boardById.columns.find((column) => column.id === sourceColumn.id)
        const destinationColumnFromCache = dataInCache.boardById.columns.find((column) => column.id === destinationColumn.id)

        // Combine the tasks and the subtasks into single array
        const ticketsOfSourceColumn = sourceColumnFromCache.tasks.concat(sourceColumnFromCache.subtasks)
        const ticketsOfDestinationColumn = destinationColumnFromCache.tasks.concat(destinationColumnFromCache.subtasks)
        // Find the ticket being moved using draggableId
        const ticketBeingMoved = ticketsOfSourceColumn.find((ticket) => ticket.id === draggableId)

        // From the source column filter out the moved ticket using draggableId
        const updatedTicketsOfSourceColumn = ticketsOfSourceColumn.filter((ticket) => ticket.id !== draggableId)
        // To the destination column add the moved task
        //tällä ticketillä ei ole tässä kohtaa uutta columnId:tä ja se pitäii sille saada
        // uutta columnId:tä ei tarvitse renderöitiin siihen käytetään columnin subtask saraketta
        // sen vois päivittää vaikka mutaation update callbackissa vähän alempana
        const updatedTicketsOfDestinationColumn = ticketsOfDestinationColumn.concat(ticketBeingMoved)

        const updatedTasksOfSourceColumn = []
        const updatedTasksOfDestinationColumn = []
        const updatedSubtasksOfSourceColumn = []
        const updatedsubtasksOfDestinationColumn = []

        updatedTicketsOfSourceColumn.forEach((ticket) => {
            if (ticket.["__typename"] === 'Task') {
                updatedTasksOfSourceColumn.push(ticket)
            } else if (ticket["__typename"]  === 'Subtask') {
                updatedSubtasksOfSourceColumn.push(ticket)
            }
        })

        updatedTicketsOfDestinationColumn.forEach((ticket) => {
            if (ticket.["__typename"] === 'Task') {
                updatedTasksOfDestinationColumn.push(ticket)
            } else if (ticket.["__typename"] === 'Subtask') {
                updatedsubtasksOfDestinationColumn.push(ticket)
            }
        })

        const sourceColumnId = `Column:${sourceColumn.id}`
        const destinationColumnId = `Column:${destinationColumn.id}`
        // update the manipulated columns in the cache
        client.writeFragment({
            id: sourceColumnId,
            fragment: TICKETORDER_AND_TICKETS,
            data: {
                ticketOrder: newTicketOrderOfSourceColumn,
                tasks: updatedTasksOfSourceColumn,
                subtasks: updatedSubtasksOfSourceColumn,
            },
        })

        client.writeFragment({
            id: destinationColumnId,
            fragment: TICKETORDER_AND_TICKETS,
            data: {
                ticketOrder: newTicketOrderOfDestinationColumn,
                tasks: updatedTasksOfDestinationColumn,
                subtasks: updatedsubtasksOfDestinationColumn,
            },
        })

        await moveTicketFromColumn({
            variables: {
                type: movedTicketOrderObject.type,
                ticketId: draggableId,
                sourceColumnId: sourceColumn.id,
                destColumnId: destinationColumn.id,
                sourceTicketOrder: newTicketOrderOfSourceColumn,
                destTicketOrder: newTicketOrderOfDestinationColumn,
            },
        })

        toggleSnackbar('MOVED_TASK_FROM_COLUMN')
    }
}
