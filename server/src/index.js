const express = require('express')
const app = express()
const http = require('http')
const config = require("./utils/config")
const { ApolloServer } = require("apollo-server-express")
const typeDefs = require("./graphql/typedefs")
const resolvers = require("./graphql/resolvers")

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app, path: "/graphql" })

app.listen( {port: config.PORT }, () => {
  console.log(`Server running on port ${config.PORT}`)
})