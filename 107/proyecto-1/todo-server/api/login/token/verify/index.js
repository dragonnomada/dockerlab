const express = require("express")

const login = require("../../../../services/login")

const router = express.Router()

router.get("/api/login/token/verify", async (request, response) => {
    try {
        const user = await login.verifyToken(request.query.username, request.query.token)
        response.send(user)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router