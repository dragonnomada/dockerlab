const mysql = require("mysql2/promise")

const host = process.env.DB_HOST || "localhost"
const port = process.env.DB_PORT || "3306"
const database = process.env.DB_NAME || "test"
const user = process.env.DB_USER || "root"
const password = process.env.DB_PASSWORD || "password"

let connection = null

async function connect() {
    console.log("Connecting to...", {
        host,
        port,
        database,
        user,
        password
    })

    connection = await mysql.createConnection({
        host,
        port,
        database,
        user,
        password
    })
    return connection
}

async function close() {
    await connection.end()
    await connection.destroy()
    connection = null
}

async function executeQuery(sql, params) {
    const [rows, _] = await connection.execute(sql, params)
    return rows
}

async function executeUpdate(sql, params) {
    const result = await connection.execute(sql, params)
    connection.commit()
    return result
}

module.exports = {
    isConnected() { return !!connection },
    getConnection() { return connection },
    connect,
    close,
    executeQuery,
    executeUpdate
}