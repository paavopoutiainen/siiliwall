const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
//Tuodaan omat middlewaret
const middleware = require("./utils/middleware")
const boardsRouter = require("./controllers/boards")

app.use(cors())

//Tällä saadaan requesteistä bodyosa handlerien käyttöön req.bodyyn
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.get("/", (req, res) => {
  res.send({msg: "Hello there is it working"})
})

app.use("/api/boards", boardsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app