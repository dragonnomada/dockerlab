const db = require("../services/db")
const producto = require("../services/producto")

async function test() {
    await db.connect()
    console.log("Conectado a la base de datos")

    {
        const productoX1 = await producto.agregarProducto("X:12345678", "Producto X1")
        if (productoX1.activo) {
            console.log("Producto X1 fue creado")
        }
    }
    
    {
        try {
            await producto.agregarProducto("@X:2342342342", "Producto X2") 
        } catch (error) {
            console.log(`${error}`)
        }
    }

    {
        try {
            await producto.agregarProducto("X:989993332", " Producto X3") 
        } catch (error) {
            console.log(`${error}`)
        }
    }
    
    {
        try {
            await producto.agregarProducto("X:12345678", " Producto X4") 
        } catch (error) {
            console.log(`${error}`)
        }
    }

    await db.close()
    console.log("Desconectado de la base de datos")
}

test().catch(error => console.error(error))