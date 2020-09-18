// tämä tiedosto poistuu kokonaan
import { gql } from '@apollo/client'

export const GET_ALL_BOARDS = gql`
    query {
        allBoards {
           id
           name
        }
    }
`
export const GET_BOARD_BY_ID = gql`
    query boardById($boardId: ID!) {
        boardById(id: $boardId) {
            id
            name
            columnOrder
            columns {
                id
                name
                board {
                    id
                    columnOrder
                }
                taskOrder
                tasks {
                    id
                    title
                }
            }
        }
    }
`