/* eslint-disable import/prefer-default-export */
import { useMutation } from '@apollo/client'
import { ADD_TASK } from './taskQueries'

export const useAddTask = () => {
    // todo: needs to refetch board too
    const retVal = useMutation(ADD_TASK)
    return retVal
}

// export default useAddTask
