import { gql } from '@apollo/client'

const ADD_BOARD = gql`
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
