import { useSubscription } from '@apollo/client'
import { SUBTASK_MUTATED } from '../subtaskQueries'

const useSubtaskMutated = (id) => {
    const retVal = useSubscription(SUBTASK_MUTATED,
        { variables: { boardId: id } })
    return retVal
}

export default useSubtaskMutated
