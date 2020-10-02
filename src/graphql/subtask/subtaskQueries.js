import { gql } from '@apollo/client'

export const ADD_SUBTASK = gql`
    mutation createSubtask($taskId: ID!, $columnId: ID!, $content: String!) {
        addSubtaskForTask(taskId: $taskId, columnId: $columnId, content: $content) {
            id
            content
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
