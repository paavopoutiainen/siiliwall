import { useMutation, useQuery } from '@apollo/client'
import { ADD_TASK } from '../taskQueries'
import { TICKETORDER_AND_TASKS } from '../../fragments'

const useAddTask = (columnId) => {
    const retVal = useMutation(ADD_TASK, {
        update: async (cache, response) => {
            const columnIdForCache = `Column:${columnId}`
            const cached = cache.readFragment({
                id: columnIdForCache,
                fragment: TICKETORDER_AND_TASKS,
            })
            console.log('cached', cached)
            const { tasks, ticketOrder } = cached
            const newTasks = tasks.concat(response.data.addTaskForColumn)
            const newTicketObject = {
                ticketId: response.data.addTaskForColumn.id,
                type: "task"
            }
            const newTicketOrder = ticketOrder.concat(newTicketObject)
            console.log('newTicketOrder', newTicketOrder)
            cache.writeFragment({
                id: columnIdForCache,
                fragment: TICKETORDER_AND_TASKS,
                data: {
                    ticketOrder: newTicketOrder,
                    tasks: newTasks
                },
            })
            console.log(cache)

        },
    })
    return retVal
}
export default useAddTask