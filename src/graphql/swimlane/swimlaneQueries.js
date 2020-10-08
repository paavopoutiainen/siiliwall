import { gql } from '@apollo/client'

export const MOVE_SWIMLANE = gql`
    mutation moveSwimlane($swimlaneOrderNumber: [ID!]!, $boardId: ID!) {
        moveSwimlane(boardId: $boardId, newSwimlaneOrder: $swimlaneOrderNumber)
    }
`