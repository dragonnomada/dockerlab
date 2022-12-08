const express = require("express")

const producto = require("../../../../../services/producto")

const router = express.Router()

router.post("/api/producto/:id/actualizar/existencias", async (request, response) => {
    const existencias = Number(request.body.existencias)
    
    if (!(existencias > 0)) {
        response.status(401).send("Las existencias tienen que ser positivas")
    }
    
    try {
        const productoActual = await producto.actualizarProductoExistencias(request.params.id, existencias)
        response.send(productoActual)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router