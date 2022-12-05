module.exports = (response) => {
    response.writeHead(200, ["content-type", "text/html"])
    response.write("<h1>Nosotros somos ...</h1>")
    response.end()
}