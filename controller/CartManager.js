const fs = require('fs');
const path = require('path')
const filepath = path.resolve(__dirname, "../database/cart.json")
const { ProductManager } = require("../controller/ProductManager")

class Contenedor {
    constructor(path) {
        this.path = path;
        
    }

    async validateExistFile() {
        try {
            await fs.promises.stat(`${this.path}`)
        } catch (err) {
            await fs.promises.writeFile(`${this.path}`, JSON.stringify([]));
        }
    }

    async readFileFn() {
        await this.validateExistFile();
        const contenido = await fs.promises.readFile(`${this.path}`, 'utf-8');
        return JSON.parse(contenido);
    }

    async writeProducts(productos) {
        await this.validateExistFile();
        const data = JSON.stringify(productos, null, 4)
        await fs.promises.writeFile(this.path, data)
    }

    async exists(id) {
        const data = await this.getAllProdInCart()
        const prod = data.find(product => product.productoCart.id == id)
        return prod
    }

    async getAllProdInCart() {
        try {
            const data = await this.readFileFn();
            return data

        } catch {
            console.log('Error al obtener todos los datos del carrito');
        }
    }

    async addProdInCart(prodId) {
        try {
            const data = await this.readFileFn()

            const productos = await ProductManager.getProducts()
            const productoId = productos.findIndex(producto => producto.id == prodId)
            const prod = productos[productoId]
            const prodCart = prod


            data.push(prodCart)

            await this.writeProducts(data)

            return 'Producto agregado!';
        } catch (err) {
            throw new Error("No se pudo agregar el producto al carrito", err)
        }
    }
}

const instanciaCartApi = new Contenedor(filepath)

module.exports = {
    CartManager: instanciaCartApi
}