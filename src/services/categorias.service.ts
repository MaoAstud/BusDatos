// src/services/categoryService.ts
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
interface CategoryDTO {
    id_categoria: number;
    nombre: string;
    descripcion: string;
    origen:string;  // Origen de la base de datos
}

// Funciones para interactuar con las APIs

export const getAllCategories = async (): Promise<CategoryDTO[]> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/categorias`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/Categorias`);
    const maoconnClient = await getMaoconnClient();
    const [maoconnResponse] = await maoconnClient.ObtenerListaCategoriasAsync({});

    return [
        ...nikeResponse.data,
        ...adidasResponse.data,
        ...maoconnResponse.ObtenerListaCategoriasResult
    ];
};

export const getCategoryById = async (id: number): Promise<CategoryDTO | null> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/categorias/${id}`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/Categorias/${id}`);
    const maoconnClient = await getMaoconnClient();
    const [maoconnResponse] = await maoconnClient.BuscarCategoriaPorIDAsync({ id_categoria: id });

    return nikeResponse.data || adidasResponse.data || maoconnResponse.BuscarCategoriaPorIDResult || null;
};

export const createCategory = async (data: CategoryDTO): Promise<CategoryDTO> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.post(`${NIKE_API_URL}/categorias`, data)).data;
        case 'adidas':
            return (await axios.post(`${ADIDAS_API_URL}/Categorias`, data)).data;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            const [maoconnResponse] = await maoconnClient.AgregarNuevoCategoriaAsync({ category: data });
            return maoconnResponse.AgregarNuevoCategoriaResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const updateCategory = async (id: number, data: CategoryDTO): Promise<CategoryDTO | null> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.put(`${NIKE_API_URL}/categorias/${id}`, data)).data;
        case 'adidas':
            return (await axios.put(`${ADIDAS_API_URL}/Categorias/${id}`, data)).data;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            const [maoconnResponse] = await maoconnClient.ActualizarCategoriaAsync({ id_categoria: id, category: data });
            return maoconnResponse.ActualizarCategoriaResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const deleteCategory = async (id: number, origen:string): Promise<void> => {
    switch(origen) {
        case 'nike':
            await axios.delete(`${NIKE_API_URL}/categorias/${id}`);
            break;
        case 'adidas':
            await axios.delete(`${ADIDAS_API_URL}/Categorias/${id}`);
            break;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            await maoconnClient.EliminarCategoriaAsync({ id_categoria: id });
            break;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};
