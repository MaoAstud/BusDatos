import { Router } from "express";
import * as cartDetailController  from './detalleController';

export class DetalleRoutes{
    static get routes():Router {

        const router = Router();

        router.get('/', cartDetailController.getAllCartDetails);
        router.get('/:id', cartDetailController.getCartDetailById);
        router.post('/', cartDetailController.createCartDetail);
        router.put('/:id', cartDetailController.updateCartDetail);
        router.delete('/:id/:origen', cartDetailController.deleteCartDetail);

        return router;
    }
}