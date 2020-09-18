import { gql } from '@apollo/client'

export const MOVE_TASK_IN_COLUMN = gql`
    mutation changeTaskOrderInColumn($orderArray: [ID!]!, $columnId: ID!) {
        changeTaskOrderInColumn(newOrder: $orderArray, columnId: $columnId) {
            id
            taskOrder
        }
    }
`

export const MOVE_TASK_FROM_COLUMN = gql`
    mutation changeTaskOrdersInColumns($taskId: ID!, $sourceColumnId: ID!, $destColumnId: ID!, $sourceTaskOrder: [ID!], $destTaskOrder: [ID!]) {
        changeTaskOrdersInColumns(taskId: $taskId, sourceColumnId: $sourceColumnId, destColumnId: $destColumnId, sourceTaskOrder: $sourceTaskOrder, destTaskOrder: $destTaskOrder) {
            id
            taskOrder
            tasks {
                id
            }
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
