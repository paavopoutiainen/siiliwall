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
export const TASK_BY_ID = gql`
    query taskById($taskId: ID!) {
        taskById(id: $taskId) {
            id
            title
            size
            owner
            content
        }
    }
`

export const ADD_TASK = gql`
    mutation createTask($columnId: ID!, $title: String!, $size: Float, $ownerId: ID, $content: String) {
        addTaskForColumn(columnId: $columnId, title: $title, size: $size, ownerId: $ownerId, content: $content) {
            id
            title
            size
            ownerId
            content
        }
    }
`

export const DELETE_TASK = gql`
    mutation deleteTask($taskId: ID!) {
        deleteTaskById(id: $taskId)
    }
`

export const EDIT_TASK = gql`
    mutation editTask($taskId: ID!, $title: String!, $size: Float, $owner: String) {
        editTaskById(id: $taskId, title: $title, size: $size, owner: $owner) {
            id
            title
            size
            owner
        }
    }
`
export const ARCHIVE_TASK = gql`
    mutation archiveTask($taskId: ID!) {
        archiveTaskById(id: $taskId)
    }
`
