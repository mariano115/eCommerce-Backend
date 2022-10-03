class Producto {
  constructor(id, nombre, descripcion, codigo, foto, precio, stock) {
    this.id = id;
    this.timeStamp = Date.now();
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.foto = foto;
    this.precio = precio;
    this.stock = stock;
  }
}

module.exports = {
  Producto,
};
