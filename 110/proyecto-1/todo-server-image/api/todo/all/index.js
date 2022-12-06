const express = require("express")

const todo = require("../../../services/todo")

const router = express.Router()

router.get("/api/todo/all", async (request, response) => {
    try {
        const todos = await todo.allTodos(request.query.username, request.query.token)
        response.send(todos)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router