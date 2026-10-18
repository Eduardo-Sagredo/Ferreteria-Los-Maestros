import { render, screen } from '@testing-library/react'
import Historial from './Historial.jsx'

describe('Pruebas del Historial de Compras', function () {

  /*
     PRUEBA 1
  */
  it('debe mostrar el historial de compras', function () {

    render(
      <Historial />
    )

    expect(
      screen.getByText('Historial de Compras')
    ).toBeTruthy()

    expect(
      screen.getByText(
        'Revisa tus compras anteriores.'
      )
    ).toBeTruthy()

  })


  /*
     PRUEBA 2
  */
  it('debe mostrar los pedidos del historial', function () {

    render(
      <Historial />
    )

    expect(
      screen.getByText(/1003/)
    ).toBeTruthy()

    expect(
      screen.getByText(/0998/)
    ).toBeTruthy()

    expect(
      screen.getByText(/0985/)
    ).toBeTruthy()

    expect(
      screen.getByText(/0972/)
    ).toBeTruthy()

  })


  /*
     PRUEBA 3
  */
  it('debe mostrar productos y totales de las compras', function () {

    render(
      <Historial />
    )

    expect(
      screen.getByText(
        '2 brochas, 1 galón de pintura'
      )
    ).toBeTruthy()

    expect(
      screen.getByText(
        '1 serrucho, 1 cinta métrica'
      )
    ).toBeTruthy()

    expect(
      screen.getByText('$32.990')
    ).toBeTruthy()

    expect(
      screen.getByText('$89.990')
    ).toBeTruthy()

  })

})