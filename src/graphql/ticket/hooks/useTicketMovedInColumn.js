import { useSubscription } from '@apollo/client'
import { cacheTicketMovedInColumn } from '../../../cacheService/cacheUpdates'
import { TICKET_MOVED_IN_COLUMN } from '../ticketQueries'

const useTicketMovedInColumn = (id) => {
    useSubscription(TICKET_MOVED_IN_COLUMN,
        {
            variables: { boardId: id },
            onSubscriptionData: ({ subscriptionData: { data } }) => {
                const { columnId, newOrder } = data.ticketMovedInColumn
                cacheTicketMovedInColumn(columnId, newOrder)
            },
        })
}

export default useTicketMovedInColumn
