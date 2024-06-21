import { Router } from "express";
import * as categoryController from './categoriasController';

export class CategoriasRoutes{
    static get routes():Router {

        const router = Router();

        router.get('/', categoryController.getAllCategories);
        router.get('/:id', categoryController.getCategoryById);
        router.post('/', categoryController.createCategory);
        router.put('/:id', categoryController.updateCategory);
        router.delete('/:id/:origen', categoryController.deleteCategory);

        return router;
    }
}