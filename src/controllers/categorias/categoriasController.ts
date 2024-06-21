// src/controllers/categoryController.ts
import { Request, Response } from 'express';
import * as categoryService from '../../services/categorias.service';

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories' });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(parseInt(id));
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category' });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error creating category' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await categoryService.updateCategory(parseInt(id), req.body);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating category' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id, origen } = req.params;
        await categoryService.deleteCategory(parseInt(id), origen);
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }
};
