const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const middleware = require('./utils/middleware')
const boardsRouter = require('./controllers/boards')

app.use(cors())

app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/boards', boardsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
