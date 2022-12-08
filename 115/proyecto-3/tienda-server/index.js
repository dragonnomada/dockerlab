const http = require("http")
const express = require("express")
const cors = require("cors")

const db = require("./services/db")

const apiProductos = require("./api/producto")
const apiProductoAgregar = require("./api/producto/agregar")
const apiProducto = require("./api/producto/[id]")
const apiProductoActualizarImagen = require("./api/producto/[id]/actualizar/imagen")
const apiProductoActualizarDescripcion = require("./api/producto/[id]/actualizar/descripcion")
const apiProductoActualizarExistencias = require("./api/producto/[id]/actualizar/existencias")
const apiProductoActivar = require("./api/producto/[id]/activar")
const apiProductoDesactivar = require("./api/producto/[id]/desactivar")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(apiProductos)
app.use(apiProductoAgregar)
app.use(apiProducto)
app.use(apiProductoActualizarImagen)
app.use(apiProductoActualizarDescripcion)
app.use(apiProductoActualizarExistencias)
app.use(apiProductoActivar)
app.use(apiProductoDesactivar)

const server = http.createServer(app)

db.connect().then(() => {
    server.listen(3000, "0.0.0.0", () => {
        console.log("Servidor iniciado en http://0.0.0.0:3000")
    })
})