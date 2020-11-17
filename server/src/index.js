const { ApolloServer } = require('apollo-server')
const http = require('http')
require('dotenv').config('../.env')
const { makeExecutableSchema } = require('graphql-tools')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')

const { PORT } = process.env

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({ schema })

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
