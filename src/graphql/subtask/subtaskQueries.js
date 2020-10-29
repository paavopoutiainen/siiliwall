import { gql } from '@apollo/client'

export const ADD_SUBTASK = gql`
    mutation createSubtask($taskId: ID!, $columnId: ID!, $boardId: ID!, $name: String, $content: String!, $size: Float, $ownerId: ID, $memberIds: [ID!], $ticketOrder: [TicketOrderInput!]) {
        addSubtaskForTask(taskId: $taskId, columnId: $columnId, boardId: $boardId, name: $name, content: $content, size: $size, ownerId: $ownerId, memberIds: $memberIds, ticketOrder: $ticketOrder) {
            id
            name
            content
            size
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
            board {
                id
            }
        }
    }
`
export const EDIT_SUBTASK = gql`
    mutation editSubtask($id: ID!, $name: String, $content: String!, $size: Float, $ownerId: ID, $oldMemberIds: [ID!], $newMemberIds: [ID!]) {
        editSubtaskById(id: $id, name: $name, content: $content, size: $size, ownerId: $ownerId, oldMemberIds: $oldMemberIds, newMemberIds: $newMemberIds) {
            id
            name
            content
            size
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
