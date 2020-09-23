import { useMutation } from '@apollo/client'
import { EDIT_TASK } from '../taskQueries'

const useEditTask = (id, title, owner, size) => {
    const retVal = useMutation(EDIT_TASK, {
        id, title, owner, size,
    })
    return retVal
}

export default useEditTask
