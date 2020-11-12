import { gql } from '@apollo/client'

export const PROJECT_BY_ID = gql`
    query projectById($projectId: ID!) {
        projectById(id: $projectId) {
            id
            boards {
                id
                name
                orderNumber
            }
        }
    }
`

export const BOARDS_BY_PROJECT_ID = gql`
    query boardsByProjectId($projectId: ID!) {
        boardsByProjectId(id: $projectId) {
            id
            name
            orderNumber
        }   
    }
`