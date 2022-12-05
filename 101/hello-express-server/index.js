const http = require("http")
const express = require("express")

const app = express()

app.get("/", (request, response) => {
    response.send("<h1>Bienvenido</h1>")
})

app.get("/about", (request, response) => {
    response.send("<h1>Nosotros somos...</h1>")
})

const server =http.createServer(app)

server.listen(3002, "localhost", () => {
    console.log("Servidor iniciado en http://localhost:3000")
})