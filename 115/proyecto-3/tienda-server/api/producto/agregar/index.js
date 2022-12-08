const express = require("express")

const producto = require("../../../services/producto")

const router = express.Router()

router.put("/api/productos/agregar", async (request, response) => {
    if (!(/^[A-Z]\:\d+$/.test(request.body.sku))) {
        response.status(401).send(`El SKU no es válido`)
        return
    }

    if (!(/^[A-Za-z0-9].*/.test(request.body.nombre))) {
        response.status(401).send(`El nombre no es válido`)
        return
    }

    try {
        const productos = await producto.agregarProducto(request.body.sku, request.body.nombre)
        response.send(productos)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router