const crypto = require("crypto")

const db = require("../db")

async function signIn(username, password) {
    let [user] = await db.executeQuery(
        "select * from users where username=? and passwd=? limit 1",
        [username, password]
    )

    if (!user) throw new Error(`Credenciales no válidas para ${username} (using password: ${!!password})`)

    user = await refreshToken(username, user.token)

    const result =  await db.executeUpdate(
        "update users set signin_at=now(), update_at=now() where id=?",
        [user.id]
    )

    // console.log(result)

    return await getUserById(user.id)
}

async function signOut(username, token) {
    const [user] = await db.executeQuery(
        "select * from users where username=? and token=? limit 1",
        [username, token]
    )

    if (!user) throw new Error(`Credenciales no válidas para ${username} (using token: ${!!token})`)

    await refreshToken(username, token)

    const result =  await db.executeUpdate(
        "update users set signout_at=now(), update_at=now() where id=?",
        [user.id]
    )

    // console.log(result)

    return await getUserById(user.id)
}

async function getUserById(id) {
    const [user] = await db.executeQuery(
        "select * from users where id=? limit 1",
        [id]
    )
    delete user.passwd
    return user
}

async function verifyToken(username, token) {
    const [user] = await db.executeQuery(
        "select * from users where username=? and token=? limit 1",
        [username, token]
    )

    if (!user) throw new Error(`Credenciales no válidas para ${username} (using token: ${!!token})`)

    return user
}

async function refreshToken(username, token) {
    const [user] = await db.executeQuery(
        "select * from users where username=? and token=? limit 1",
        [username, token]
    )

    if (!user) throw new Error(`Credenciales no válidas para ${username} (using token: ${!!token})`)

    const newToken = crypto.randomUUID()

    const result =  await db.executeUpdate(
        "update users set token=?, update_at=now() where id=?",
        [newToken, user.id]
    )

    // console.log(result)

    return await getUserById(user.id)
}

module.exports = {
    signIn,
    signOut,
    getUserById,
    refreshToken,
    verifyToken
}