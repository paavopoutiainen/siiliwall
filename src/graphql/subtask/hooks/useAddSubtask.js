import { useMutation } from '@apollo/client'
import { ADD_SUBTASK } from '../subtaskQueries'
import { TICKETORDER_AND_SUBTASKS } from '../../fragments'

const useAddSubtask = (columnId) => {
    const retVal = useMutation(ADD_SUBTASK, {
        update: async (cache, response) => {
            const columnIdForCache = `Column:${columnId}`
            const cached = cache.readFragment({
                id: columnIdForCache,
                fragment: TICKETORDER_AND_SUBTASKS
            })
            const { subtasks, ticketOrder } = cached
            const newSubtasks = subtasks.concat(response.data.addSubtaskForTask)
            const newTicketObject = {
                ticketId: response.data.addSubtaskForTask.id,
                type: "subtask"
            }
            const newTicketOrder = ticketOrder.concat(newTicketObject)

            cache.writeFragment({
                id: columnIdForCache,
                fragment: TICKETORDER_AND_SUBTASKS,
                data: {
                    ticketOrder: newTicketOrder,
                    subtasks: newSubtasks
                }
            })
        }
    })
    return retVal
}
export default useAddSubtask