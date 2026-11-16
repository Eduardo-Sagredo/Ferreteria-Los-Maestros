import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import InicioSesion from '../pages/InicioSesion.jsx'
import api from '../api/axiosConfig.js'

describe('Pruebas del inicio de sesión', function () {

  beforeEach(function () {
    localStorage.clear()
  })

  // PRUEBA 1: INICIO DE SESIÓN CORRECTO

  it('debe iniciar sesión con credenciales correctas', async function () {

    spyOn(api, 'post').and.returnValue(
      Promise.resolve({
        data: {
          token: 'token-de-prueba',
          correo: 'prueba@gmail.com',
          roles: ['ROLE_CLIENTE']
        }
      })
    )

    render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
    )

    fireEvent.change(
      screen.getByLabelText(/Correo electrónico/i),
      { target: { value: 'prueba@gmail.com' } }
    )

    fireEvent.change(
      screen.getByLabelText(/Contraseña/i),
      { target: { value: '123456' } }
    )

    fireEvent.click(
      screen.getByRole('button', { name: /Iniciar sesión/i })
    )

    await screen.findByText(/Inicio de sesion/i)

    expect(localStorage.getItem('token')).toBe('token-de-prueba')

    expect(api.post).toHaveBeenCalledWith(
      '/auth/login',
      {
        correo: 'prueba@gmail.com',
        contrasena: '123456'
      }
    )
  })

  // PRUEBA 2: CONTRASEÑA INCORRECTA

  it('no debe iniciar sesión con contraseña incorrecta', async function () {

    spyOn(api, 'post').and.returnValue(
      Promise.reject({
        response: { status: 401 }
      })
    )

    render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
    )

    fireEvent.change(
      screen.getByLabelText(/Correo electrónico/i),
      { target: { value: 'prueba@gmail.com' } }
    )

    fireEvent.change(
      screen.getByLabelText(/Contraseña/i),
      { target: { value: '999999' } }
    )

    fireEvent.click(
      screen.getByRole('button', { name: /Iniciar sesión/i })
    )

    await screen.findByText(/Credenciales incorrectas/i)

    expect(localStorage.getItem('token')).toBeNull()
  })

  // PRUEBA 3: CORREO NO REGISTRADO

  it('no debe iniciar sesión con un correo no registrado', async function () {

    spyOn(api, 'post').and.returnValue(
      Promise.reject({
        response: { status: 401 }
      })
    )

    render(
      <MemoryRouter>
        <InicioSesion />
      </MemoryRouter>
    )

    fireEvent.change(
      screen.getByLabelText(/Correo electrónico/i),
      { target: { value: 'noexiste@gmail.com' } }
    )

    fireEvent.change(
      screen.getByLabelText(/Contraseña/i),
      { target: { value: '123456' } }
    )

    fireEvent.click(
      screen.getByRole('button', { name: /Iniciar sesión/i })
    )

    await screen.findByText(/Credenciales incorrectas/i)

    expect(localStorage.getItem('token')).toBeNull()
  })

})