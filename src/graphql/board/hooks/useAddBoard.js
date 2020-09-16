/* eslint-disable import/prefer-default-export */
import {
    useMutation,
} from '@apollo/client'
import { ADD_BOARD, ALL_BOARDS } from '../boardQueries'

export const useAddBoard = () => {
    const returnValue = useMutation(ADD_BOARD, {
        refetchQueries: [{ query: ALL_BOARDS }],
    })
    return returnValue
}
