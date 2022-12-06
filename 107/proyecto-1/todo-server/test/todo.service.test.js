const db = require("../services/db")
const login = require("../services/login")
const todo = require("../services/todo")

async function test() {
    await db.connect()
    console.log("Conectado a la base de datos")

    const user = await login.signIn('test1', 'test123')

    console.log("Sesión iniciada:", user)

    await todo.addTodo("X1", user.username, user.token)
    const currentTodo = await todo.addTodo("X2", user.username, user.token)
    await todo.addTodo("X3", user.username, user.token)
    
    {
        const todos = await todo.allTodos(user.username, user.token)
        console.log(todos)
    }

    {
        await todo.updateTodoByIdWithChecked(currentTodo.id, user.username, user.token, true)
    }

    {
        const todos = await todo.allTodos(user.username, user.token)
        console.log(todos)
    }

    const user2 = await login.signOut('test1', user.token)
    
    console.log("Sesión finalizada:", user2)

    await db.close()
    console.log("Desconectado de la base de datos")
}

test().catch(error => console.error(error))