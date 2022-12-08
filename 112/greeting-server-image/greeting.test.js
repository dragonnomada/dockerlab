const { it, describe } = require("node:test");

const greeting = require("./greeting")

describe("Greeting lib test", () => {
    it("Check greeting output none", () => {
        const output = greeting()

        output === `Hello, You say: "undefined"` || (() => {
            throw new Error(`Invalid output: ${output}`)
        })()
    })

    it("Check greeting output with message", () => {
        const output = greeting("abc 123")

        output === `Hello, You say: "abc 123"` || (() => {
            throw new Error(`Invalid output: ${output}`)
        })()
    })
})

describe("Demo test", () => {
    it("Check for fail", () => {
        throw new Error(`Invalid test`)
    })
})