import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Carrito from '../pages/Carrito.jsx'
import MockDB from '../services/MockDB.js'
import productoService from '../api/productoService.js'
import api from '../api/axiosConfig.js'

describe('Pruebas del Carrito de Compras', function () {

  const productoPrueba = {
    id: 1,
    nombre: 'Martillo',
    precio: 12500,
    stockActual: 5,
    imagen: 'martillo.jpg'
  }

  // CONFIGURACIÓN DE LAS PRUEBAS

  beforeEach(function () {

    localStorage.clear()

    spyOn(productoService, 'obtenerTodos').and.returnValue(
      Promise.resolve([productoPrueba])
    )

    spyOn(MockDB, 'getCarrito').and.returnValue([
      { id: 1, cantidad: 2 }
    ])

    spyOn(MockDB, 'guardarCarrito')

  })

  // PRUEBA 1: MOSTRAR PRODUCTOS DEL CARRITO

  it('debe mostrar los productos del carrito', async function () {

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    )

    expect(
      await screen.findByText('Martillo')
    ).toBeTruthy()

    expect(productoService.obtenerTodos).toHaveBeenCalled()

    expect(
      screen.getByText('Stock disponible: 5')
    ).toBeTruthy()

  })

  // PRUEBA 2: VALIDAR STOCK DISPONIBLE

  it('no debe permitir cantidades superiores al stock', async function () {

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    )

    await screen.findByText('Martillo')

    fireEvent.change(
      screen.getByLabelText('Cantidad'),
      {
        target: {
          value: '10'
        }
      }
    )

    expect(
      screen.getByText(
        'La cantidad no puede superar el stock disponible.'
      )
    ).toBeTruthy()

    expect(MockDB.guardarCarrito).toHaveBeenCalledWith([
      { id: 1, cantidad: 5 }
    ])

  })

  // PRUEBA 3: EXIGIR INICIO DE SESIÓN

  it('no debe crear pedidos sin iniciar sesión', async function () {

    spyOn(api, 'post')

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    )

    await screen.findByText('Martillo')

    fireEvent.click(
      screen.getByLabelText('Débito')
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: /Registrar pedido/i
      })
    )

    expect(
      screen.getByText(
        'Debes iniciar sesión para realizar una compra.'
      )
    ).toBeTruthy()

    expect(api.post).not.toHaveBeenCalled()

  })

  // PRUEBA 4: REGISTRAR PEDIDO CORRECTAMENTE

  it('debe registrar un pedido mediante Spring Boot', async function () {

    localStorage.setItem('token', 'token-de-prueba')

    spyOn(api, 'post').and.returnValue(
      Promise.resolve({
        data: {
          id: 88,
          estado: 'PENDIENTE',
          total: 25000
        }
      })
    )

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    )

    await screen.findByText('Martillo')

    fireEvent.click(
      screen.getByLabelText('Débito')
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: /Registrar pedido/i
      })
    )

    expect(
      await screen.findByText(
        /Pedido #88 registrado correctamente/i
      )
    ).toBeTruthy()

    expect(api.post).toHaveBeenCalledWith(
      '/v1/pedidos',
      {
        productos: [
          {
            productoId: 1,
            cantidad: 2
          }
        ]
      }
    )

    expect(MockDB.guardarCarrito).toHaveBeenCalledWith([])

  })

  // PRUEBA 5: MANEJAR ERRORES DE STOCK DEL BACKEND

  it('debe mostrar un error cuando el backend rechaza el pedido', async function () {

    localStorage.setItem('token', 'token-de-prueba')

    spyOn(api, 'post').and.callFake(() =>
    Promise.reject({
        response: {
        status: 409,
        data: {
            mensaje: 'Stock insuficiente'
        }
        }
    })
    )

    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    )

    await screen.findByText('Martillo')

    fireEvent.click(
      screen.getByLabelText('Débito')
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: /Registrar pedido/i
      })
    )

    expect(
      await screen.findByText('Stock insuficiente')
    ).toBeTruthy()

    expect(MockDB.guardarCarrito).not.toHaveBeenCalledWith([])

  })

})