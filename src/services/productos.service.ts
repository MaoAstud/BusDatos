import prisma from '../accesoDatos';

export const getAllProducts = async (): Promise<any[]> => {
    return prisma.productos.findMany();
};

export const getProductById = async (id: number): Promise<any | null> => {
    return prisma.productos.findUnique({
        where: { producto_id: id },
    });
};

export const createProduct = async (data: any): Promise<any> => {
    return prisma.productos.create({
        data,
    });
};

export const updateProduct = async (id: number, data: any): Promise<any | null> => {
    return prisma.productos.update({
        where: { producto_id: id },
        data,
    });
};

export const deleteProduct = async (id: number): Promise<void> => {
    await prisma.productos.delete({
        where: { producto_id: id },
    });
};
