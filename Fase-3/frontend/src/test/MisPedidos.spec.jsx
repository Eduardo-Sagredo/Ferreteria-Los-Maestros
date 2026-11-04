import { render, screen } from '@testing-library/react'
import MisPedidos from '../pages/MisPedidos.jsx'

describe('Pruebas de Mis Pedidos', function () {

  /*
     PRUEBA 1
  */
  it('debe mostrar los pedidos del cliente', function () {

    render(
      <MisPedidos />
    )

    expect(
      screen.getByText(/1001/)
    ).toBeTruthy()

    expect(
      screen.getByText(/1002/)
    ).toBeTruthy()

    expect(
      screen.getByText(/1003/)
    ).toBeTruthy()

  })


  /*
     PRUEBA 2
  */
  it('debe mostrar los estados de los pedidos', function () {

    render(
      <MisPedidos />
    )

    expect(
      screen.getByText('En preparación')
    ).toBeTruthy()

    expect(
      screen.getByText('En despacho')
    ).toBeTruthy()

    expect(
      screen.getByText('Entregado')
    ).toBeTruthy()

  })


  /*
     PRUEBA 3
  */
  it('debe mostrar los productos de los pedidos', function () {

    render(
      <MisPedidos />
    )

    expect(
      screen.getByText(/Taladro inalámbrico/)
    ).toBeTruthy()

    expect(
      screen.getByText(/Caja de tornillos/)
    ).toBeTruthy()

    expect(
      screen.getByText(/Pintura blanca/)
    ).toBeTruthy()

  })

})