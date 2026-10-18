import { render, screen } from '@testing-library/react'
import CuentaCorriente from './CuentaCorriente.jsx'

describe('Pruebas de Cuenta Corriente', function () {

  /*
     PRUEBA 1
  */
  it('debe mostrar la información de la cuenta', function () {

    render(
      <CuentaCorriente />
    )

    expect(
      screen.getByText('Cuenta Corriente')
    ).toBeTruthy()

    expect(
      screen.getByText('Manuel Flores Rojas')
    ).toBeTruthy()

    expect(
      screen.getByText('Activa')
    ).toBeTruthy()

    expect(
      screen.getByText('$300.000')
    ).toBeTruthy()

  })


  /*
     PRUEBA 2
  */
  it('debe mostrar el saldo pendiente', function () {

    render(
      <CuentaCorriente />
    )

    expect(
      screen.getByText('Saldo pendiente')
    ).toBeTruthy()

    expect(
      screen.getByText('$85.480')
    ).toBeTruthy()

  })


  /*
     PRUEBA 3
  */
  it('debe mostrar los movimientos pendientes', function () {

    render(
      <CuentaCorriente />
    )

    expect(
      screen.getByText('Compra pedido #1001')
    ).toBeTruthy()

    expect(
      screen.getByText('Compra pedido #1002')
    ).toBeTruthy()

    expect(
      screen.getByText('$72.980')
    ).toBeTruthy()

    expect(
      screen.getByText('$12.500')
    ).toBeTruthy()

    const estadosPendientes =
      screen.getAllByText('Pendiente')

    expect(
      estadosPendientes.length
    ).toBe(2)

  })

})