import { useSubscription } from '@apollo/client'
import { TASK_MUTATED } from '../taskQueries'

const useTaskMutated = (id) => {
    const retVal = useSubscription(TASK_MUTATED,
        { variables: { boardId: id } })
    return retVal
}

export default useTaskMutated
