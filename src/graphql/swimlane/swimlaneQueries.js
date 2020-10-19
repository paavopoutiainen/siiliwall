import { gql } from '@apollo/client'

export const MOVE_SWIMLANE = gql`
    mutation moveSwimlane($swimlaneOrderArray: [ID!]!, $boardId: ID!) {
        moveSwimlane(boardId: $boardId, newSwimlaneOrder: $swimlaneOrderArray)
    }
`