export default class DetalleCarritoDTO {
    id_detalle
    carrito_id
    producto_id
    cantidad
    agregado_fecha
    source

    constructor(id_detalle:number, carrito_id:number, producto_id:number, cantidad:number, agregado_fecha:Date, source:string) {
      this.id_detalle = id_detalle;
      this.carrito_id = carrito_id;
      this.producto_id = producto_id;
      this.cantidad = cantidad;
      this.agregado_fecha = agregado_fecha;
      this.source = source; // Source of the data: "adidas", "maoconn", or "nike"
    }
  }
  