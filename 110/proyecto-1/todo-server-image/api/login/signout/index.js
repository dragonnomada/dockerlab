const express = require("express")

const login = require("../../../services/login")

const router = express.Router()

router.post("/api/login/signout", async (request, response) => {
    try {
        const user = await login.signOut(request.body.username || "none")
        response.send(user)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router