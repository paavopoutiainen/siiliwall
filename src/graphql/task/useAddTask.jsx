import { useMutation } from '@apollo/client'
import { ADD_TASK } from './taskQueries'

const useAddTask = () => {
    const retVal = useMutation(ADD_TASK, {
        //refetchQueries: [{ query: //boardbyid?
        //}],
    })
    return retVal
}

export default useAddTask
