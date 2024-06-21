// src/services/categoryService.ts
import prisma from '../accesoDatos';

export const getAllCategories = async (): Promise<any[]> => {
    return prisma.categorias.findMany();
};

export const getCategoryById = async (id: number): Promise<any | null> => {
    return prisma.categorias.findUnique({
        where: { id_categoria: id },
    });
};

export const createCategory = async (data: any): Promise<any> => {
    return prisma.categorias.create({
        data,
    });
};

export const updateCategory = async (id: number, data: any): Promise<any | null> => {
    return prisma.categorias.update({
        where: { id_categoria: id },
        data,
    });
};

export const deleteCategory = async (id: number): Promise<void> => {
    await prisma.categorias.delete({
        where: { id_categoria: id },
    });
};
