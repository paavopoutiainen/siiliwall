import { useMutation } from '@apollo/client'
import { MOVE_TASK_IN_COLUMN } from '../taskQueries'

const useMoveTaskInColumn = () => {
    const retVal = useMutation(MOVE_TASK_IN_COLUMN)
    return retVal
}

export default useMoveTaskInColumn
