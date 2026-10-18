import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Registro from './Registro.jsx'

describe('Pruebas del registro de usuario', function () {

  beforeEach(function () {
    localStorage.clear()
  })


  /*
     PRUEBA 1
  */
  it('debe registrar un usuario correctamente', function () {

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    )

    fireEvent.change(
      screen.getByLabelText('RUT'),
      {
        target: {
          value: '12345678K'
        }
      }
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
      screen.getByLabelText('Apellidos'),
      {
        target: {
          value: 'Flores Rojas'
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
          name: 'Registrarse'
        }
      )
    )

    expect(
      screen.getByText(
        'Registro realizado correctamente.'
      )
    ).toBeTruthy()

    const usuarios =
      JSON.parse(
        localStorage.getItem('usuarios')
      )

    expect(usuarios.length).toBe(1)

    expect(
      usuarios[0].correo
    ).toBe('prueba@gmail.com')

    expect(
      usuarios[0].nombre
    ).toBe('Manuel')

  })


  /*
     PRUEBA 2
  */
  it('no debe registrar dos usuarios con el mismo correo', function () {

    const usuarioExistente = [
      {
        rut: '11111111K',
        nombre: 'Usuario',
        apellidos: 'Existente',
        correo: 'prueba@gmail.com',
        contrasena: '123456'
      }
    ]

    localStorage.setItem(
      'usuarios',
      JSON.stringify(usuarioExistente)
    )

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    )

    fireEvent.change(
      screen.getByLabelText('RUT'),
      {
        target: {
          value: '12345678K'
        }
      }
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
      screen.getByLabelText('Apellidos'),
      {
        target: {
          value: 'Flores Rojas'
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
          name: 'Registrarse'
        }
      )
    )

    const usuarios =
      JSON.parse(
        localStorage.getItem('usuarios')
      )

    expect(usuarios.length).toBe(1)

  })


  /*
     PRUEBA 3
  */
  it('no debe registrar un correo con dominio no permitido', function () {

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    )

    fireEvent.change(
      screen.getByLabelText('RUT'),
      {
        target: {
          value: '12345678K'
        }
      }
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
      screen.getByLabelText('Apellidos'),
      {
        target: {
          value: 'Flores Rojas'
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
          name: 'Registrarse'
        }
      )
    )

    expect(
      screen.getByText(
        'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'
      )
    ).toBeTruthy()

    expect(
      localStorage.getItem('usuarios')
    ).toBeNull()

  })

})