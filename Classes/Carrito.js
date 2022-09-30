class Carrito {
  constructor(id, productos = []) {
    this.id = id;
    this.timeStamp = Date.now();
    this.productos = productos;
  }

  addProducto = (producto) => {
    this.productos.push(producto);
  };

  vaciarCarrito = () => {
    this.productos = [];
  };

  listarProductos = () => {
    return this.productos;
  };

  deleteProducto = (id) => {
    this.productos = this.productos.filter((producto) => producto.id !== id);
  };
}

module.exports = {
  Carrito,
};
