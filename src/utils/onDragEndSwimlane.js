/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { BOARD_BY_ID } from '../graphql/board/boardQueries'
import {
    TICKETORDER_AND_SUBTASKS, TICKETORDER, SUBTASKS_COLUMN, PRIORITIZED_AND_SWIMLANEORDERNUMBER,
} from '../graphql/fragments'

export const onDragEndSwimlane = async (result, moveTicketInColumn, moveTicketFromColumn, prioritizeTask, columns, client, tasksInOrder, boardId) => {
    const { destination, source, draggableId } = result
    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    if (result.type === 'swimlane') {
        const columnOfTheMovedTask = columns.find((column) => column.tasks.map((task) => task.id).includes(draggableId))
        const columnIdOfTheMovedTask = columnOfTheMovedTask.id

        const movedTask = tasksInOrder.find((task) => task.id === draggableId)
        const indexOfTaskBeforeDrag = tasksInOrder.findIndex((task) => task.id === draggableId)

        // Jos swimlanea liikutettu alaspäin ollaan kiinostuneita yläpuolella olevasta asiasta kun yritämme selvittää onko
        // taski siirretty 'columninsa ulkopuolelle'
        // If swimlane is moved downwards
        if (indexOfTaskBeforeDrag < destination.index) {
            // This is used for figuring out if the task was moved 'out of its column'
            const taskAbove = tasksInOrder[destination.index]
            // sitten verrataan taskAboven column id:tä liikutetun taskin column ideeseen
            // jos niin halutaan tehdä niin taskista halutaan tehdä priorisoitu ja sille annetaan myös swimlaneOrderNumber
            // Tämä tehdään myös aina jos iikuteltava taski on jo priorisoitu ennestään

            if (taskAbove.column.id !== movedTask.column.id || movedTask.prioritized) {
                // Figure out the affected prioritized tasks
                const affectedTasks = tasksInOrder.slice(source.index, source.index + (destination.index - source.index + 1))
                const affectedTasksWithoutTheMovedTask = affectedTasks.filter((taskObj) => taskObj.id !== draggableId)
                const affectedPrioritizedTasks = affectedTasksWithoutTheMovedTask.filter((taskObj) => taskObj.prioritized)
                const affectedPrioritizedTaskIds = affectedPrioritizedTasks.map((taskObj) => taskObj.id)

                // Decrease the swimlaneOrderNumbers of the affected prioritized tasks
                affectedPrioritizedTasks.map((task) => {
                    client.writeFragment({
                        id: `Task:${task.id}`,
                        fragment: PRIORITIZED_AND_SWIMLANEORDERNUMBER,
                        data: {
                            prioritized: true,
                            swimlaneOrderNumber: task.swimlaneOrderNumber - 1,
                        },
                    })
                })
                // Give the moved task the new swimlaneOrderNumber
                client.writeFragment({
                    id: `Task:${draggableId}`,
                    fragment: PRIORITIZED_AND_SWIMLANEORDERNUMBER,
                    data: {
                        prioritized: true,
                        swimlaneOrderNumber: destination.index,
                    },
                })
                // Send mutation to the server
                prioritizeTask({
                    variables: {
                        id: draggableId,
                        swimlaneOrderNumber: destination.index,
                        affectedPrioritizedTaskIds,
                        direction: 'downwards',
                    },
                })
            }

        // if swimlane is moved upwards
        } else {
            const taskBeneath = tasksInOrder[destination.index]
            // Situations where swimlaneOrderNumbers has to be updated
            // if swimlane is moved right above the swimlane with different columnId, the dragged task has to get the prioritized attribute
            // and all the other prioritized tasks beneath it has to get their swimlaneOrderNumbers incremented by one
            // also if task beneath is prioritized it means we have to prioritize the moved task as well and increment
            // the swimlaneOrderNumbers of tasks beneath it.
            // Also if the moved task is already prioritized it has to be able to be moved anywhere and hence all the swimlaneOrderNumbers
            // of the affected prioritized tasks beneath it has to get incremented swimlaneOrderNumbers
            if (taskBeneath.column.id !== movedTask.column.id || taskBeneath.prioritized || movedTask.prioritized) {
                // selvitä millä logiikalla swimlaneOrderNumbereita täytyy muuttaa
                // niiden priorisoitujen taskien, jotka sijoittuvat välille destination index ja source Index
                // Figure out the affected prioritized tasks
                const affectedTasks = tasksInOrder.slice(destination.index, destination.index + (source.index - destination.index + 1))
                const affectedTasksWithoutTheMovedTask = affectedTasks.filter((taskObj) => taskObj.id !== draggableId)
                const affectedPrioritizedTasks = affectedTasksWithoutTheMovedTask.filter((taskObj) => taskObj.prioritized)
                const affectedPrioritizedTaskIds = affectedPrioritizedTasks.map((taskObj) => taskObj.id)

                // Increase the swimlaneOrderNumbers of the affected prioritized tasks
                affectedPrioritizedTasks.map((task) => {
                    client.writeFragment({
                        id: `Task:${task.id}`,
                        fragment: PRIORITIZED_AND_SWIMLANEORDERNUMBER,
                        data: {
                            prioritized: true,
                            swimlaneOrderNumber: task.swimlaneOrderNumber + 1,
                        },
                    })
                })
                // Give the moved task the new swimlaneOrderNumber
                client.writeFragment({
                    id: `Task:${draggableId}`,
                    fragment: PRIORITIZED_AND_SWIMLANEORDERNUMBER,
                    data: {
                        prioritized: true,
                        swimlaneOrderNumber: destination.index,
                    },
                })
                // send mutation to the server
                prioritizeTask({
                    variables: {
                        id: draggableId,
                        swimlaneOrderNumber: destination.index,
                        affectedPrioritizedTaskIds,
                        direction: 'upwards',
                    },
                })
            }
        }

        // ticketOrderOfColumn = kopio kolumnin ticketOrder listasta, missä siirrettävä taski sijaitsee
        const ticketOrderOfColumn = Array.from(columnOfTheMovedTask.ticketOrder)
        const swimlaneOrder = Array.from(tasksInOrder)
        // uusi lista missä taskit mitkä jäävät siirretyn taskin alle sekä itse siirrettävä taski
        const swimlanesBeneathTheDestinationIndex = swimlaneOrder.slice(destination.index)

        // foundTask = ylimmän taskin ticketOrderObject newArr listassa mikä sijaitsee samassa kolumnissa kuin siirretty task
        const foundTask = swimlanesBeneathTheDestinationIndex.find((task) => ticketOrderOfColumn.find((obj) => task.id === obj.ticketId))

        // movedTaskIndex = siirrettävän taskin indexi kolumnin ticketOrder listassa ennen siirtoa
        const movedTaskIndex = ticketOrderOfColumn.findIndex((obj) => obj.ticketId === draggableId)
        let highestTaskInColumnIndex

        if (foundTask) {
            // highestTaskInColumnIndex = foundTaskin indexi kolumnin ticketOrder listassa ennen taskin siirtoa
            highestTaskInColumnIndex = ticketOrderOfColumn.findIndex((obj) => obj.ticketId === foundTask.id)
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

        // swimlaneOrderNumberit pitäis päivittää myös kaikille muille taskeille, siten, että alas päin liikuteltaessa
        client.writeFragment({
            id: columnId,
            fragment: TICKETORDER,
            data: {
                ticketOrder: finalTicketOrder,
            },
        })
        await moveTicketInColumn({
            variables: {
                orderArray: finalTicketOrder,
                columnId: columnIdOfTheMovedTask,
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
