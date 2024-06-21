// src/controllers/commentController.ts
import { Request, Response } from 'express';
import * as commentService from '../../services/comentarios.service';

export const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await commentService.getAllComments();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comments' });
    }
};

export const getCommentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comment = await commentService.getCommentById(parseInt(id));
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comment' });
    }
};

export const createComment = async (req: Request, res: Response) => {
    try {
        const comment = await commentService.createComment(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Error creating comment' });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comment = await commentService.updateComment(parseInt(id), req.body);
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating comment' });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id, origen } = req.params;
        await commentService.deleteComment(parseInt(id), origen);
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting comment' });
    }
};
