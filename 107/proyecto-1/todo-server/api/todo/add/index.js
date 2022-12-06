const express = require("express")

const todo = require("../../../services/todo")

const router = express.Router()

router.put("/api/todo/add", async (request, response) => {
    try {
        const currentTodo = await todo.addTodo(request.body.label, request.body.username, request.body.token)
        response.send(currentTodo)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router