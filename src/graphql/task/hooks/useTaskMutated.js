import { useSubscription } from '@apollo/client'
import { addNewTask } from '../../../cacheService/cacheUpdates'
import { TASK_MUTATED } from '../taskQueries'

const useTaskMutated = (id) => {
    useSubscription(TASK_MUTATED,
        {
            variables: { boardId: id },
            onSubscriptionData: ({ subscriptionData: { data } }) => {
                // At some point different kind of actions will be taken according to the mutationType
                // For example notifying the user that something got updated when mutationType is "UPDATED"
                // At the moment the values of the UPDATE subscription response are automatically
                // updated to the cache to the correct task entity
                if (data.taskMutated.mutationType === 'CREATED') {
                    addNewTask(data.taskMutated.node)
                }
            },
        })
}

export default useTaskMutated
