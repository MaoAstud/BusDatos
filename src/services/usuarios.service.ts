import prisma from '../accesoDatos';

export const getAllUsers = async (): Promise<any[]> => {
    return prisma.usuarios.findMany();
};

export const getUserById = async (id: number): Promise<any | null> => {
    return prisma.usuarios.findUnique({
        where: { usuario_id: id },
    });
};

export const createUser = async (data: any): Promise<any> => {
    return prisma.usuarios.create({
        data,
    });
};

export const updateUser = async (id: number, data: any): Promise<any | null> => {
    return prisma.usuarios.update({
        where: { usuario_id: id },
        data,
    });
};

export const deleteUser = async (id: number): Promise<void> => {
    await prisma.usuarios.delete({
        where: { usuario_id: id },
    });
};
