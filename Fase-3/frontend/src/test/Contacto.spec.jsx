import { render, screen, fireEvent } from '@testing-library/react'
import Contacto from '../pages/Contacto.jsx'

describe('Pruebas del formulario de contacto', function () {

  /*
     PRUEBA 1
  */
  it('debe enviar el mensaje correctamente con datos válidos', function () {

    render(
      <Contacto />
    )

    fireEvent.change(
      screen.getByLabelText('Nombre'),
      {
        target: {
          value: 'Manuel'
        }
      }
    )

    fireEvent.change(
      screen.getByLabelText('Correo electrónico'),
      {
        target: {
          value: 'prueba@gmail.com'
        }
      }
    )

    fireEvent.change(
      screen.getByLabelText('Comentario'),
      {
        target: {
          value: 'Necesito información sobre un producto.'
        }
      }
    )

    fireEvent.click(
      screen.getByRole(
        'button',
        {
          name: 'Enviar mensaje'
        }
      )
    )

    expect(
      screen.getByText(
        'Mensaje enviado correctamente.'
      )
    ).toBeTruthy()

  })


  /*
     PRUEBA 2
  */
  it('debe mostrar errores si se intenta enviar el formulario vacío', function () {

    render(
      <Contacto />
    )

    fireEvent.click(
      screen.getByRole(
        'button',
        {
          name: 'Enviar mensaje'
        }
      )
    )

    expect(
      screen.getByText(
        'El nombre es obligatorio.'
      )
    ).toBeTruthy()

    expect(
      screen.getByText(
        'El correo es obligatorio.'
      )
    ).toBeTruthy()

    expect(
      screen.getByText(
        'El comentario es obligatorio.'
      )
    ).toBeTruthy()

  })


  /*
     PRUEBA 3
  */
  it('no debe aceptar un correo con dominio no permitido', function () {

    render(
      <Contacto />
    )

    fireEvent.change(
      screen.getByLabelText('Nombre'),
      {
        target: {
          value: 'Manuel'
        }
      }
    )

    fireEvent.change(
      screen.getByLabelText('Correo electrónico'),
      {
        target: {
          value: 'prueba@hotmail.com'
        }
      }
    )

    fireEvent.change(
      screen.getByLabelText('Comentario'),
      {
        target: {
          value: 'Consulta de prueba.'
        }
      }
    )

    fireEvent.click(
      screen.getByRole(
        'button',
        {
          name: 'Enviar mensaje'
        }
      )
    )

    expect(
      screen.getByText(
        'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'
      )
    ).toBeTruthy()

  })

})