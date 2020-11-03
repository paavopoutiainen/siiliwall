import { useSubscription } from '@apollo/client'
import { addNewSubtask } from '../../../cacheService/cacheUpdates'
import { SUBTASK_MUTATED } from '../subtaskQueries'

const useSubtaskMutated = (id) => {
    const retVal = useSubscription(SUBTASK_MUTATED,
        {
            variables: { boardId: id },
            onSubscriptionData: ({ subscriptionData: { data } }) => {
                if (data.subtaskMutated.mutationType === 'CREATED') {
                    addNewSubtask(data.subtaskMutated.subtask)
                }
            },
        })
    return retVal
}

export default useSubtaskMutated
