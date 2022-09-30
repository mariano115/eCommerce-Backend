const fs = require("fs");
const { Carrito } = require("../Classes/Carrito");

const getCarritos = async () => {
  let carritos;
  try {
    carritos = JSON.parse(await fs.promises.readFile(`./carrito.json`, "utf8"));
  } catch (error) {
    carritos = [];
  }
  return carritos;
};

const crearCarrito = async () => {
  try {
    let carritoId;
    const carritos = await getCarritos();

    if (carritos.length > 0) {
      carritoId = carritos[carritos.length - 1].id + 1;
    } else {
      carritoId = 1;
    }

    const carrito = new Carrito(carritoId);
    carritos.push(carrito);

    await fs.promises.writeFile(
      `carrito.json`,
      JSON.stringify(carritos, null, 2)
    );

    return carrito;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const vaciarEliminarCarrito = async (id) => {
  try {
    const carritos = await getCarritos();
    const carritoIndex = carritos.findIndex((carrito) => carrito.id == id);
    if (carritoIndex == -1) return false;
    await deleteCarritoById(carritoIndex);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteCarritoById = async (carritoIndex) => {
  try {
    let carritos = await getCarritos();

    carritos.splice(carritoIndex, 1);

    await fs.promises.writeFile(
      `./carrito.json`,
      JSON.stringify(carritos, null, 2)
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getProductosByIdOfCarrito = async (id) => {
  const carritos = await getCarritos();
  const carrito = carritos.find((carrito) => carrito.id == id);
  if (carrito) {
    return carrito.productos;
  } else {
    return false;
  }
};

const addProductosByIdOfCarrito = async (id, producto) => {
  try {
    const carritos = await getCarritos();
    const carritoIndex = carritos.findIndex((carrito) => carrito.id == id);
    if (carritoIndex == -1) return false;
    carritos[carritoIndex].productos.push(producto);
    await fs.promises.writeFile(
      `./carrito.json`,
      JSON.stringify(carritos, null, 2)
    );
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteProductosByIdOfCarritoAndIdProduct = async (id, idProducto) => {
  try {
    const carritos = await getCarritos();
    const carritoIndex = carritos.findIndex((carrito) => {
      return carrito.id == id;
    });
    if (carritoIndex == -1) return false;
    const productoToDeleteIndex = carritos[carritoIndex].productos.findIndex(
      (producto) => producto.id == idProducto
    );
    if (productoToDeleteIndex == -1) return false;
    carritos[carritoIndex].productos.splice(productoToDeleteIndex, 1);
    await fs.promises.writeFile(
      `./carrito.json`,
      JSON.stringify(carritos, null, 2)
    );
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getCarritos,
  crearCarrito,
  vaciarEliminarCarrito,
  getProductosByIdOfCarrito,
  addProductosByIdOfCarrito,
  deleteProductosByIdOfCarritoAndIdProduct,
};
