import { gql } from '@apollo/client'

export const ADD_SUBTASK = gql`
    mutation createSubtask($taskId: ID!, $columnId: ID!, $content: String!) {
        addSubtaskForTask(taskId: $taskId, columnId: $columnId, content: $content) {
            id
            content
        }
    }
`