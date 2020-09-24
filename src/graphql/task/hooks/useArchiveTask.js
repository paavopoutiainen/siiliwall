import { useMutation } from '@apollo/client'
import { ARCHIVE_TASK } from '../taskQueries'
import { TASKORDER_AND_TASKS } from '../../fragments'

const useArchiveTask = (columnId) => {
    const retVal = useMutation(ARCHIVE_TASK, {
        update: async (cache, response) => {
            const columnIdForCache = `Column:${columnId}`
            const cached = cache.readFragment({
                id: columnIdForCache,
                fragment: TASKORDER_AND_TASKS
            })
            const { tasks, taskOrder } = cached
            const taskIdToBeRemoved = response.data.archiveTaskById
            const newTasks = tasks.filter((task) => task.id !== taskIdToBeRemoved)
            const newTaskOrder = taskOrder.filter((id) => id !== taskIdToBeRemoved)

            cache.writeFragment({
                id: columnIdForCache,
                fragment: TASKORDER_AND_TASKS,
                data: {
                    taskOrder: newTaskOrder,
                    tasks: newTasks
                }
            })
        }
    })
    return retVal
}
export default useArchiveTask