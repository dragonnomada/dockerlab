const db = require("../services/db")

async function test() {
    await db.connect()
    console.log("Conectado a la base de datos")
    await db.close()
    console.log("Desconectado de la base de datos")
}

test().catch(error => console.error(error))