import { useMutation } from '@apollo/client'
import { MOVE_TASK_FROM_COLUMN } from '../taskQueries'

const useMoveTaskFromColumn = () => {
    const retVal = useMutation(MOVE_TASK_FROM_COLUMN)
    return retVal
}

export default useMoveTaskFromColumn
