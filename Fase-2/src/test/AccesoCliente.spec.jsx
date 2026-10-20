import {
  render,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

import InicioSesion from '../pages/InicioSesion.jsx'
import Registro from '../pages/Registro.jsx'
import Contacto from '../pages/Contacto.jsx'
import MisPedidos from '../pages/MisPedidos.jsx'
import Historial from '../pages/Historial.jsx'
import CuentaCorriente from '../pages/CuentaCorriente.jsx'


describe(
  'Pruebas del módulo Acceso, Formularios y Cliente - Benjamin',
  function () {

    beforeEach(function () {
      localStorage.clear()
    })


    afterEach(function () {
      cleanup()
    })


    /*
       PRUEBA 1
       LOGIN CORRECTO
    */
    it(
      'debe iniciar sesión con credenciales correctas',
      function () {

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


        render(
          <MemoryRouter>
            <InicioSesion />
          </MemoryRouter>
        )


        fireEvent.change(
          screen.getByLabelText(
            'Correo electrónico'
          ),
          {
            target: {
              value: 'prueba@gmail.com'
            }
          }
        )


        fireEvent.change(
          screen.getByLabelText(
            'Contraseña'
          ),
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
            localStorage.getItem(
              'usuarioSesion'
            )
          )


        expect(
          usuarioSesion.correo
        ).toBe('prueba@gmail.com')
      }
    )


    /*
       PRUEBA 2
       CONTRASEÑA INCORRECTA
    */
    it(
      'no debe iniciar sesión con contraseña incorrecta',
      function () {

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


        render(
          <MemoryRouter>
            <InicioSesion />
          </MemoryRouter>
        )


        fireEvent.change(
          screen.getByLabelText(
            'Correo electrónico'
          ),
          {
            target: {
              value: 'prueba@gmail.com'
            }
          }
        )


        fireEvent.change(
          screen.getByLabelText(
            'Contraseña'
          ),
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
          localStorage.getItem(
            'usuarioSesion'
          )
        ).toBeNull()
      }
    )


    /*
       PRUEBA 3
       REGISTRO CORRECTO
    */
    it(
      'debe registrar un usuario correctamente',
      function () {

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
          screen.getByLabelText(
            'Correo electrónico'
          ),
          {
            target: {
              value: 'prueba@gmail.com'
            }
          }
        )


        fireEvent.change(
          screen.getByLabelText(
            'Contraseña'
          ),
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
            localStorage.getItem(
              'usuarios'
            )
          )


        expect(
          usuarios.length
        ).toBe(1)


        expect(
          usuarios[0].correo
        ).toBe('prueba@gmail.com')
      }
    )


    /*
       PRUEBA 4
       CORREO DUPLICADO
    */
    it(
      'no debe registrar dos usuarios con el mismo correo',
      function () {

        localStorage.setItem(
          'usuarios',
          JSON.stringify([
            {
              rut: '11111111K',
              nombre: 'Usuario',
              apellidos: 'Existente',
              correo: 'prueba@gmail.com',
              contrasena: '123456'
            }
          ])
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
          screen.getByLabelText(
            'Correo electrónico'
          ),
          {
            target: {
              value: 'prueba@gmail.com'
            }
          }
        )


        fireEvent.change(
          screen.getByLabelText(
            'Contraseña'
          ),
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
            localStorage.getItem(
              'usuarios'
            )
          )


        expect(
          usuarios.length
        ).toBe(1)
      }
    )


    /*
       PRUEBA 5
       DOMINIO DE CORREO
    */
    it(
      'no debe registrar un correo con dominio no permitido',
      function () {

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
          screen.getByLabelText(
            'Correo electrónico'
          ),
          {
            target: {
              value: 'prueba@hotmail.com'
            }
          }
        )


        fireEvent.change(
          screen.getByLabelText(
            'Contraseña'
          ),
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
      }
    )


    /*
       PRUEBA 6
       CONTACTO CORRECTO
    */
    it(
      'debe enviar el formulario de contacto con datos válidos',
      function () {

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
          screen.getByLabelText(
            'Correo electrónico'
          ),
          {
            target: {
              value: 'prueba@gmail.com'
            }
          }
        )


        fireEvent.change(
          screen.getByLabelText(
            'Comentario'
          ),
          {
            target: {
              value:
                'Necesito información sobre un producto.'
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
      }
    )


    /*
       PRUEBA 7
       CONTACTO VACÍO
    */
    it(
      'debe mostrar errores al enviar el formulario de contacto vacío',
      function () {

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
      }
    )


    /*
       PRUEBA 8
       MIS PEDIDOS
    */
    it(
      'debe mostrar los pedidos y sus estados',
      function () {

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
          screen.getByText('En preparación')
        ).toBeTruthy()


        expect(
          screen.getByText('En despacho')
        ).toBeTruthy()


        expect(
          screen.getByText('Entregado')
        ).toBeTruthy()
      }
    )


    /*
       PRUEBA 9
       HISTORIAL
    */
    it(
      'debe mostrar el historial de compras del cliente',
      function () {

        render(
          <Historial />
        )


        expect(
          screen.getByText(
            'Historial de Compras'
          )
        ).toBeTruthy()


        expect(
          screen.getByText(/1003/)
        ).toBeTruthy()


        expect(
          screen.getByText(/0998/)
        ).toBeTruthy()
      }
    )


    /*
       PRUEBA 10
       CUENTA CORRIENTE
    */
    it(
      'debe mostrar el saldo pendiente de la cuenta corriente',
      function () {

        render(
          <CuentaCorriente />
        )


        expect(
          screen.getByText(
            'Saldo pendiente'
          )
        ).toBeTruthy()


        expect(
          screen.getByText(
            '$85.480'
          )
        ).toBeTruthy()
      }
    )

  }
)