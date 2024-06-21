export default class UsuariosDTO {
    id_usuario
    nombre
    email
    telefono
    direccion
    registro_fecha
    source

    constructor(id_usuario:number, nombre:string, email:string, telefono:string, direccion:string, registro_fecha:Date, source:string) {
      this.id_usuario = id_usuario;
      this.nombre = nombre;
      this.email = email;
      this.telefono = telefono;
      this.direccion = direccion;
      this.registro_fecha = registro_fecha;
      this.source = source; // Source of the data: "adidas", "maoconn", or "nike"
    }
  }
  