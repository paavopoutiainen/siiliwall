import { SUBTASK_REMOVED } from '../../../graphql/subtask/subtaskQueries'
import { useSubscription } from '@apollo/client'
import { removeSubtaskFromCache } from '../../../cacheService/cacheUpdates'

const useSubtaskRemoved = (id) => {
    useSubscription(SUBTASK_REMOVED,
        {
            variables: { boardId: id },
            onSubscriptionData: ({ subscriptionData: { data } }) => {
                const { subtaskId, columnId } = data.subtaskRemoved.removeInfo
                if (data.subtaskRemoved === 'DELETED') {
                    removeSubtaskFromCache(subtaskId, columnId)
                }
            }
        })
}
export default useSubtaskRemoved