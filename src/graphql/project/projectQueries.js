import { gql } from '@apollo/client'

export const PROJECT_BY_ID = gql`
    query projectById($projectId: ID!) {
        projectById(projectId: $projectId) {
            id
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