import {
    useMutation,
} from '@apollo/client'
import { ADD_BOARD } from '../boardQueries'

const useAddBoard = () => {
    const returnValue = useMutation(ADD_BOARD, {

    })
    return returnValue
}
export default useAddBoard
