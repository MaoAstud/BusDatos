// src/services/cartService.ts
import axios from 'axios';
import { Client, createClientAsync } from 'soap';
import WSDL_URL from '../clients/soapClient';
import NIKE_URL from '../clients/restNikeClient';
import ADIDAS_URL from '../clients/restAdidasClient';

// Configuraciones de URLs
const NIKE_API_URL = NIKE_URL;
const ADIDAS_API_URL = ADIDAS_URL;

// Función para obtener el cliente SOAP
const getMaoconnClient = async (): Promise<Client> => {
    return await createClientAsync(WSDL_URL);
};

// DTOs
interface CartDTO {
    carrito_id: number;
    usuario_id: number;
    productos: any[];
    fecha_creacion: Date;
    origen:string;  // Origen de la base de datos
}

// Funciones para interactuar con las APIs

export const getAllCarts = async (): Promise<CartDTO[]> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/carrito`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/CarritoCompras`);
    // const maoconnClient = await getMaoconnClient();
    // const [maoconnResponse] = await maoconnClient.GetAllCartsAsync({});

    return [
        ...nikeResponse.data,
        ...adidasResponse.data,
        // ...maoconnResponse.GetAllCartsResult
    ];
};

export const getCartById = async (id: number): Promise<CartDTO | null> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/carrito/${id}`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/CarritoCompras/${id}`);
    // const maoconnClient = await getMaoconnClient();
    // const [maoconnResponse] = await maoconnClient.GetCartByIdAsync({ id_carrito: id });

    return nikeResponse.data || adidasResponse.data || null; //|| maoconnResponse.GetCartByIdResult 
};

export const createCart = async (data: CartDTO): Promise<CartDTO> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.post(`${NIKE_API_URL}/carrito`, data)).data;
        case 'adidas':
            return (await axios.post(`${ADIDAS_API_URL}/CarritoCompras`, data)).data;
        // case 'maoconn':
        //     const maoconnClient = await getMaoconnClient();
        //     const [maoconnResponse] = await maoconnClient.CreateCartAsync({ cart: data });
        //     return maoconnResponse.CreateCartResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const updateCart = async (id: number, data: CartDTO): Promise<CartDTO | null> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.put(`${NIKE_API_URL}/carrito/${id}`, data)).data;
        case 'adidas':
            return (await axios.put(`${ADIDAS_API_URL}/CarritoCompras/${id}`, data)).data;
        // case 'maoconn':
        //     const maoconnClient = await getMaoconnClient();
        //     const [maoconnResponse] = await maoconnClient.UpdateCartAsync({ id_carrito: id, cart: data });
        //     return maoconnResponse.UpdateCartResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const deleteCart = async (id: number, origen:string): Promise<void> => {
    switch(origen) {
        case 'nike':
            await axios.delete(`${NIKE_API_URL}/carrito/${id}`);
            break;
        case 'adidas':
            await axios.delete(`${ADIDAS_API_URL}/CarritoCompras/${id}`);
            break;
        // case 'maoconn':
        //     const maoconnClient = await getMaoconnClient();
        //     await maoconnClient.DeleteCartAsync({ id_carrito: id });
        //     break;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};
