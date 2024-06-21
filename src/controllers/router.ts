import { Router } from "express";
import { UsuarioRoutes } from "../controllers/usuarios/usuariosRoutes";
import { CategoriasRoutes } from "../controllers/categorias/categoriasRoutes";
import { DetalleRoutes } from "../controllers/detalle/detalleRoutes";
import { ProductosRoutes } from "../controllers/productos/productosRoutes";
import { ComentariosRoutes } from "../controllers/comentarios/comentariosRoutes";
import { CarritoRoutes } from "../controllers/carritos/carritosRoutes";

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