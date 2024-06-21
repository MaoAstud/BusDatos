import { Router } from "express";
import * as cartController from './carritosController';

export class CarritoRoutes{
    static get routes():Router {

        const router = Router();

        router.get('/', cartController.getAllCarts);
        router.get('/:id', cartController.getCartById);
        router.post('/', cartController.createCart);
        router.put('/:id', cartController.updateCart);
        router.delete('/:id', cartController.deleteCart);

        return router;
    }
}