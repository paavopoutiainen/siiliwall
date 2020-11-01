import { useSubscription } from '@apollo/client'
import { TASK_REMOVED } from '../taskQueries'

const useTaskRemoved = (id) => {
    const retVal = useSubscription(TASK_REMOVED,
        { variables: { boardId: id } })
    return retVal
}

export default useTaskRemoved
