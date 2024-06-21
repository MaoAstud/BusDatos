// src/controllers/cartController.ts
import { Request, Response } from 'express';
import * as cartService from '../../logicaNegocio/carrito.service';

export const getAllCarts = async (req: Request, res: Response) => {
    try {
        const carts = await cartService.getAllCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching carts' });
    }
};

export const getCartById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cart = await cartService.getCartById(parseInt(id));
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart' });
    }
};

export const createCart = async (req: Request, res: Response) => {
    try {
        const cart = await cartService.createCart(req.body);
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error creating cart' });
    }
};

export const updateCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cart = await cartService.updateCart(parseInt(id), req.body);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating cart' });
    }
};

export const deleteCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await cartService.deleteCart(parseInt(id));
        res.json({ message: 'Cart deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting cart' });
    }
};
