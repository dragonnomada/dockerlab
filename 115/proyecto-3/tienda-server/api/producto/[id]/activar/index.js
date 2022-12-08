const express = require("express")

const producto = require("../../../../services/producto")

const router = express.Router()

router.patch("/api/producto/:id/activar", async (request, response) => {
    try {
        const productoActual = await producto.activarProducto(request.params.id)
        response.send(productoActual)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router