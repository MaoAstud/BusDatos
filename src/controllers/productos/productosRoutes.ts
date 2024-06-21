import { Router } from "express";
import * as productController from './productosController';

export class ProductosRoutes{
    static get routes():Router {

        const router = Router();

        router.get('/', productController.getAllProducts);
        router.get('/:id', productController.getProductById);
        router.post('/', productController.createProduct);
        router.put('/:id', productController.updateProduct);
        router.delete('/:id/:origen', productController.deleteProduct);

        return router;
    }
}