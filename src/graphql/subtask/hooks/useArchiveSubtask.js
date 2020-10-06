import { useMutation } from '@apollo/client'
import { ARCHIVE_SUBTASK } from '../subtaskQueries'
import { TICKETORDER_AND_SUBTASKS } from '../../fragments'

const useArchiveSubtask = (columnId) => {
    const retVal = useMutation(ARCHIVE_SUBTASK, {
        update: async (cache, response) => {
            // fetch certain column from the cache
            const columnIdForCache = `Column:${columnId}`
            const cached = cache.readFragment({
                id: columnIdForCache,
                fragment: TICKETORDER_AND_SUBTASKS,
            })

            // update column's ticketOrder and subtasks
            const { ticketOrder, subtasks } = cached
            const subtaskIdToBeRemoved = response.data.archiveSubtaskById
            const newSubtasks = subtasks.filter((subtask) => subtask.id !== subtaskIdToBeRemoved)
            const newTicketOrder = ticketOrder.filter((obj) => obj.ticketId !== subtaskIdToBeRemoved)

            cache.writeFragment({
                id: columnIdForCache,
                fragment: TICKETORDER_AND_SUBTASKS,
                data: {
                    ticketOrder: newTicketOrder,
                    subtasks: newSubtasks,
                },
            })
            // finally remove the normalized subtask entity
            const subtaskIdForCache = `Subtask:${subtaskIdToBeRemoved}`
            cache.evict({
                id: subtaskIdForCache,
            })
        },
    })
    return retVal
}

export default useArchiveSubtask
