// src/services/cartDetailService.ts
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
interface CartDetailDTO {
    detalle_carrito_id: number;
    carrito_id: number;
    producto_id: number;
    cantidad: number;
    origen:string;  // Origen de la base de datos
}

// Funciones para interactuar con las APIs

export const getAllCartDetails = async (): Promise<CartDetailDTO[]> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/detalle`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/DetalleCarrito`);
    const maoconnClient = await getMaoconnClient();
    const [maoconnResponse] = await maoconnClient.ObtenerListaDetallesCarritoAsync({});

    return [
        ...nikeResponse.data,
        ...adidasResponse.data,
        ...maoconnResponse.ObtenerListaDetallesCarritoResult.DetalleCarritoDTO
    ];
};

export const getCartDetailById = async (id: number): Promise<CartDetailDTO | null> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/detalle/${id}`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/DetalleCarrito/${id}`);
    const maoconnClient = await getMaoconnClient();
    const [maoconnResponse] = await maoconnClient.BuscarDetallePorIDAsync({ detalle_carrito_id: id });

    return nikeResponse.data || adidasResponse.data || maoconnResponse.BuscarDetallePorIDResult || null;
};

export const createCartDetail = async (data: CartDetailDTO): Promise<CartDetailDTO> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.post(`${NIKE_API_URL}/detalle`, data)).data;
        case 'adidas':
            return (await axios.post(`${ADIDAS_API_URL}/DetalleCarrito`, data)).data;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            const [maoconnResponse] = await maoconnClient.AgregarNuevoDetalleAsync({ cartDetail: data });
            return maoconnResponse.AgregarNuevoDetalleResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const updateCartDetail = async (id: number, data: CartDetailDTO): Promise<CartDetailDTO | null> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.put(`${NIKE_API_URL}/detalle/${id}`, data)).data;
        case 'adidas':
            return (await axios.put(`${ADIDAS_API_URL}/DetalleCarrito/${id}`, data)).data;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            const [maoconnResponse] = await maoconnClient.ActualizarCategoriaDetalleAsync({ detalle_carrito_id: id, cartDetail: data });
            return maoconnResponse.ActualizarCategoriaDetalleResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const deleteCartDetail = async (id: number, origen: string): Promise<void> => {
    switch(origen) {
        case 'nike':
            await axios.delete(`${NIKE_API_URL}/detalle/${id}`);
            break;
        case 'adidas':
            await axios.delete(`${ADIDAS_API_URL}/DetalleCarrito/${id}`);
            break;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            await maoconnClient.EliminarDetalleAsync({ detalle_carrito_id: id });
            break;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};
