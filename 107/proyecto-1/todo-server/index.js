const http = require("http")
const express = require("express")

const db = require("./services/db")

const apiTodoAll = require("./api/todo/all")
const apiLoginSignIn = require("./api/login/signin")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(apiTodoAll)
app.use(apiLoginSignIn)

const server = http.createServer(app)

db.connect().then(() => {
    server.listen(3000, () => {
        console.log("Servidor iniciado en http://localhost:3000")
    })
})