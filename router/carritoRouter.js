const router = require("express").Router();
const PersistenceCarrito = require("../Data/PersistenceCarrito");

router.get("/", async (req, res) => {
  res.status(200).send(await PersistenceCarrito.getCarritos());
});

router.post("/", async (req, res) => {
  res.status(201).send(await PersistenceCarrito.crearCarrito());
});

router.delete("/:id", async (req, res) => {
  if (await PersistenceCarrito.vaciarEliminarCarrito(req.params.id)) {
    res
      .status(200)
      .send(`el producto con id ${req.params.id} fue eliminado correctamente`);
  } else {
    res
      .status(500)
      .send(`el producto con id ${req.params.id} no pudo ser eliminado`);
  }
});

router.get("/:id/productos", async (req, res) => {
  const response = await PersistenceCarrito.getProductosByIdOfCarrito(
    req.params.id
  );
  if (response) {
    res.status(200).send(response);
  } else {
    res.status(500).send(`el carrito no fue encontrado`);
  }
});

router.post("/:id/productos", async (req, res) => {
  const response = await PersistenceCarrito.addProductosByIdOfCarrito(
    req.params.id,
    req.body
  );
  if (response) {
    res
      .status(200)
      .send("el producto fue agregado en el carrito correctamente");
  } else {
    res.status(500).send(`el carrito no fue encontrado`);
  }
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.id_prod);
  const response =
    await PersistenceCarrito.deleteProductosByIdOfCarritoAndIdProduct(
      req.params.id,
      req.params.id_prod
    );
  if (response) {
    res.status(200).send("el producto fue eliminado del carrito correctamente");
  } else {
    res.status(500).send(`error al eliminar el producto`);
  }
});

module.exports = router;
