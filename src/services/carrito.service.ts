// src/services/cartService.ts
import prisma from '../accesoDatos';

export const getAllCarts = async (): Promise<any[]> => {
    return prisma.carritocompras.findMany();
};

export const getCartById = async (id: number): Promise<any | null> => {
    return prisma.carritocompras.findUnique({
        where: { carrito_id: id },
    });
};

export const createCart = async (data: any): Promise<any> => {
    return prisma.carritocompras.create({
        data,
    });
};

export const updateCart = async (id: number, data: any): Promise<any | null> => {
    return prisma.carritocompras.update({
        where: { carrito_id: id },
        data,
    });
};

export const deleteCart = async (id: number): Promise<void> => {
    await prisma.carritocompras.delete({
        where: { carrito_id: id },
    });
};
