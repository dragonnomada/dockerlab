const db = require("../db")

async function obtenerTodosProductos() {
    const productos = await db.executeQuery(
        "select * from productos where activo=true"
    )

    return productos
}

async function obtenerProductoById(id) {
    const [producto] = await db.executeQuery(
        "select * from productos where id=? limit 1",
        [id]
    )

    if (!producto) throw new Error(`No existe el producto con id: ${id}`)

    return producto
}

async function agregarProducto(sku, nombre) {
    const [result] = await db.executeUpdate(
        "insert into productos (sku, nombre) values (?, ?)",
        [sku, nombre]
    )

    return await obtenerProductoById(result.insertId)
}

async function actualizarProductoImagen(id, imagen) {
    const [result] = await db.executeUpdate(
        "update productos set imagen=?, actualizado=now() where id=?",
        [imagen, id]
    )

    if (result.affectedRows !== 1) throw new Error(`Error al actualizar la imagen el producto con id: ${id}`)

    await actualizarProductoEstado(id, 2001)

    return await obtenerProductoById(id)
}

async function actualizarProductoDescripcion(id, descripcion) {
    const [result] = await db.executeUpdate(
        "update productos set descripcion=?, actualizado=now() where id=?",
        [descripcion, id]
    )

    if (result.affectedRows !== 1) throw new Error(`Error al actualizar la descripción el producto con id: ${id}`)

    await actualizarProductoEstado(id, 2002)

    return await obtenerProductoById(id)
}

async function actualizarProductoExistencias(id, existencias) {
    const [result] = await db.executeUpdate(
        "update productos set existencias=?, actualizado=now() where id=?",
        [existencias, id]
    )

    if (result.affectedRows !== 1) throw new Error(`Error al actualizar las existencias el producto con id: ${id}`)

    await actualizarProductoEstado(id, 2003)

    return await obtenerProductoById(id)
}

async function actualizarProductoEstado(id, existencias) {
    const [result] = await db.executeUpdate(
        "update productos set estado=?, actualizado=now() where id=?",
        [existencias, id]
    )

    if (result.affectedRows !== 1) throw new Error(`Error al actualizar el estado el producto con id: ${id}`)

    return await obtenerProductoById(id)
}

async function activarProducto(id) {
    const [result] = await db.executeUpdate(
        "update productos set activo=true, eliminado=null, actualizado=now() where id=?",
        [id]
    )

    if (result.affectedRows !== 1) throw new Error(`Error al desactivar el producto con id: ${id}`)

    await actualizarProductoEstado(id, 3001)

    return await obtenerProductoById(id)
}

async function desactivarProducto(id) {
    const [result] = await db.executeUpdate(
        "update productos set activo=false, eliminado=now(), actualizado=now() where id=?",
        [id]
    )

    if (result.affectedRows !== 1) throw new Error(`Error al desactivar el producto con id: ${id}`)

    await actualizarProductoEstado(id, 4001)

    return await obtenerProductoById(id)
}

module.exports = {
    obtenerTodosProductos,
    obtenerProductoById,
    agregarProducto,
    actualizarProductoImagen,
    actualizarProductoDescripcion,
    actualizarProductoExistencias,
    actualizarProductoEstado,
    activarProducto,
    desactivarProducto
}