import { useMutation } from '@apollo/client'
import { PRIORITIZE_TASK } from '../taskQueries'

const usePrioritizeTask = () => {
    const retVal = useMutation(PRIORITIZE_TASK)
    return retVal
}

export default usePrioritizeTask
