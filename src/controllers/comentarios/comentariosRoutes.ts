import { Router } from "express";
import * as commentController from './comentariosController';

export class ComentariosRoutes{
    static get routes():Router {

        const router = Router();

        router.get('/', commentController.getAllComments);
        router.get('/:id', commentController.getCommentById);
        router.post('/', commentController.createComment);
        router.put('/:id', commentController.updateComment);
        router.delete('/:id', commentController.deleteComment);

        return router;
    }
}