// src/services/commentService.ts
import prisma from '../accesoDatos';

export const getAllComments = async (): Promise<any[]> => {
    return prisma.comentariosvaloraciones.findMany();
};

export const getCommentById = async (id: number): Promise<any | null> => {
    return prisma.comentariosvaloraciones.findUnique({
        where: { comentario_id: id },
    });
};

export const createComment = async (data: any): Promise<any> => {
    return prisma.comentariosvaloraciones.create({
        data,
    });
};

export const updateComment = async (id: number, data: any): Promise<any | null> => {
    return prisma.comentariosvaloraciones.update({
        where: { comentario_id: id },
        data,
    });
};

export const deleteComment = async (id: number): Promise<void> => {
    await prisma.comentariosvaloraciones.delete({
        where: { comentario_id: id },
    });
};
