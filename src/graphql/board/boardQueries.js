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
            prettyId
            name
            columnOrder
            swimlaneOrder
            prettyIdInt
            columns {
                id
                name
                ticketOrder {
                    ticketId 
                    type
                }
                board {
                    id
                    columnOrder
                }
                tasks {
                    id
                    prettyId
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
                    description
                    swimlaneOrderNumber
                    column {
                        id
                    }
                }
                subtasks {
                    id
                    prettyId
                    name
                    content
                    size
                    column {
                        id
                    }
                    owner {
                        id
                        userName
                    }
                    task {
                        id
                        prettyId
                        title
                    }
                    members {
                        id
                        userName
                    }
                    board {
                        id
                    }
                }
            }
        }
    }
`
export const ADD_BOARD = gql`
    mutation addBoard($name: String!, $prettyId: String!) {
        addBoard(name: $name, prettyId: $prettyId) {
            id
            name
            prettyId
        }
    }
`
