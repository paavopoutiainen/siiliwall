import { useMutation } from '@apollo/client'
import { MOVE_SWIMLANE } from '../swimlaneQueries'

const useMoveSwimlane = () => {
    const retVal = useMutation(MOVE_SWIMLANE)
    return retVal
}
export default useMoveSwimlane