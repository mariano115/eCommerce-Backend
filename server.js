const express = require("express");
const carritoRouter = require("./router/carritoRouter");
const productosRouter = require("./router/productosRouter");

const app = express();
//REVISAR SI SACO ALGUNO DE ESTOS DEBAJO FUNCIONA
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);
