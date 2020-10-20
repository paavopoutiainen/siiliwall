import { gql } from '@apollo/client'

export const ADD_SUBTASK = gql`
    mutation createSubtask($taskId: ID!, $columnId: ID!, $content: String!, $ownerId: ID, $memberIds: [ID!], $ticketOrder: [TicketOrderInput!]) {
        addSubtaskForTask(taskId: $taskId, columnId: $columnId, content: $content, ownerId: $ownerId, memberIds: $memberIds, ticketOrder: $ticketOrder) {
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
            members {
                id
                userName
            }
            column {
                id
                ticketOrder {
                    ticketId
                    type
                }
            }
        }
    }
`
export const EDIT_SUBTASK = gql`
    mutation editSubtask($id: ID!, $content: String!, $ownerId: ID, $oldMemberIds: [ID!], $newMemberIds: [ID!]) {
        editSubtaskById(id: $id, content: $content, ownerId: $ownerId, oldMemberIds: $oldMemberIds, newMemberIds: $newMemberIds) {
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
