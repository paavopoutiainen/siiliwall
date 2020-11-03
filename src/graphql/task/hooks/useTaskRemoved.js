import { useSubscription } from '@apollo/client'
import { removeTaskFromCache } from '../../../cacheService/cacheUpdates'
import { TASK_REMOVED } from '../taskQueries'

const useTaskRemoved = (id) => {
    useSubscription(TASK_REMOVED,
        {
            variables: { boardId: id },
            onSubscriptionData: ({ subscriptionData: { data } }) => {
                const { taskId, columnId, boardId } = data.taskRemoved.removeInfo
                // At some point these cases will probably be handled differently
                if (data.taskRemoved.removeType === 'DELETED') {
                    removeTaskFromCache(taskId, columnId, boardId)
                } else if (data.taskRemoved.removeType === 'ARCHIVED') {
                    removeTaskFromCache(taskId, columnId, boardId)
                }
            },
        })
}

export default useTaskRemoved
