import { gql } from '@apollo/client'

export const BOARD_BY_ID = gql`
    query boardById($boardId: ID!) {
        boardById(id: $boardId) {
            id
            prettyId
            name
            columnOrder
            swimlaneOrder
            ticketCount
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
                    board {
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
    mutation addBoard($name: String!, $prettyId: String!, $eventId: ID!, $projectId: ID!) {
        addBoard(name: $name, prettyId: $prettyId, eventId: $eventId, projectId: $projectId) {
            id
            name
            prettyId
        }
    }
`
export const BOARD_ADDED = gql`
    subscription boardAdded($eventId: ID!) {
        boardAdded(eventId: $eventId) {
            mutationType
            board {
                name
                prettyId
            }
        }
    }
`