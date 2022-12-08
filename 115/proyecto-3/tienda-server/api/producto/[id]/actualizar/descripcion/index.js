const express = require("express")

const producto = require("../../../../../services/producto")

const router = express.Router()

router.post("/api/producto/:id/actualizar/descripcion", async (request, response) => {
    if (/^[\s\n\t]*$/.test(request.body.descripcion)) {
        response.status(401).send("La descripción no puede estar vacía")
    }
    
    try {
        const productoActual = await producto.actualizarProductoDescripcion(request.params.id, request.body.descripcion)
        response.send(productoActual)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router