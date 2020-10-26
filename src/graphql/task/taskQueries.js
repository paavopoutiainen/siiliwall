import { gql } from '@apollo/client'

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
    mutation createTask($boardId: ID!, $columnId: ID!, $title: String!, $size: Float, $ownerId: ID, $memberIds: [ID!], $description: String) {
        addTaskForColumn(boardId: $boardId, columnId: $columnId, title: $title, size: $size, ownerId: $ownerId, memberIds: $memberIds, description: $description) {
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

export const PRIORITIZE_TASK = gql`
    mutation prioritizeTask($id: ID!, $swimlaneOrderNumber: Int!, $affectedPrioritizedTaskIds: [ID!], $direction: String!) {
        prioritizeTask(id: $id, swimlaneOrderNumber: $swimlaneOrderNumber, affectedPrioritizedTaskIds: $affectedPrioritizedTaskIds, direction: $direction)
    }
`
export const UNPRIORITIZE_TASK = gql`
    mutation unPrioritizeTask($id: ID!, $prioritizedTaskIds: [ID!]) {
        unPrioritizeTask(id: $id, prioritizedTaskIds: $prioritizedTaskIds)
    }
`
