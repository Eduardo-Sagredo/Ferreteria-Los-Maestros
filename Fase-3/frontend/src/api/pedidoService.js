import api from './axiosConfig.js'

// REGISTRAR UNA COMPRA

export const crearPedido = async (productos) => {
    const respuesta = await api.post('/v1/pedidos', {
        productos
    });

    return respuesta.data;
};

// LISTAR TODOS LOS PEDIDOS

export const listarPedidos = async () => {
    const respuesta = await api.get('/v1/pedidos');

    return respuesta.data;
};

// CONSULTAR UN PEDIDO

export const obtenerPedido = async (id) => {
    const respuesta = await api.get(`/v1/pedidos/${id}`);

    return respuesta.data;
};

// CAMBIAR ESTADO DE UN PEDIDO

export const cambiarEstado = async (id, estado) => {
    const respuesta = await api.patch(
        `/v1/pedidos/${id}/estado`,
        { estado }
    );

    return respuesta.data;
};