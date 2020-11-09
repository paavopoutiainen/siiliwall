import { useMutation } from '@apollo/client'
import { ARCHIVE_TASK } from '../taskQueries'

const useArchiveTask = () => {
    const retVal = useMutation(ARCHIVE_TASK)
    return retVal
}
export default useArchiveTask
