import { useMutation } from '@apollo/client'
import { UNPRIORITIZE_TASK } from '../taskQueries'

const usePrioritizeTask = () => {
    const retVal = useMutation(UNPRIORITIZE_TASK)
    return retVal
}

export default usePrioritizeTask
