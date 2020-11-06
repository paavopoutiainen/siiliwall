import { useMutation } from '@apollo/client'
import { ARCHIVE_TASK } from '../taskQueries'
import { removeTaskFromCache } from '../../../cacheService/cacheUpdates'

const useArchiveTask = () => {
    const retVal = useMutation(ARCHIVE_TASK, {
        update: async (cache, response) => {
            const { id, columnId, boardId } = response.data.archiveTaskById
            removeTaskFromCache(id, columnId, boardId)
        },
    })
    return retVal
}
export default useArchiveTask
