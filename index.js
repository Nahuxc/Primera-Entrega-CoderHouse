const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const {routerCart} = require("./routes/cart.route")
const {routerProduct} = require("./routes/product.route")
const {uploader} = require("./utils/uploader")

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))

app.use("/api/carts", routerCart)
app.use("/api/products", routerProduct)

app.use((err, req, res, next)=>{
    console.log({err});
    res.status(404).send({error: "error del servidor no controlado"})
})

app.post("/file", uploader.single("file"), (req, res)=>{
    res.send(req.file)
})

const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`servidor funcionando en http://localhost:${PORT}`);
})