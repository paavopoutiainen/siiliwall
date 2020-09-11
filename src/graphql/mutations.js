import { gql } from '@apollo/client'

const ADD_BOARD = gql`
    mutation createBoard($name: String!) {
        addBoard(name: $name) {
            name
        }
    }
`
export default ADD_BOARD
