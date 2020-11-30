/* eslint-disable import/prefer-default-export */
import {
    ApolloClient, InMemoryCache, split, HttpLink,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

require('dotenv').config('../.env')

const loadBalancerUri = process.env.LOADBALANCER_URI
const backEndUri = 'http://awseb-AWSEB-5G8ZE5PK1FBW-990418282.eu-north-1.elb.amazonaws.com/graphql'

const wsUri = process.env.REACT_APP_ENVIRONMENT = 'ws://awseb-AWSEB-5G8ZE5PK1FBW-990418282.eu-north-1.elb.amazonaws.com/graphql'

const httpLink = new HttpLink({
    uri: backEndUri,
})

const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
        reconnect: true,
    },
})

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition'
            && definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink,
)

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            Board: {
                fields: {
                    columns: {
                        merge(existing, incoming = []) {
                            return [...incoming]
                        },
                    },
                    columnOrder: {
                        merge(existing, incoming = []) {
                            return [...incoming]
                        },
                    },
                    swimlaneOrder: {
                        merge(existing, incoming = []) {
                            return [...incoming]
                        },
                    },
                },
            },
            Column: {
                fields: {
                    tasks: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                    subtasks: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                    ticketOrder: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                    taskOrder: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                },
            },
            Task: {
                fields: {
                    members: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                    colors: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                },
            },
            Subtask: {
                fields: {
                    colors: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                },
            },
        },
    }),
})
