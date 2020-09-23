import { useMutation } from '@apollo/client'
import { EDIT_TASK } from '../taskQueries'

const useEditTask = () => {
    const retVal = useMutation(EDIT_TASK)
    return retVal
}

export default useEditTask
