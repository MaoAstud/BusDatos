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
interface ProductDTO {
    producto_id: number;
    nombre_producto: string;
    descripcion_producto: string;
    precio_unitario: number;
    id_categoria: number;
    talla_zapato: string;
    color_zapato: string;
    material_zapato: string;
    url_imagen: string;
    cantidad_inventario: number;
    fecha_creacion: Date;
    origen: string;  // Origen de la base de datos
}

// Funciones para interactuar con las APIs

export const getAllProducts = async (): Promise<ProductDTO[]> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/productos`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/Productos`);
    const maoconnClient = await getMaoconnClient();
    const [maoconnResponse] = await maoconnClient.ObtenerListaProductosAsync({});
    
    return [
        ...nikeResponse.data,
        ...adidasResponse.data,
        ...maoconnResponse.ObtenerListaProductosResult
    ];
};

export const getProductById = async (id: number): Promise<ProductDTO | null> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/productos/${id}`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/Productos/${id}`);
    const maoconnClient = await getMaoconnClient();
    const [maoconnResponse] = await maoconnClient.BuscarProductoPorIDAsync({ id_producto: id });

    return nikeResponse.data || adidasResponse.data || maoconnResponse.BuscarProductoPorIDResult || null;
};

export const createProduct = async (data: ProductDTO): Promise<ProductDTO> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.post(`${NIKE_API_URL}/productos`, data)).data;
        case 'adidas':
            return (await axios.post(`${ADIDAS_API_URL}/Productos`, data)).data;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            const [maoconnResponse] = await maoconnClient.AgregarNuevoProductoAsync({ product: data });
            return maoconnResponse.AgregarNuevoProductoResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const updateProduct = async (id: number, data: ProductDTO): Promise<ProductDTO | null> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.put(`${NIKE_API_URL}/productos/${id}`, data)).data;
        case 'adidas':
            return (await axios.put(`${ADIDAS_API_URL}/Productos/${id}`, data)).data;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            const [maoconnResponse] = await maoconnClient.ActualizarProductoAsync({ id_producto: id, product: data });
            return maoconnResponse.ActualizarProductoResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const deleteProduct = async (id: number, origen: string): Promise<void> => {
    switch(origen) {
        case 'nike':
            await axios.delete(`${NIKE_API_URL}/productos/${id}`);
            break;
        case 'adidas':
            await axios.delete(`${ADIDAS_API_URL}/Productos/${id}`);
            break;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            await maoconnClient.EliminarProductoAsync({ id_producto: id });
            break;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};
