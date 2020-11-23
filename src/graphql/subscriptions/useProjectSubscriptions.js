import { useSubscription } from '@apollo/client'
import { BOARD_ADDED } from '../board/boardQueries'
import { addNewBoard } from '../../cacheService/cacheUpdates'

const useProjectSubscriptions = (id, eventId) => {
    useSubscription(BOARD_ADDED,
        {
            variables: { projectId: id, eventId },
            onSubscriptionData: ({ subscriptionData: { data } }) => {
                if (data.boardAdded.mutationType === 'CREATED') {
                    addNewBoard(data.boardAdded.board, id)
                }
            },
        })
}
export default useProjectSubscriptions
