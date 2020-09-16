/* eslint-disable import/prefer-default-export */
import {
    useQuery,
} from '@apollo/client'
import { BOARD_BY_ID } from '../boardQueries'

export const useBoardById = (id) => {
    const {
        loading, error, data,
    } = useQuery(BOARD_BY_ID, {
        variables: {
            boardId: id,
        },
    })
    return { data, error, loading }
}
