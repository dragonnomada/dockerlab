const createServer = require("./lib/server")

const routes = require("./routes")

createServer(3001, "localhost", routes)
    .then(server => {
        // TODO: ...
    })
    .catch(error => {
        console.log(error)
    })