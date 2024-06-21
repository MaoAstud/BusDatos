import axios from 'axios';
import { Client, createClientAsync } from 'soap';
import ADIDAS_URL from '../clients/restAdidasClient';
import NIKE_URL from '../clients/restNikeClient';
import WSDL_URL from '../clients/soapClient';

// Configuraciones de URLs
const NIKE_API_URL = NIKE_URL;
const ADIDAS_API_URL = ADIDAS_URL;

// Función para obtener el cliente SOAP
const getMaoconnClient = async (): Promise<Client> => {
    return await createClientAsync(WSDL_URL);
};

// DTOs
interface UserDTO {
    usuario_id: number;
    nombre: string;
    email: string;
    fecha_creacion: Date;
    origen: string;  // Origen de la base de datos
}

// Funciones para interactuar con las APIs

export const getAllUsers = async (): Promise<UserDTO[]> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/usuarios`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/Usuarios`);
    const maoconnClient = await getMaoconnClient();
    const [maoconnResponse] = await maoconnClient.ObtenerListaUsuariosAsync({});

    return [
        ...nikeResponse.data,
        ...adidasResponse.data,
        ...maoconnResponse.ObtenerListaUsuariosResult
    ];
};

export const getUserById = async (id: number): Promise<UserDTO | null> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/usuarios/${id}`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/Usuarios/${id}`);
    const maoconnClient = await getMaoconnClient();
    const [maoconnResponse] = await maoconnClient.BuscarUsuarioPorIDAsync({ id_usuario: id });

    return nikeResponse.data || adidasResponse.data || maoconnResponse.BuscarUsuarioPorIDResult || null;
};

export const createUser = async (data: UserDTO): Promise<UserDTO> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.post(`${NIKE_API_URL}/usuarios`, data)).data;
        case 'adidas':
            return (await axios.post(`${ADIDAS_API_URL}/Usuarios`, data)).data;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            const [maoconnResponse] = await maoconnClient.AgregarNuevoUsuarioAsync({ user: data });
            return maoconnResponse.AgregarNuevoUsuarioResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const updateUser = async (id: number, data: UserDTO): Promise<UserDTO | null> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.put(`${NIKE_API_URL}/usuarios/${id}`, data)).data;
        case 'adidas':
            return (await axios.put(`${ADIDAS_API_URL}/Usuarios/${id}`, data)).data;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            const [maoconnResponse] = await maoconnClient.ActualizarUsuarioAsync({ id_usuario: id, user: data });
            return maoconnResponse.ActualizarUsuarioResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const deleteUser = async (id: number, origen: string): Promise<void> => {
    switch(origen) {
        case 'nike':
            await axios.delete(`${NIKE_API_URL}/usuarios/${id}`);
            break;
        case 'adidas':
            await axios.delete(`${ADIDAS_API_URL}/Usuarios/${id}`);
            break;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            await maoconnClient.EliminarUsuarioAsync({ id_usuario: id });
            break;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};
