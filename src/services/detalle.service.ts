// src/services/cartDetailService.ts
import prisma from '../accesoDatos';

export const getAllCartDetails = async (): Promise<any[]> => {
    return prisma.detallecarrito.findMany();
};

export const getCartDetailById = async (id: number): Promise<any | null> => {
    return prisma.detallecarrito.findUnique({
        where: { detalle_carrito_id: id },
    });
};

export const createCartDetail = async (data: any): Promise<any> => {
    return prisma.detallecarrito.create({
        data,
    });
};

export const updateCartDetail = async (id: number, data: any): Promise<any | null> => {
    return prisma.detallecarrito.update({
        where: { detalle_carrito_id: id },
        data,
    });
};

export const deleteCartDetail = async (id: number): Promise<void> => {
    await prisma.detallecarrito.delete({
        where: { detalle_carrito_id: id },
    });
};
