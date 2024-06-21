export default class ProductosDTO {
    id_producto
    nombre
    descripcion
    precio
    categoria_id
    talla
    color
    material
    imagen
    stock
    fecha_registro
    source

    constructor(id_producto:number, nombre:string, descripcion:string, precio:number, categoria_id:number, talla:string, color:string, material:string, imagen:string, stock:number, fecha_registro:Date, source:string) {
      this.id_producto = id_producto;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = precio;
      this.categoria_id = categoria_id;
      this.talla = talla;
      this.color = color;
      this.material = material;
      this.imagen = imagen;
      this.stock = stock;
      this.fecha_registro = fecha_registro;
      this.source = source; // Source of the data: "adidas", "maoconn", or "nike"
    }
  }
  