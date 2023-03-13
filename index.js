const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const {routerCart} = require("./routes/cart.route")
const {routerProduct} = require("./routes/product.route")
const handlebars = require("express-handlebars")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
/* cookies */
app.use(cookieParser())

/* config handlebars */
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")


app.use(express.static(__dirname + "/public"))

/* routes */
app.use("/api/carts", routerCart)
app.use("/api/products", routerProduct)


/* handlebars */
app.get("/", (req, res)=>{
   res.render("index",{nombre: "nahuel"} )
})


app.use((err, req, res, next)=>{
    console.log({err});
    res.status(404).send({error: "error del servidor no controlado"})
})


const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`servidor funcionando en http://localhost:${PORT}`);
})