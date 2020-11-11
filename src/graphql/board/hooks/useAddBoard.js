import {
    useMutation,
} from '@apollo/client'
import { ADD_BOARD } from '../boardQueries'
import { addNewBoard } from '../../cacheService/cacheUpdates'


const useAddBoard = () => {
    const retVal = useMutation(ADD_BOARD, {
        update: async (cache, response) => {
            addNewBoard(response.data.addBoard)
        }
    })
    return retVal
}
export default useAddBoard
