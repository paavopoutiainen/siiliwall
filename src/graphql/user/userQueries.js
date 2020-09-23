/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const ALL_USERS = gql`
    query {
        allUsers {
            id
            userName
        }
    }
`
