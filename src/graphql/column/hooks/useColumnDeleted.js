import { useSubscription } from '@apollo/client'
import { COLUMN_DELETED } from '../columnQueries'
import { deleteColumnFromCache } from '../cacheService/cacheUpdates'

const useColumnDeleted = (id) => {
    useSubscription(COLUMN_DELETED,
        {
            variables: { boardId: id },
            onSubscriptionData: ({ subscriptionData: { data } }) => {
                const { columnId, boardId } = data.columnDeleted.removeInfo
                deleteColumnFromCache(columnId, boardId)
            }
        })
}
export default useColumnDeleted