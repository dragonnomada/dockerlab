const express = require("express")

const login = require("../../../../services/login")

const router = express.Router()

router.post("/api/login/token/refresh", async (request, response) => {
    try {
        const user = await login.refreshToken(request.body.username, request.body.token)
        response.send(user)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router