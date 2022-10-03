const express = require("express");
const carritoRouter = require("./router/carritoRouter");
const productosRouter = require("./router/productosRouter");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.on("error", (error) =>
  console.log({ mensaje: `Hubo un error: ${error.message}` })
);

app.use((req, res) => {
  res.status(404).send({
    error: -2,
    descripcion: `ruta ${req.originalUrl} no implementada`,
  });
});

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);
