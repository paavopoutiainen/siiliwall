/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const ADD_COLUMN = gql`
    mutation addColumnForBoard($boardId: ID!, $columnName: String!) {
        addColumnForBoard(boardId: $boardId, columnName: $columnName) {
            id
            name
        }
    }
`

export const MOVE_COLUMN = gql`
    mutation moveColumn($orderArray: [ID!]!, $boardId: ID!) {
        moveColumn(newColumnOrder: $orderArray, boardId: $boardId) {
            id
        }
    }
`

export const DELETE_COLUMN = gql`
    mutation deleteColumn($columnId: ID!) {
        deleteColumnById(id: $columnId)
    }
`
