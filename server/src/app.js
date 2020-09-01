const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
//Tuodaan omat middlewaret
const middleware = require("./utils/middleware")

app.use(cors())

//Tällä saadaan requesteistä bodyosa handlerien käyttöön req.bodyyn
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.get("/", (req, res) => {
  console.log("here", req.body)
  res.send({msg: "Hello there is it working"})
})

app.use(middleware.unknownEndpoint)

module.exports = app