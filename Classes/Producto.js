import { v4 as uuidv4 } from "uuid";

class Producto {
  constructor(id, nombre, descripcion, codigo, foto, precio, stock) {
    this.id = id || uuidv4();
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
