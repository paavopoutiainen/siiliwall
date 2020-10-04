import { gql } from '@apollo/client'

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
            owner{
                id
            }
            members{
                id
            }
            description
        }
    }
`

export const ADD_TASK = gql`
    mutation createTask($columnId: ID!, $title: String!, $size: Float, $ownerId: ID, $memberIds: [ID!], $description: String) {
        addTaskForColumn(columnId: $columnId, title: $title, size: $size, ownerId: $ownerId, memberIds: $memberIds, description: $description) {
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
            description
        }
    }
`

export const DELETE_TASK = gql`
    mutation deleteTask($taskId: ID!) {
        deleteTaskById(id: $taskId)
    }
`

export const EDIT_TASK = gql`
    mutation editTask($taskId: ID!, $title: String!, $size: Float, $ownerId: ID, $oldMemberIds: [ID!], $newMemberIds: [ID!], $description: String) {
        editTaskById(id: $taskId, title: $title, size: $size, ownerId: $ownerId, oldMemberIds: $oldMemberIds, newMemberIds: $newMemberIds, description: $description) {
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
            description
        }
    }
`
export const ARCHIVE_TASK = gql`
    mutation archiveTask($taskId: ID!) {
        archiveTaskById(id: $taskId)
    }
`
