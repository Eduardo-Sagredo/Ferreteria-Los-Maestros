import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import InicioSesion from '../pages/InicioSesion.jsx'

describe('Pruebas del inicio de sesión', function () {

  beforeEach(function () {

    localStorage.clear()

    const usuariosPrueba = [
      {
        rut: '12345678K',
        nombre: 'Manuel',
        apellidos: 'Flores Rojas',
        correo: 'prueba@gmail.com',
        contrasena: '123456'
      }
    ]

    localStorage.setItem(
      'usuarios',
      JSON.stringify(usuariosPrueba)
    )

  })


  /*
     PRUEBA 1
  */
  it('debe iniciar sesión con credenciales correctas', function () {

    render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
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
      screen.getByLabelText('Contraseña'),
      {
        target: {
          value: '123456'
        }
      }
    )

    fireEvent.click(
      screen.getByRole(
        'button',
        {
          name: 'Iniciar sesión'
        }
      )
    )

    expect(
      screen.getByText(
        'Inicio de sesión validado correctamente.'
      )
    ).toBeTruthy()

    const usuarioSesion =
      JSON.parse(
        localStorage.getItem('usuarioSesion')
      )

    expect(
      usuarioSesion.correo
    ).toBe('prueba@gmail.com')

  })


  /*
     PRUEBA 2
  */
  it('no debe iniciar sesión con contraseña incorrecta', function () {

    render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
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
      screen.getByLabelText('Contraseña'),
      {
        target: {
          value: '999999'
        }
      }
    )

    fireEvent.click(
      screen.getByRole(
        'button',
        {
          name: 'Iniciar sesión'
        }
      )
    )

    expect(
      screen.getByText(
        'La contraseña ingresada es incorrecta.'
      )
    ).toBeTruthy()

    expect(
      localStorage.getItem('usuarioSesion')
    ).toBeNull()

  })


  /*
     PRUEBA 3
  */
  it('no debe iniciar sesión con un correo no registrado', function () {

    render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
    )

    fireEvent.change(
      screen.getByLabelText('Correo electrónico'),
      {
        target: {
          value: 'noexiste@gmail.com'
        }
      }
    )

    fireEvent.change(
      screen.getByLabelText('Contraseña'),
      {
        target: {
          value: '123456'
        }
      }
    )

    fireEvent.click(
      screen.getByRole(
        'button',
        {
          name: 'Iniciar sesión'
        }
      )
    )

    expect(
      screen.getByText(
        'No existe un usuario registrado con este correo.'
      )
    ).toBeTruthy()

    expect(
      localStorage.getItem('usuarioSesion')
    ).toBeNull()

  })

})