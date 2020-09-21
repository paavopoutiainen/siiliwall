import { gql } from '@apollo/client'

export const MOVE_TASK_IN_COLUMN = gql`
    mutation moveTaskInColumn($orderArray: [ID!]!, $columnId: ID!) {
        moveTaskInColumn(newOrder: $orderArray, columnId: $columnId) {
            id
        }
    }
`

export const MOVE_TASK_FROM_COLUMN = gql`
    mutation moveTaskFromColumn($taskId: ID!, $sourceColumnId: ID!, $destColumnId: ID!, $sourceTaskOrder: [ID!], $destTaskOrder: [ID!]) {
        moveTaskFromColumn(taskId: $taskId, sourceColumnId: $sourceColumnId, destColumnId: $destColumnId, sourceTaskOrder: $sourceTaskOrder, destTaskOrder: $destTaskOrder) {
            id
        }
    }    
`

export const ADD_TASK = gql`
    mutation createTask($columnId: ID!, $title: String!, $size: Float) {
        addTaskForColumn(columnId: $columnId, title: $title, size: $size) {
            id
            name
            taskOrder
            tasks{
                id
                title
                size
            }
        }
    }
`

export const DELETE_TASK = gql`
    mutation deleteTask($taskId: ID!) {
        deleteTaskById(id: $taskId)
    }
`
