/* eslint-disable import/prefer-default-export */
import {
    useQuery,
} from '@apollo/client'
import { ALL_BOARDS } from '../boardQueries'

export const useAllBoards = () => {
    const { loading, error, data } = useQuery(ALL_BOARDS)
    return { loading, error, data }
}
