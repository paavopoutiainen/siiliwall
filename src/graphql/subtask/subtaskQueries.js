import { gql } from '@apollo/client'

export const ADD_SUBTASK = gql`
    mutation createSubtask($taskId: ID!, $columnId: ID!, $ownerId: ID!, $memberIds: [ID!], $content: String!) {
        addSubtaskForTask(taskId: $taskId, columnId: $columnId, ownerId: $ownerId, memberIds: $memberIds, content: $content) {
            id
            content
            owner {
                id
                userName
            }
            members {
                id
                userName
            }
            content
        }
    }
`