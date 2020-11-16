import { useMutation } from '@apollo/client'
import { ARCHIVE_SUBTASK } from '../subtaskQueries'
import { TICKETORDER_AND_SUBTASKS } from '../../fragments'
import { removeSubtaskFromCache } from '../../../cacheService/cacheUpdates'

const useArchiveSubtask = () => {
    const retVal = useMutation(ARCHIVE_SUBTASK)
    return retVal
}

export default useArchiveSubtask
