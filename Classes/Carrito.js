class Carrito {
  constructor(id, productos = []) {
    this.id = id;
    this.timeStamp = Date.now();
    this.productos = productos;
  }
}

module.exports = {
  Carrito,
};
