const express = require("express")

const login = require("../../../services/login")

const router = express.Router()

router.post("/api/login/signin", async (request, response) => {
    try {
        const user = await login.signIn(request.body.username || "none", request.body.password || "none")
        response.send(user)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router