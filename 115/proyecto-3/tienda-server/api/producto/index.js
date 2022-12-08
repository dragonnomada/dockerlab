const express = require("express")

const producto = require("../../services/producto")

const router = express.Router()

router.get("/api/productos", async (request, response) => {
    try {
        const productos = await producto.obtenerTodosProductos()
        response.send(productos)
    } catch (error) {
        response.status(500).send(`${error}`)
    }
})

module.exports = router