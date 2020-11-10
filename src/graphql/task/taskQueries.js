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
    mutation createTask($boardId: ID!, $columnId: ID!, $title: String!, $size: Int, $ownerId: ID, $memberIds: [ID!], $description: String, $eventId: ID!) {
        addTaskForColumn(boardId: $boardId, columnId: $columnId, title: $title, size: $size, ownerId: $ownerId, memberIds: $memberIds, description: $description, eventId: $eventId) {
            id
            prettyId
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
            swimlaneOrderNumber
            column {
                id
            }
            board {
                id
            }
        }
    }
`

export const DELETE_TASK = gql`
    mutation deleteTask($taskId: ID!, $columnId: ID!, $boardId: ID!, $eventId: ID!) {
        deleteTaskById(id: $taskId, columnId: $columnId, boardId: $boardId, eventId: $eventId)
    }
`

export const EDIT_TASK = gql`
    mutation editTask($taskId: ID!, $title: String!, $size: Int, $ownerId: ID, $oldMemberIds: [ID!], $newMemberIds: [ID!], $description: String, $eventId: ID!) {
        editTaskById(id: $taskId, title: $title, size: $size, ownerId: $ownerId, oldMemberIds: $oldMemberIds, newMemberIds: $newMemberIds, description: $description, eventId: $eventId) {
            id
            prettyId
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
            swimlaneOrderNumber
            column {
                id
            }
            board {
                id
            }
            
        }
    }
`
export const ARCHIVE_TASK = gql`
    mutation archiveTask($taskId: ID!, $columnId: ID!, $boardId: ID!, $eventId: ID!) {
        archiveTaskById(id: $taskId, columnId: $columnId, boardId: $boardId, eventId: $eventId)
    }
`

export const MOVE_SWIMLANE = gql`
    mutation moveSwimlane($boardId: ID!, $newSwimlaneOrder: [newSwimlaneOrderInput!]!, $swimlaneOrder: [ID!]!, $eventId: ID!) {
        moveSwimlane(boardId: $boardId, newSwimlaneOrder: $newSwimlaneOrder, swimlaneOrder: $swimlaneOrder, eventId: $eventId) 
    }
`
export const TASK_MUTATED = gql`
  subscription taskMutated($boardId: ID!, $eventId: ID!) {
    taskMutated(boardId: $boardId, eventId: $eventId) {
      mutationType
      node {
        id
        prettyId
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
        swimlaneOrderNumber
        column {
            id
        }
        board {
            id
        }
      }
    }
  }
`

export const TASK_REMOVED = gql`
  subscription taskRemoved($boardId: ID!, $eventId: ID!) {
    taskRemoved(boardId: $boardId, eventId: $eventId) {
      removeType
      removeInfo {
          taskId
          columnId
          boardId
      }
    }
  }
`

export const SWIMLANE_MOVED = gql`
subscription swimlaneMoved($boardId: ID!, $eventId: ID!) {
    swimlaneMoved(boardId: $boardId, eventId: $eventId) {
        boardId
        newSwimlaneOrder {
            id
            swimlaneOrderNumber
        }
        swimlaneOrder
    }
  }
`
