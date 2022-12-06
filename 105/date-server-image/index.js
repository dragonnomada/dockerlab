const http = require("http")

const years = Number(process.env.YEARS || "0")
const months = Number(process.env.MONTHS || "0")
const days = Number(process.env.DAYS || "0")
const hours = Number(process.env.HOURS || "0")
const minutes = Number(process.env.MINUTES || "0")
const seconds = Number(process.env.SECONDS || "0")

const server = http.createServer((request, response) => {
    const date = new Date()
    date.setFullYear(date.getFullYear() + years)
    date.setMonth(date.getMonth() + months)
    date.setDate(date.getDate() + days)
    date.setHours(date.getHours() + hours)
    date.setMinutes(date.getMinutes() + minutes)
    date.setSeconds(date.getSeconds() + seconds)
    response.writeHead(200, ["content-type", "text/plain"])
    response.write(date.toISOString())
    response.end()
})

server.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000")
})