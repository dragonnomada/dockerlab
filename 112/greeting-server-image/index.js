const http = require("http")

const greeting = require("./greeting")

// if (process.env.SECRET !== "ABC1234556") {
//     console.log("La llave de ejecución es incorrecta")
//     process.exit(1)
// }

const server = http.createServer((request, response) => {
    const output = greeting(`${request.method} ${request.url}`)
    response.writeHead(200, ["content-type", "text/plain"])
    response.write(output)
    response.end()
})

server.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000")
})