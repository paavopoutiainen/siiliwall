/* eslint-disable import/prefer-default-export */
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql',
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
                },
            },
        },
    }),
})
