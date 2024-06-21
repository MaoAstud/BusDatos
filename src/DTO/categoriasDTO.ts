export default class CategoriasDTO {
    id_categoria
    nombre
    descripcion
    padre_id
    source

    constructor(id_categoria:number, nombre:string, descripcion:string, padre_id:number, source:string) {
      this.id_categoria = id_categoria;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.padre_id = padre_id;
      this.source = source; // Source of the data: "adidas", "maoconn", or "nike"
    }
  }