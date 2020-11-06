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
    mutation createTask($boardId: ID!, $columnId: ID!, $title: String!, $size: Int, $ownerId: ID, $memberIds: [ID!], $description: String) {
        addTaskForColumn(boardId: $boardId, columnId: $columnId, title: $title, size: $size, ownerId: $ownerId, memberIds: $memberIds, description: $description) {
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
    mutation deleteTask($taskId: ID!, $columnId: ID!, $boardId: ID!) {
        deleteTaskById(id: $taskId, columnId: $columnId, boardId: $boardId)
    }
`

export const EDIT_TASK = gql`
    mutation editTask($taskId: ID!, $title: String!, $size: Int, $ownerId: ID, $oldMemberIds: [ID!], $newMemberIds: [ID!], $description: String) {
        editTaskById(id: $taskId, title: $title, size: $size, ownerId: $ownerId, oldMemberIds: $oldMemberIds, newMemberIds: $newMemberIds, description: $description) {
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
    mutation archiveTask($taskId: ID!, $columnId: ID!, $boardId: ID!) {
        archiveTaskById(id: $taskId, columnId: $columnId, boardId: $boardId){
            taskId
            columnId
            boardId
            
        }
    }
`

export const MOVE_SWIMLANE = gql`
    mutation moveSwimlane($boardId: ID!, $newSwimlaneOrder: [newSwimlaneOrderInput!]!) {
        moveSwimlane(boardId: $boardId, newSwimlaneOrder: $newSwimlaneOrder) 
    }
`
export const TASK_MUTATED = gql`
  subscription taskMutated($boardId: ID!) {
    taskMutated(boardId: $boardId) {
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
  subscription taskRemoved($boardId: ID!) {
    taskRemoved(boardId: $boardId) {
      removeType
      removeInfo {
          taskId
          columnId
          boardId
      }
    }
  }
`
