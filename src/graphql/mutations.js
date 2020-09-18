import { gql } from '@apollo/client'

export const ADD_BOARD = gql`
    mutation createBoard($name: String!) {
        addBoard(name: $name) {
            id
            name
        }
    }
`

export const CHANGE_TASKORDER_IN_COLUMN = gql`
    mutation changeTaskOrderInColumn($orderArray: [ID!]!, $columnId: ID!) {
        changeTaskOrderInColumn(newOrder: $orderArray, columnId: $columnId) {
            id
            taskOrder
        }
    }
`

export const ADD_TASK = gql`
    mutation createTask($columnId: ID!, $title: String!) {
        addTaskForColumn(columnId: $columnId, title: $title) {
            id
            name
            taskOrder
            tasks{
                id
                title
            }
        }
    }
`

export const ADD_COLUMN = gql`
    mutation addColumnForBoard($boardId: ID!, $columnName: String!) {
        addColumnForBoard(boardId: $boardId, columnName: $columnName) {
            id
            name
        }
    }
`
