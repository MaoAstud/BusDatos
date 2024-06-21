import { Router } from "express";
import { UsuarioRoutes } from "../controladores/usuarios/usuariosRoutes";
import { CategoriasRoutes } from "../controladores/categorias/categoriasRoutes";
import { DetalleRoutes } from "../controladores/detalle/detalleRoutes";
import { ProductosRoutes } from "../controladores/productos/productosRoutes";
import { ComentariosRoutes } from "../controladores/comentarios/comentariosRoutes";
import { CarritoRoutes } from "../controladores/carritos/carritosRoutes";

export class AppRoutes {
    static url:string = "/nike/api";
    static get routes():Router{

        const router = Router();
        
        router.use(`${this.url}/carrito`, CarritoRoutes.routes)
        router.use(`${this.url}/categorias`, CategoriasRoutes.routes)
        router.use(`${this.url}/comentarios`, ComentariosRoutes.routes)
        router.use(`${this.url}/detalle`, DetalleRoutes.routes)
        router.use(`${this.url}/productos`, ProductosRoutes.routes)
        router.use(`${this.url}/usuarios`, UsuarioRoutes.routes)

        return router;
    }
}