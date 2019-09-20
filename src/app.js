const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')

app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const httpServer = http.createServer(app)
const portForHTTP = process.env.PORT_HTTP || 8848
httpServer.listen(portForHTTP, function () {
  console.log("Server started successfully on localhost at port:", portForHTTP)
})