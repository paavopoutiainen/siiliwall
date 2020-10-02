import { gql } from '@apollo/client'

export const ADD_SUBTASK = gql`
    mutation createSubtask($taskId: ID!, $columnId: ID!, $content: String!, $ownerId: ID) {
        addSubtaskForTask(taskId: $taskId, columnId: $columnId, content: $content, ownerId: $ownerId) {
            id
            content
            owner {
                id
                userName
            }
            task {
                id
                title
            }
        }
    }
`

export const ARCHIVE_SUBTASK = gql`
    mutation archiveSubtask($subtaskId: ID!) {
        archiveSubtaskById(id: $subtaskId)
    }
`

export const DELETE_SUBTASK = gql`
    mutation deleteSubtask($subtaskId: ID!) {
        deleteSubtaskById(id: $subtaskId)
    }
`
