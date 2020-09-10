const express = require('express')
const app = express()
const http = require('http')
const config = require("./utils/config")
const { ApolloServer } = require("apollo-server-express")
const typeDefs = require("./graphql/typedefs")
const resolvers = require("./graphql/resolvers")

const apollo = new ApolloServer({ typeDefs, resolvers })
apollo.applyMiddleware({ app, path: "/graphql" })

const httpServer = http.createServer(app)

httpServer.listen( {port: config.PORT }, () => {
  console.log(`Server running on port ${config.PORT}`)
})

var closeHttpServer = function() {
  httpServer.close();
};

module.exports = { app, closeHttpServer }