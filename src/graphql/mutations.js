import { gql } from '@apollo/client'

export const ADD_BOARD = gql`
    mutation createBoard($name: String!) {
        addBoard(name: $name) {
            name
        }
    }
`

export const ADD_TASK = gql`
    mutation createTask($columnId: ID!, $title: String!) {
        addTaskForColumn(columnId: $columnId, title: $title) {
            id
            title
        }
    }
`
