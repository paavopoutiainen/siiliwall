import { gql } from '@apollo/client'

export const ADD_BOARD = gql`
    mutation createBoard($name: String!) {
        addBoard(name: $name) {
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
export const DELETE_TASK = gql`
    mutation deleteTask($taskId: ID!) {
        deleteTaskById(id: $taskId)
    }
`

export const DELETE_COLUMN = gql`
    mutation deleteColumn($columnId: ID!) {
        deleteColumnById(id: $columnId)
    }
`