/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { BOARD_BY_ID } from '../graphql/board/boardQueries'
import {
    TICKETORDER_AND_SUBTASKS, TICKETORDER, SUBTASKS_COLUMN
} from '../graphql/fragments'

export const onDragEndSwimlane = async (result, moveTicketInColumn, moveTicketFromColumn, columns, client, tasksInSwimlaneOrder, boardId) => {

    const { destination, source, draggableId } = result
    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    if (result.type === 'swimlane') {
        const columnMovedIn = columns.find((column) => column.tasks.map((task) => task.id).includes(draggableId))
        const columnIdOfTheMovedTask = columnMovedIn.id
        const columnObjectById = columns.find((column) => column.id === columnIdOfTheMovedTask)
        // ticketOrderOfColumn = kopio kolumnin ticketOrder listasta, missä siirrettävä taski sijaitsee
        const ticketOrderOfColumn = Array.from(columnObjectById.ticketOrder)
        const newSwimlaneOrder = Array.from(tasksInSwimlaneOrder.map((obj) => ({ ticketId: obj.ticketId, type: obj.type })))

        // newArr = uusi lista missä taskit mitkä jäävät siirretyn taskin alle sekä itse siirrettävä taski
        const newArr = newSwimlaneOrder.slice(destination.index)
        // foundTask = ylimmän taskin ticketOrderObject newArr listassa mikä sijaitsee samassa kolumnissa kuin siirretty task
        const foundTask = newArr.find((obj) => {
            const test = ticketOrderOfColumn.find((colOrderObj) => obj.ticketId === colOrderObj.ticketId)
            return test
        })
        // movedTaskIndex = siirrettävän taskin indexi kolumnin ticketOrder listassa ennen siirtoa
        const movedTaskIndex = ticketOrderOfColumn.findIndex((obj) => obj.ticketId === draggableId)
        let highestTaskInColumnIndex

        if (foundTask) {
            // highestTaskInColumnIndex = foundTaskin indexi kolumnin ticketOrder listassa ennen taskin siirtoa
            highestTaskInColumnIndex = ticketOrderOfColumn.findIndex((obj) => obj.ticketId === foundTask.ticketId)

        } else {
            /* jos siirrettävän taskin alapuolelle ei jää mitään taskeja jotka ovat samassa kolumnissa laitetaan siirrettyä
            taskia vastaava ticketOrderObject kyseisen kolumnin ticketOrder listan alimmaiseksi */
            highestTaskInColumnIndex = ticketOrderOfColumn.length - 1
        }

        // ticketOrderOfColumnista poistetaan siirrettyä taskia vastaava ticketOrderObject ja laitetaan se uuteen indexiin
        const [movedTaskOrderObject] = ticketOrderOfColumn.splice(movedTaskIndex, 1)
        ticketOrderOfColumn.splice(highestTaskInColumnIndex, 0, movedTaskOrderObject)

        /* finalTicketOrder = lopuksi poistetaan ticketOrderOfColumn listasta kaikista olioista __typename attribuutti, jotta se voidaan ylipäätään 
           lähettää graphql mutaatioon oikeassa muodossa */
        const finalTicketOrder = ticketOrderOfColumn.map((obj) => ({ ticketId: obj.ticketId, type: obj.type }))
        const columnId = `Column:${columnIdOfTheMovedTask}`

        client.writeFragment({
            id: columnId,
            fragment: TICKETORDER,
            data: {
                ticketOrder: finalTicketOrder
            }
        })
        await moveTicketInColumn({
            variables: {
                orderArray: finalTicketOrder,
                columnId: columnIdOfTheMovedTask
            }
        })
        return
    }

    // For swimlaneColumn droppables the id is constructed of both columnId
    // and taskId in order to avoid duplicates, here we take the columnId part
    const sourceColumnId = source.droppableId.substring(0, 36)
    const destinationColumnId = destination.droppableId.substring(0, 36)
    // Task parts of droppable ids are needed for checking if subtask is tried to be moved to another swimlane
    const sourceTaskId = source.droppableId.substring(36, 72)
    const destinationTaskId = destination.droppableId.substring(36, 72)

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

        // Check if destination column contains the parent task of the moved subtask and is empty of sibling subtasks
        // If so, change the destination index, so that the subtask will be situated under its parent task
        if (destinationColumn.tasks.map((task) => task.id).includes(movedSubtask.task.id) && !destinationColumn.subtasks.some((subtask) => subtask.task.id === movedSubtask.task.id)) {
            destinationIndex = destinationColumnFromCache.ticketOrder.findIndex((obj) => obj.ticketId === movedSubtask.task.id) + 1
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