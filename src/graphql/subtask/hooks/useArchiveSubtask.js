import { useMutation } from '@apollo/client'
import { ARCHIVE_SUBTASK } from '../subtaskQueries'

const useArchiveSubtask = () => {
    const retVal = useMutation(ARCHIVE_SUBTASK)
    return retVal
}

export default useArchiveSubtask
