const http = require("http")
const express = require("express")
const cors = require("cors")

const db = require("./services/db")

const apiLoginSignIn = require("./api/login/signin")
const apiLoginSignOut = require("./api/login/signout")
const apiLoginTokenRefresh = require("./api/login/token/refresh")
const apiLogintokenVerify = require("./api/login/token/verify")

const apiTodoAll = require("./api/todo/all")
const apiTodoGet = require("./api/todo/get")
const apiTodoAdd = require("./api/todo/add")
const apiTodoUpdate = require("./api/todo/[id]/update")
const apiTodoDelete = require("./api/todo/[id]/delete")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(apiLoginSignIn)
app.use(apiLoginSignOut)
app.use(apiLoginTokenRefresh)
app.use(apiLogintokenVerify)

app.use(apiTodoAll)
app.use(apiTodoGet)
app.use(apiTodoAdd)
app.use(apiTodoUpdate)
app.use(apiTodoDelete)

const server = http.createServer(app)

db.connect().then(() => {
    server.listen(3000, "0.0.0.0", () => {
        console.log("Servidor iniciado en http://0.0.0.0:3000")
    })
})