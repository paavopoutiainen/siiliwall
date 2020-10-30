import { useMutation } from '@apollo/client'
import { ADD_TASK } from '../taskQueries'
import { TICKETORDER_AND_TASKS, SWIMLANE_ORDER } from '../../fragments'

const useAddTask = (columnId) => {
    const retVal = useMutation(ADD_TASK, {
        update: async (cache, response) => {
            const columnIdForCache = `Column:${columnId}`
            const cached = cache.readFragment({
                id: columnIdForCache,
                fragment: TICKETORDER_AND_TASKS,
            })

            const { tasks, ticketOrder } = cached
            const newTasks = tasks.concat(response.data.addTaskForColumn)
            const newTicketObject = {
                ticketId: response.data.addTaskForColumn.id,
                type: 'task',
            }
            const newTicketOrder = ticketOrder.concat(newTicketObject)
            cache.writeFragment({
                id: columnIdForCache,
                fragment: TICKETORDER_AND_TASKS,
                data: {
                    ticketOrder: newTicketOrder,
                    tasks: newTasks,
                },
            })
            // update the normalized board object's swimlaneOrder field
            const boardIdForCache = `Board:${response.data.addTaskForColumn.board.id}`
            const { swimlaneOrder } = cache.readFragment({
                id: boardIdForCache,
                fragment: SWIMLANE_ORDER,
            })
            const newSwimlaneOrder = swimlaneOrder.concat(response.data.addTaskForColumn.id)
            cache.writeFragment({
                id: boardIdForCache,
                fragment: SWIMLANE_ORDER,
                data: {
                    swimlaneOrder: newSwimlaneOrder,
                },
            })
        },
    })
    return retVal
}
export default useAddTask
