const express = require("express")

const todo = require("../../../services/todo")

const router = express.Router()

router.get("/api/todo/get", async (request, response) => {
    try {
        const currentTodo = await todo.getTodoById(request.query.id)
        response.send(currentTodo)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router