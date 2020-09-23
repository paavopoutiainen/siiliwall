import { useMutation } from '@apollo/client'
import { EDIT_TASK } from '../taskQueries'

const useEditTask = (id, title, owner, size, content) => {
    const retVal = useMutation(EDIT_TASK, {
        id, title, owner, size, content,
    })
    return retVal
}

export default useEditTask
