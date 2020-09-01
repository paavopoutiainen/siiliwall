//Tämä tiedosto huolehtii sovelluksen käynnistämisestä
//tuodaan express sovellus 
const app = require("./app")
//importataan http moduuli, 
const http = require('http')
const config = require("./utils/config")

const server = http.createServer(app) 

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})