import { gql } from '@apollo/client'

export const ALL_BOARDS = gql`
    query {
        allBoards {
           id
           name
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
                }
            }
        }
    }
`
export const ADD_BOARD = gql`
    mutation createBoard($name: String!) {
        addBoard(name: $name) {
            name
        }
    }
`
