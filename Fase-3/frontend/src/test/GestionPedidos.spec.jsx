import { render, screen, fireEvent } from '@testing-library/react'
import GestionPedidos from '../pages/admin/GestionPedidos.jsx'
import api from '../api/axiosConfig.js'

describe('Pruebas de Gestión de Pedidos', function () {

  // DATOS SIMULADOS PARA LAS PRUEBAS

  const pedidoPrueba = {
    id: 10,
    cliente: 'Cliente de Prueba',
    fechaPedido: '2026-11-15T18:30:00',
    estado: 'PENDIENTE',
    total: 25000,
    detalles: [
      {
        productoId: 1,
        nombre: 'Martillo',
        cantidad: 2,
        precioUnitario: 12500,
        subtotal: 25000
      }
    ]
  }

  // PRUEBA 1: MOSTRAR PEDIDOS

  it('debe mostrar los pedidos del backend', async function () {

    spyOn(api, 'get').and.returnValue(
      Promise.resolve({
        data: [pedidoPrueba]
      })
    )

    render(<GestionPedidos />)

    expect(
      await screen.findByText('Cliente de Prueba')
    ).toBeTruthy()

    expect(api.get).toHaveBeenCalledWith('/v1/pedidos')

  })

  // PRUEBA 2: MOSTRAR ERROR DEL SERVIDOR

  it('debe mostrar un error si el backend no responde', async function () {

    spyOn(api, 'get').and.returnValue(
      Promise.reject(new Error('Servidor no disponible'))
    )

    render(<GestionPedidos />)

    expect(
      await screen.findByText(
        /No fue posible cargar los pedidos/i
      )
    ).toBeTruthy()

  })

  // PRUEBA 3: CAMBIAR ESTADO

  it('debe cambiar el estado de un pedido', async function () {

    spyOn(api, 'get').and.returnValue(
      Promise.resolve({
        data: [pedidoPrueba]
      })
    )

    spyOn(api, 'patch').and.returnValue(
      Promise.resolve({
        data: {
          ...pedidoPrueba,
          estado: 'EN_PREPARACION'
        }
      })
    )

    render(<GestionPedidos />)

    await screen.findByText('Cliente de Prueba')

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Ver detalle'
      })
    )

    const selectores = screen.getAllByRole('combobox')

    fireEvent.change(selectores[1], {
      target: {
        value: 'EN_PREPARACION'
      }
    })

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Guardar estado'
      })
    )

    expect(
      await screen.findByText(
        'Estado actualizado correctamente.'
      )
    ).toBeTruthy()

    expect(api.patch).toHaveBeenCalledWith(
      '/v1/pedidos/10/estado',
      {
        estado: 'EN_PREPARACION'
      }
    )

  })

})