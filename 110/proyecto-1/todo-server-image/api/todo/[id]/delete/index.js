const express = require("express")

const todo = require("../../../../services/todo")

const router = express.Router()

router.post("/api/todo/:id/delete", async (request, response) => {
    try {
        const currentTodo = await todo.deleteTodoById(request.params.id, request.body.username, request.body.token)
        response.send(currentTodo)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router