const fs = require("fs");
const { Producto } = require("../Classes/Producto");

const getProductos = async () => {
  let productos;
  try {
    productos = JSON.parse(
      await fs.promises.readFile(`./productos.json`, "utf8")
    );
  } catch (error) {
    productos = [];
  }
  return productos;
};

const getProductosById = async (id) => {
  const carritos = await getProductos();
  return carritos.find((carrito) => carrito.id == id);
};

const crearProducto = async (nuevoProducto) => {
  console.log(nuevoProducto);
  try {
    let productoId;
    const productos = await getProductos();

    if (productos.length > 0) {
      productoId = productos[productos.length - 1].id + 1;
    } else {
      productoId = 1;
    }

    const producto = new Producto(
      productoId,
      nuevoProducto.nombre,
      nuevoProducto.descripcion,
      nuevoProducto.codigo,
      nuevoProducto.foto,
      nuevoProducto.precio,
      nuevoProducto.stock
    );
    productos.push(producto);

    await fs.promises.writeFile(
      `productos.json`,
      JSON.stringify(productos, null, 2)
    );

    return producto;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const editarProducto = async (id, product) => {
  const productos = await getProductos();
  try {
    /* Finding the index of the product to modify. */
    const indexToModify = productos.findIndex(
      (productToModify) => productToModify.id == id
    );
    if (indexToModify === -1) return false;
    /* Modifying the product in the array. */
    productos[indexToModify] = {
      ...productos[indexToModify],
      ...product,
    };
    await fs.promises.writeFile(
      `productos.json`,
      JSON.stringify(productos, null, 2)
    );
    return productos[indexToModify];
  } catch (error) {
    console.log(error);
    return false;
  }
};

const eliminarProducto = async (id) => {
  const productos = await getProductos();
  try {
    /* Finding the index of the product to modify. */
    const indexToDelete = productos.findIndex(
      (productToDelete) => productToDelete.id == id
    );
    if (indexToDelete === -1) return false;
    /* Modifying the product in the array. */
    productos.splice(indexToDelete, 1);
    await fs.promises.writeFile(
      `productos.json`,
      JSON.stringify(productos, null, 2)
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  getProductos,
  getProductosById,
  crearProducto,
  editarProducto,
  eliminarProducto,
};
