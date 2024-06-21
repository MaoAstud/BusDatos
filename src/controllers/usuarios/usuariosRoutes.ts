import { Router } from "express";
import * as userController from './usuariosController';

export class UsuarioRoutes{
    static get routes():Router {

        const router = Router();

        router.get('/', userController.getAllUsers);
        router.get('/:id', userController.getUserById);
        router.post('/', userController.createUser);
        router.put('/:id', userController.updateUser);
        router.delete('/:id/:origen', userController.deleteUser);

        return router;
    }
}