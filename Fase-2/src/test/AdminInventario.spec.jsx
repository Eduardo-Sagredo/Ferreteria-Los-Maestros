import {
  render,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react'

import MockDB from '../services/MockDB.js'
import Inventario from '../pages/admin/Inventario.jsx'
import GestionPedidos from '../pages/admin/GestionPedidos.jsx'
import Ubicacion from '../pages/Ubicacion.jsx'


describe(
  'Pruebas del módulo Administrador e Inventario ',
  function () {

    const productosPrueba = [
      {
        id: 1,
        codigo: 'PROD-001',
        nombre: 'Taladro disponible',
        categoria: 'herramientas',
        precio: 50000,
        stockActual: 10,
        stockMinimo: 3,
        estado: 'Disponible',
        imagen: '/img/taladro.jpg',
        descripcion: 'Taladro de prueba'
      },
      {
        id: 2,
        codigo: 'PROD-002',
        nombre: 'Cemento stock bajo',
        categoria: 'construccion',
        precio: 10000,
        stockActual: 2,
        stockMinimo: 3,
        estado: 'Stock bajo',
        imagen: '/img/cemento.png',
        descripcion: 'Cemento de prueba'
      },
      {
        id: 3,
        codigo: 'PROD-003',
        nombre: 'Pintura sin stock',
        categoria: 'pinturas',
        precio: 20000,
        stockActual: 0,
        stockMinimo: 3,
        estado: 'Sin stock',
        imagen: '/img/pintura.png',
        descripcion: 'Pintura de prueba'
      }
    ]


    const usuariosPrueba = [
      {
        id: 1,
        nombre: 'Administrador Prueba',
        correo: 'admin@ferreteria.cl',
        rol: 'Administrador',
        estado: 'Activo'
      },
      {
        id: 2,
        nombre: 'Vendedor Prueba',
        correo: 'vendedor@ferreteria.cl',
        rol: 'Vendedor',
        estado: 'Activo'
      }
    ]


    const pedidosPrueba = [
      {
        id: 101,
        numero: 'PED-001',
        cliente: 'Daniel Pinto',
        fecha: '19/10/2026',
        total: 50000,
        entrega: 'Retiro',
        estado: 'Pendiente',
        productos: [
          {
            nombre: 'Taladro disponible',
            cant: 1
          }
        ]
      },
      {
        id: 102,
        numero: 'PED-002',
        cliente: 'Constructora Prueba',
        fecha: '19/10/2026',
        total: 30000,
        entrega: 'Despacho',
        estado: 'Preparando',
        productos: [
          {
            nombre: 'Cemento stock bajo',
            cant: 3
          }
        ]
      }
    ]


    beforeEach(function () {

      localStorage.clear()

      localStorage.setItem(
        'db_productos',
        JSON.stringify(productosPrueba)
      )

      localStorage.setItem(
        'db_usuarios',
        JSON.stringify(usuariosPrueba)
      )

      localStorage.setItem(
        'db_pedidos',
        JSON.stringify(pedidosPrueba)
      )

      localStorage.setItem(
        'carritoFerreteria',
        JSON.stringify([])
      )
    })


    afterEach(function () {
      cleanup()
    })


    /*
       PRUEBA 1
       AGREGAR PRODUCTO
    */
    it(
      'debe agregar un producto nuevo al inventario',
      function () {

        const resultado =
          MockDB.agregarProducto({
            codigo: 'PROD-004',
            nombre: 'Martillo nuevo',
            categoria: 'herramientas',
            precio: 15000,
            stockActual: 10,
            stockMinimo: 3,
            imagen: '/img/martillo.png',
            descripcion: 'Martillo de prueba'
          })


        expect(
          resultado.exito
        ).toBeTrue()


        const producto =
          MockDB
            .getTabla('productos')
            .find(
              producto =>
                producto.codigo ===
                'PROD-004'
            )


        expect(
          producto.nombre
        ).toBe('Martillo nuevo')


        expect(
          producto.estado
        ).toBe('Disponible')
      }
    )


    /*
       PRUEBA 2
       CÓDIGO DUPLICADO
    */
    it(
      'no debe permitir agregar un producto con código duplicado',
      function () {

        const resultado =
          MockDB.agregarProducto({
            codigo: 'PROD-001',
            nombre: 'Producto duplicado',
            categoria: 'herramientas',
            precio: 10000,
            stockActual: 5,
            stockMinimo: 2,
            imagen: '',
            descripcion: ''
          })


        expect(
          resultado.exito
        ).toBeFalse()


        expect(
          MockDB.getTabla('productos').length
        ).toBe(3)
      }
    )


    /*
       PRUEBA 3
       EDITAR PRODUCTO
    */
    it(
      'debe editar un producto existente',
      function () {

        const producto =
          MockDB
            .getTabla('productos')
            .find(
              producto =>
                producto.id === 1
            )


        const resultado =
          MockDB.editarProducto(
            1,
            {
              ...producto,
              nombre: 'Taladro editado',
              precio: 60000,
              stockActual: 8,
              stockMinimo: 3
            }
          )


        expect(
          resultado.exito
        ).toBeTrue()


        const actualizado =
          MockDB
            .getTabla('productos')
            .find(
              producto =>
                producto.id === 1
            )


        expect(
          actualizado.nombre
        ).toBe('Taladro editado')


        expect(
          actualizado.precio
        ).toBe(60000)
      }
    )


    /*
       PRUEBA 4
       ESTADOS DE STOCK
    */
    it(
      'debe calcular correctamente los estados del inventario',
      function () {

        expect(
          MockDB.calcularEstadoStock(
            0,
            3
          )
        ).toBe('Sin stock')


        expect(
          MockDB.calcularEstadoStock(
            2,
            3
          )
        ).toBe('Stock bajo')


        expect(
          MockDB.calcularEstadoStock(
            10,
            3
          )
        ).toBe('Disponible')
      }
    )


    /*
       PRUEBA 5
       ACTUALIZAR STOCK
    */
    it(
      'debe actualizar el stock y cambiar automáticamente su estado',
      function () {

        const resultado =
          MockDB.actualizarStockProducto(
            1,
            2
          )


        expect(
          resultado.exito
        ).toBeTrue()


        const producto =
          MockDB
            .getTabla('productos')
            .find(
              producto =>
                producto.id === 1
            )


        expect(
          producto.stockActual
        ).toBe(2)


        expect(
          producto.estado
        ).toBe('Stock bajo')
      }
    )


    /*
       PRUEBA 6
       ALERTAS DE INVENTARIO
       RF-38 Y RF-39
    */
    it(
      'debe mostrar visualmente productos con stock bajo y sin stock',
      function () {

        render(
          <Inventario />
        )


        expect(
          screen
            .getAllByText(
              'Stock Bajo'
            )
            .length
        ).toBeGreaterThan(0)


        expect(
          screen
            .getAllByText(
              'Sin stock'
            )
            .length
        ).toBeGreaterThan(0)


        expect(
          screen
            .getAllByText(
              'Cemento stock bajo'
            )
            .length
        ).toBeGreaterThan(0)


        expect(
          screen
            .getAllByText(
              'Pintura sin stock'
            )
            .length
        ).toBeGreaterThan(0)
      }
    )


    /*
       PRUEBA 7
       AGREGAR USUARIO
    */
    it(
      'debe agregar un usuario con rol Vendedor',
      function () {

        const resultado =
          MockDB.agregarUsuario({
            nombre: 'Nuevo Vendedor',
            correo: 'nuevo@ferreteria.cl',
            rol: 'Vendedor',
            estado: 'Activo'
          })


        expect(
          resultado.exito
        ).toBeTrue()


        const usuario =
          MockDB
            .getTabla('usuarios')
            .find(
              usuario =>
                usuario.correo ===
                'nuevo@ferreteria.cl'
            )


        expect(
          usuario.rol
        ).toBe('Vendedor')
      }
    )


    /*
       PRUEBA 8
       EDITAR ROL DE USUARIO
    */
    it(
      'debe modificar el rol de un usuario',
      function () {

        const resultado =
          MockDB.editarUsuario(
            2,
            {
              nombre: 'Vendedor Prueba',
              correo:
                'vendedor@ferreteria.cl',
              rol: 'Administrador',
              estado: 'Activo'
            }
          )


        expect(
          resultado.exito
        ).toBeTrue()


        const usuario =
          MockDB
            .getTabla('usuarios')
            .find(
              usuario =>
                usuario.id === 2
            )


        expect(
          usuario.rol
        ).toBe('Administrador')
      }
    )


    /*
       PRUEBA 9
       GESTIÓN DE PEDIDOS
    */
    it(
      'debe mostrar y filtrar los pedidos del sistema',
      function () {

        render(
          <GestionPedidos />
        )


        expect(
          screen.getByText(
            'PED-001'
          )
        ).toBeTruthy()


        expect(
          screen.getByText(
            'PED-002'
          )
        ).toBeTruthy()


        const buscador =
          screen.getByPlaceholderText(
            'Buscar por número o cliente...'
          )


        fireEvent.change(
          buscador,
          {
            target: {
              value:
                'Constructora Prueba'
            }
          }
        )


        expect(
          screen.getByText(
            'Constructora Prueba'
          )
        ).toBeTruthy()


        expect(
          screen.queryByText(
            'Daniel Pinto'
          )
        ).toBeNull()
      }
    )


    /*
       PRUEBA 10
       UBICACIÓN Y COBERTURA
       RF-40
    */
    it(
      'debe confirmar cobertura para una dirección de La Serena',
      function () {

        render(
          <Ubicacion />
        )


        const direccion =
          screen.getByLabelText(
            'Dirección'
          )


        fireEvent.change(
          direccion,
          {
            target: {
              value:
                'Balmaceda 123, La Serena'
            }
          }
        )


        fireEvent.click(
          screen.getByRole(
            'button',
            {
              name:
                'Verificar cobertura'
            }
          )
        )


        expect(
          screen.getByText(
            '¡Excelentes noticias! Tenemos cobertura en tu ubicación.'
          )
        ).toBeTruthy()
      }
    )

  }
)