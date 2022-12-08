const express = require("express")

const producto = require("../../../../../services/producto")

const router = express.Router()

router.post("/api/producto/:id/actualizar/imagen", async (request, response) => {
    if (!(/^[\w\_\-\.]$/.test(request.body.imagen))) {
        response.status(401).send("La imagen no tiene un formato correcto")
    }

    if (!(/\.png$|\.jpg$|\.jpeg$/i.test(request.body.imagen))) {
        response.status(401).send("La imagen no tiene un tipo reconocido")
    }
    
    try {
        const productoActual = await producto.actualizarProductoImagen(request.params.id, request.body.imagen)
        response.send(productoActual)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router