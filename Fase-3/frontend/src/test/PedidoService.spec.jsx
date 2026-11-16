import api from '../api/axiosConfig.js'

import {
  crearPedido,
  listarPedidos,
  obtenerPedido,
  cambiarEstado
} from '../api/pedidoService.js'

describe('Pruebas del servicio de pedidos', function () {

  // PRUEBA 1: CREAR UN PEDIDO

  it('debe enviar los productos al backend', async function () {

    const productos = [
      { productoId: 1, cantidad: 2 }
    ]

    const pedidoSimulado = {
      id: 10,
      estado: 'PENDIENTE',
      total: 15000
    }

    spyOn(api, 'post').and.returnValue(
      Promise.resolve({ data: pedidoSimulado })
    )

    const resultado = await crearPedido(productos)

    expect(api.post).toHaveBeenCalledWith(
      '/v1/pedidos',
      { productos }
    )

    expect(resultado).toEqual(pedidoSimulado)

  })

  // PRUEBA 2: LISTAR PEDIDOS

  it('debe obtener todos los pedidos', async function () {

    const pedidosSimulados = [
      { id: 1, estado: 'PENDIENTE' },
      { id: 2, estado: 'ENTREGADO' }
    ]

    spyOn(api, 'get').and.returnValue(
      Promise.resolve({ data: pedidosSimulados })
    )

    const resultado = await listarPedidos()

    expect(api.get).toHaveBeenCalledWith('/v1/pedidos')

    expect(resultado.length).toBe(2)

  })

  // PRUEBA 3: CONSULTAR UN PEDIDO

  it('debe consultar un pedido por su ID', async function () {

    const pedidoSimulado = {
      id: 5,
      estado: 'PENDIENTE'
    }

    spyOn(api, 'get').and.returnValue(
      Promise.resolve({ data: pedidoSimulado })
    )

    const resultado = await obtenerPedido(5)

    expect(api.get).toHaveBeenCalledWith('/v1/pedidos/5')

    expect(resultado.id).toBe(5)

  })

  // PRUEBA 4: CAMBIAR ESTADO DEL PEDIDO

  it('debe actualizar el estado de un pedido', async function () {

    const pedidoActualizado = {
      id: 5,
      estado: 'EN_PREPARACION'
    }

    spyOn(api, 'patch').and.returnValue(
      Promise.resolve({ data: pedidoActualizado })
    )

    const resultado = await cambiarEstado(
      5,
      'EN_PREPARACION'
    )

    expect(api.patch).toHaveBeenCalledWith(
      '/v1/pedidos/5/estado',
      { estado: 'EN_PREPARACION' }
    )

    expect(resultado.estado).toBe('EN_PREPARACION')

  })

})