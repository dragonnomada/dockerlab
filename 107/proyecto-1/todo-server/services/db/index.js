const mysql = require("mysql2/promise")

const host = process.env.MYSQL_HOST || "localhost"
const port = process.env.MYSQL_PORT || "3306"
const database = process.env.MYSQL_DB || "test"
const user = process.env.MYSQL_USER || "root"
const password = process.env.MYSQL_PASSWORD || "password"

let connection = null

async function connect() {
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