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
                subtaskOrder
                board {
                    id
                    columnOrder
                }
                subtasks {
                    id
                    name
                }
                tasks {
                    id
                    title
                    size
                    owner {
                        id
                        userName
                    }
                    members {
                        id
                        userName
                    }
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
