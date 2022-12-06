const db = require("../db")
const login = require("../login")

async function allTodos(username, token) {
    await login.verifyToken(username, token)

    const todos = await db.executeQuery(
        "select * from todos where username=?",
        [username]
    )

    return todos
}

async function getTodoById(id) {
    const [todo] = await db.executeQuery(
        "select * from todos where id=? limit 1",
        [id]
    )

    if (!todo) throw new Error(`No existe el todo con id: ${id}`)

    return todo
}

async function addTodo(label, username, token) {
    const user = await login.verifyToken(username, token)
    
    const [result] = await db.executeUpdate(
        "insert into todos (label, id_user, username) values (?, ?, ?)",
        [label, user.id, user.username]
    )

    return await getTodoById(result.insertId)
}

async function updateTodoByIdWithChecked(id, username, token, checked) {
    const user = await login.verifyToken(username, token)

    const [result] = await db.executeUpdate(
        "update todos set checked=?, checked_at=now(), update_at=now() where id=? and id_user=?",
        [checked, id, user.id]
    )

    if (result.affectedRows !== 1) throw new Error(`Error al actualizar el todo con id: ${id}`)

    return await getTodoById(id)
}

async function deleteTodoById(id) {
    const user = await login.verifyToken(username, token)

    const [result] = await db.executeUpdate(
        "update todos set delete_at=now() where id=? and id_user=?",
        [checked, id, user.id]
    )

    if (result.affectedRows !== 1) throw new Error(`Error al eliminar el todo con id: ${id}`)

    return await getTodoById(id)
}

module.exports = {
    allTodos,
    getTodoById,
    addTodo,
    updateTodoByIdWithChecked,
    deleteTodoById
}