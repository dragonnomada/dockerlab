const http = require("http")

const server = http.createServer((request, response) => {
    const env = JSON.stringify(process.env)
    response.writeHead(200, ["content-type", "application/json"])
    response.write(env)
    response.end()
})

server.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000")
})