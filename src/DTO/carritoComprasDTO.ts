export default class CarritoComprasDTO {
    
    id_carrito:number
    usuario_id:number
    fecha_creacion:Date
    source:string

    constructor(id_carrito:number, usuario_id:number, fecha_creacion:Date, source:string) {
      this.id_carrito = id_carrito;
      this.usuario_id = usuario_id; 
      this.fecha_creacion = fecha_creacion;
      this.source = source; // Source of the data: "adidas", "maoconn", or "nike"
    }
  }