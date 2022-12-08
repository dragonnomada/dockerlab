const express = require("express")

const producto = require("../../../services/producto")

const router = express.Router()

router.get("/api/producto/:id", async (request, response) => {
    try {
        const productoActual = await producto.obtenerProductoById(request.params.id)
        response.send(productoActual)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router