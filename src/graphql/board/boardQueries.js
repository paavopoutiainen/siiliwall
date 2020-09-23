import { gql } from '@apollo/client'

export const ALL_BOARDS = gql`
    query {
        allBoards {
           id
           name
           orderNumber
        }
    }
`
export const BOARD_BY_ID = gql`
    query boardById($boardId: ID!) {
        boardById(id: $boardId) {
            id
            name
            columnOrder
            columns {
                id
                name
                taskOrder
                board {
                    id
                    columnOrder
                }
                tasks {
                    id
                    title
                    size
                    owner
                }
            }
        }
    }
`
export const ADD_BOARD = gql`
    mutation addBoard($name: String!) {
        addBoard(name: $name) {
            id
            name
        }
    }
`