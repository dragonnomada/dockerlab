const http = require("http")

module.exports = async (port, host, routes) => {
    const server = http.createServer((request, response) => {
        for (let [route, handler] of Object.entries(routes)) {
            if (request.url === route) {
                handler(response)
                return
            }
        }
        response.writeHead(404, ["content-type", "text/plain"])
        response.write(`404 - Not found (${request.url})`)
        response.end()
    })
    return await new Promise(resolve => {
        server.listen(port, host, () => {
            console.log(`Servidor iniciado en http://${host}:${port}/`)
            resolve(server)
        })
    })
}