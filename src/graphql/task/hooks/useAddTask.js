import { useMutation } from '@apollo/client'
import { ADD_TASK } from '../taskQueries'
import { TICKETORDER_AND_TASKS, SWIMLANE_ORDER } from '../../fragments'
import { addNewTask } from '../../../cacheService/cacheUpdates'

const useAddTask = () => {
    const retVal = useMutation(ADD_TASK, {
        update: async (cache, response) => {
            addNewTask(response.data.addTaskForColumn)
        },
    })
    return retVal
}
export default useAddTask
