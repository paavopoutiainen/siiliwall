import { useMutation } from '@apollo/client'
import { ADD_TASK } from '../taskQueries'
import { addNewTask } from '../../../cacheService/cacheUpdates'

const useAddTask = () => {
    const retVal = useMutation(ADD_TASK, {
        // letting the subscription take care of the adding of the task to the cache of the client who mutated as well, for now
        /* update: async (cache, response) => {
            addNewTask(response.data.addTaskForColumn)
        }, */
    })
    return retVal
}
export default useAddTask
