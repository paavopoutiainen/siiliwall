import { gql } from '@apollo/client'

export const ADD_BOARD = gql`
    mutation createBoard($name: String!) {
        addBoard(name: $name) {
            name
        }
    }
`

export const CHANGE_TASKORDER_FOR_ONE_COLUMN = gql`
    mutation changeTaskOrderForOneColumn($orderArray: [ID!]!, $columnId: ID!) {
        changeTaskOrderForOneColumn(newOrder: $orderArray, columnId: $columnId) {
            id
            taskOrder
        }
    }
`
export default ADD_BOARD
export const ADD_TASK = gql`
    mutation createTask($columnId: ID!, $title: String!) {
        addTaskForColumn(columnId: $columnId, title: $title) {
            id
            name
            taskOrder
            tasks{
                id
                title
            }
        }
    }
`
