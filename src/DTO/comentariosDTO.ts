export default class ComentariosValoracionesDTO {
    id_comentario
    usuario_id
    producto_id
    comentario_texto
    rating
    comentario_fecha
    source

    constructor(id_comentario:number, usuario_id:number, producto_id:number, comentario_texto:string, rating:number, comentario_fecha:Date, source:string) {
      this.id_comentario = id_comentario;
      this.usuario_id = usuario_id;
      this.producto_id = producto_id;
      this.comentario_texto = comentario_texto;
      this.rating = rating;
      this.comentario_fecha = comentario_fecha;
      this.source = source; // Source of the data: "adidas", "maoconn", or "nike"
    }
  }