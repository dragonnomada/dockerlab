const express = require("express")

const todo = require("../../../../services/todo")

const router = express.Router()

router.post("/api/todo/:id/update", async (request, response) => {
    try {
        const currentTodo = await todo.updateTodoByIdWithChecked(request.params.id, request.body.username, request.body.token, JSON.parse(request.body.checked))
        response.send(currentTodo)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router