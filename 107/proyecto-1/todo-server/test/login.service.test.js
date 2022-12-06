const db = require("../services/db")
const login = require("../services/login")

async function test() {
    await db.connect()
    console.log("Conectado a la base de datos")

    const user = await login.signIn('test1', 'test123')

    console.log("Sesión iniciada:", user)

    await login.verifyToken(user.username, user.token)

    console.log("El token es válido")
    
    const user2 = await login.signOut('test1', user.token)
    
    console.log("Sesión finalizada:", user2)

    try {
        await login.verifyToken(user.username, user.token)
        console.log("El primer token ya es válido")
    } catch (error) {
        console.log("El primer token ya no es válido")
    }

    await db.close()
    console.log("Desconectado de la base de datos")
}

test().catch(error => console.error(error))