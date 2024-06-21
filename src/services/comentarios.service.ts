// src/services/commentService.ts
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
interface CommentDTO {
    comentario_id: number;
    texto: string;
    usuario_id: number;
    producto_id: number;
    origen:string;  // Origen de la base de datos
}

// Funciones para interactuar con las APIs

export const getAllComments = async (): Promise<CommentDTO[]> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/comentarios`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/ComentariosValoraciones`);
    //const maoconnClient = await getMaoconnClient();
    //const [maoconnResponse] = await maoconnClient.GetAllCommentsAsync({});

    return [
        ...nikeResponse.data,
        ...adidasResponse.data
        //...maoconnResponse.GetAllCommentsResult
    ];
};

export const getCommentById = async (id: number): Promise<CommentDTO | null> => {
    const nikeResponse = await axios.get(`${NIKE_API_URL}/comentarios/${id}`);
    const adidasResponse = await axios.get(`${ADIDAS_API_URL}/ComentariosValoraciones/${id}`);
    const maoconnClient = await getMaoconnClient();
    const [maoconnResponse] = await maoconnClient.BuscarComentarioPorIDAsync({ comentario_id: id });

    return nikeResponse.data || adidasResponse.data || maoconnResponse.BuscarComentarioPorIDResult || null;
};

export const createComment = async (data: CommentDTO): Promise<CommentDTO> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.post(`${NIKE_API_URL}/comentarios`, data)).data;
        case 'adidas':
            return (await axios.post(`${ADIDAS_API_URL}/ComentariosValoraciones`, data)).data;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            const [maoconnResponse] = await maoconnClient.AgregarNuevoComentarioAsync({ comment: data });
            return maoconnResponse.AgregarNuevoComentarioResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const updateComment = async (id: number, data: CommentDTO): Promise<CommentDTO | null> => {
    switch(data.origen) {
        case 'nike':
            return (await axios.put(`${NIKE_API_URL}/comentarios/${id}`, data)).data;
        case 'adidas':
            return (await axios.put(`${ADIDAS_API_URL}/ComentariosValoraciones/${id}`, data)).data;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            const [maoconnResponse] = await maoconnClient.ActualizarComentarioAsync({ comentario_id: id, comment: data });
            return maoconnResponse.ActualizarComentarioResult;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};

export const deleteComment = async (id: number, origen:string): Promise<void> => {
    switch(origen) {
        case 'nike':
            await axios.delete(`${NIKE_API_URL}/comentarios/${id}`);
            break;
        case 'adidas':
            await axios.delete(`${ADIDAS_API_URL}/ComentariosValoraciones/${id}`);
            break;
        case 'maoconn':
            const maoconnClient = await getMaoconnClient();
            await maoconnClient.EliminarComentarioAsync({ comentario_id: id });
            break;
        default:
            throw new Error('Origen de base de datos no soportado');
    }
};
