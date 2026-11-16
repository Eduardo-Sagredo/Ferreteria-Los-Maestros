import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Registro from '../pages/Registro.jsx'
import api from '../api/axiosConfig.js'

describe('Pruebas del registro de usuario', function () {

  beforeEach(function () {
    localStorage.clear()
  })

  // COMPLETAR FORMULARIO DE REGISTRO

  function completarFormulario(correo = 'prueba@gmail.com') {

    fireEvent.change(
      screen.getByLabelText('RUT'),
      { target: { value: '12345678K' } }
    )

    fireEvent.change(
      screen.getByLabelText('Nombre'),
      { target: { value: 'Manuel' } }
    )

    fireEvent.change(
      screen.getByLabelText('Apellidos'),
      { target: { value: 'Flores Rojas' } }
    )

    fireEvent.change(
      screen.getByLabelText(/Correo electrónico/i),
      { target: { value: correo } }
    )

    fireEvent.change(
      screen.getByLabelText(/Contraseña/i),
      { target: { value: '123456' } }
    )
  }

  // PRUEBA 1: REGISTRO CORRECTO

  it('debe registrar un usuario correctamente', async function () {

    spyOn(api, 'post').and.returnValue(
      Promise.resolve({
        data: {
          mensaje: 'Usuario registrado correctamente'
        }
      })
    )

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    )

    completarFormulario()

    fireEvent.click(
      screen.getByRole('button', { name: /Registrarse/i })
    )

    await screen.findByText(/Registro realizado correctamente/i)

    expect(api.post).toHaveBeenCalledWith(
      '/auth/register',
      {
        rut: '12345678K',
        nombre: 'Manuel',
        apellidos: 'Flores Rojas',
        correo: 'prueba@gmail.com',
        contrasena: '123456'
      }
    )
  })

  // PRUEBA 2: CORREO YA REGISTRADO

  it('no debe registrar dos usuarios con el mismo correo', async function () {

    spyOn(api, 'post').and.returnValue(
      Promise.reject({
        response: {
          status: 409,
          data: {
            mensaje: 'El correo o RUT ya se encuentra registrado.'
          }
        }
      })
    )

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    )

    completarFormulario()

    fireEvent.click(
      screen.getByRole('button', { name: /Registrarse/i })
    )

    await screen.findByText(/ya se encuentra registrado/i)

    expect(api.post).toHaveBeenCalled()
  })

  // PRUEBA 3: DOMINIO DE CORREO NO PERMITIDO

  it('no debe registrar un correo con dominio no permitido', function () {

    spyOn(api, 'post')

    render(
      <MemoryRouter>
        <Registro />
      </MemoryRouter>
    )

    completarFormulario('prueba@hotmail.com')

    fireEvent.click(
      screen.getByRole('button', { name: /Registrarse/i })
    )

    expect(
      screen.getByText(/Solo se permiten correos/i)
    ).toBeTruthy()

    expect(api.post).not.toHaveBeenCalled()
  })

})