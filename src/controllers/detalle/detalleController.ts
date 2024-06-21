// src/controllers/cartDetailController.ts
import { Request, Response } from 'express';
import * as cartDetailService from '../../services/detalle.service';

export const getAllCartDetails = async (req: Request, res: Response) => {
    try {
        const cartDetails = await cartDetailService.getAllCartDetails();
        res.json(cartDetails);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart details' });
    }
};

export const getCartDetailById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cartDetail = await cartDetailService.getCartDetailById(parseInt(id));
        if (cartDetail) {
            res.json(cartDetail);
        } else {
            res.status(404).json({ error: 'Cart detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart detail' });
    }
};

export const createCartDetail = async (req: Request, res: Response) => {
    try {
        const cartDetail = await cartDetailService.createCartDetail(req.body);
        res.status(201).json(cartDetail);
    } catch (error) {
        res.status(500).json({ error: 'Error creating cart detail' });
    }
};

export const updateCartDetail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cartDetail = await cartDetailService.updateCartDetail(parseInt(id), req.body);
        if (cartDetail) {
            res.json(cartDetail);
        } else {
            res.status(404).json({ error: 'Cart detail not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating cart detail' });
    }
};

export const deleteCartDetail = async (req: Request, res: Response) => {
    try {
        const { id, origen } = req.params;
        await cartDetailService.deleteCartDetail(parseInt(id), origen);
        res.json({ message: 'Cart detail deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting cart detail' });
    }
};
