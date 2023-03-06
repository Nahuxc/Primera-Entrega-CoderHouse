const express = require("express");
const routerProduct = express.Router();
const {ProductManager} = require("../controller/ProductManager")

routerProduct.get("/", async(req, res)=>{
    const product = await ProductManager.getProducts()
    const {limit} = req.query
    if(limit){
        res.json(product.slice(0, limit))
    }
    else{
        res.json(product)
    }
})

routerProduct.get("/:pid", async(req, res)=>{
    const products =  await ProductManager.getProducts()
    const {pid} = req.params
    const product = products.find(product => product.id == pid)
    if(product){
        res.status(200).json(product)
    }else{
        res.status(404).json({mensaje: "product not found"})
    }
})

routerProduct.post('/', async (req, res) => {
    try {
        const dato = req.body
        let response = await ProductManager.save(dato)
        if(response == undefined){
            res.status(404).json({ msg: `No se creo su Producto`})
        }else{
            res.status(200).json({ msg: `Nuevo producto guardado ID: ${response}`})
        }
    } catch (error) {
        res.status(404).json(error)
    }
});


/* deberas crear tu producto por postman y enviarlo, con los datos que pida:
        "id": 1,
        "title": "",
        "description": "",
        "price": ,
        "stock": ,
        "img": ""
*/
routerProduct.put("/:pid", async(req, res) =>{
    try {
        const {pid} = req.params
        const body = req.body
        let data = await ProductManager.updateProduct(pid, body)

        res.status(200).json(data);

    } catch (err) {
        res.status(404).json(err);
    }
})

routerProduct.delete("/:pid", async(req, res)=>{
    try {
        const {pid} = req.params
        await ProductManager.deleteById(+pid)

        res.status(200).json({ message: 'Producto eliminado' })

    } catch (err) {
        res.status(404).json(err)
    }

})



module.exports ={
    routerProduct
};