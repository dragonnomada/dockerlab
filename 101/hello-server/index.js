const http = require("http")

const server = http.createServer((request, response) => {
    console.log(request.url)
    if (request.url === "/") {
        response.writeHead(200, ["content-type", "text/html"])
        response.write("<h1>Bienvenido</h1>")
        response.end()
    } else if (request.url === "/about") {
        response.writeHead(200, ["content-type", "text/html"])
        response.write("<h1>Nosotros somos ...</h1>")
        response.end()
    } else {
        response.writeHead(404, ["content-type", "text/plain"])
        response.write(`404 - Url not found (${request.url})`)
        response.end()
    }
})

server.listen(3000, "localhost", () => {
    console.log("Servidor iniciado en http://localhost:3000/")
})