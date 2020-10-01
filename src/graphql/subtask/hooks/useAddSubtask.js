import { useMutation } from '@apollo/client'
import { ADD_SUBTASK } from '../subtaskQueries'
import { SUBTASKORDER_AND_SUBTASKS } from '../../fragments'

const useAddSubtask = (columnId) => {
    const retVal = useMutation(ADD_SUBTASK, {
        update: async (cache, response) => {
            const columnIdForCache = `Column:${columnId}`
            const cached = cache.readFragment({
                id: columnIdForCache,
                fragment: SUBTASKORDER_AND_SUBTASKS
            })
            const { subtasks, subtaskOrder } = cached
            const newSubtasks = subtasks.concat(response.data.addSubtaskForTask)
            const newSubtaskOrder = subtaskOrder.concat(response.data.addSubtaskForTask.id)
            cache.writeFragment({
                id: columnIdForCache,
                fragment: SUBTASKORDER_AND_SUBTASKS,
                data: {
                    subtaskOrder: newSubtaskOrder,
                    subtasks: newSubtasks
                }
            })
        }
    })
    return retVal
}
export default useAddSubtask