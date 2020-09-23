import { useMutation } from '@apollo/client'
import { ADD_TASK } from '../taskQueries'
import { TASKORDER_AND_TASKS } from '../../fragments'

const useAddTask = (columnId) => {
    const retVal = useMutation(ADD_TASK, {
        update: async (cache, response) => {
            const columnIdForCache = `Column:${columnId}`
            const cached = cache.readFragment({
                id: columnIdForCache,
                fragment: TASKORDER_AND_TASKS,
            })
            const { tasks, taskOrder } = cached
            const newTasks = tasks.concat(response.data.addTaskForColumn)
            const newTaskOrder = taskOrder.concat(response.data.addTaskForColumn.id)
            cache.writeFragment({
                id: columnIdForCache,
                fragment: TASKORDER_AND_TASKS,
                data: {
                    taskOrder: newTaskOrder,
                    tasks: newTasks,
                },
            })
        },
    })
    return retVal
}

export default useAddTask
