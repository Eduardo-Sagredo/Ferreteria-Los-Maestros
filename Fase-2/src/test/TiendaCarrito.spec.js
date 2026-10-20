import MockDB from '../services/MockDB.js'

describe('Pruebas del módulo Tienda y Carrito ', function () {

  const productosPrueba = [
    {
      id: 1,
      codigo: 'HER-001',
      nombre: 'Taladro de prueba',
      categoria: 'herramientas',
      precio: 10000,
      stockActual: 5,
      stockMinimo: 2,
      estado: 'Disponible',
      imagen: '/img/taladro.jpg',
      descripcion: 'Producto de prueba'
    },
    {
      id: 2,
      codigo: 'PIN-001',
      nombre: 'Pintura de prueba',
      categoria: 'pinturas',
      precio: 20000,
      stockActual: 0,
      stockMinimo: 2,
      estado: 'Sin stock',
      imagen: '/img/pintura.png',
      descripcion: 'Producto sin stock'
    }
  ]


  beforeEach(function () {

    localStorage.clear()

    localStorage.setItem(
      'db_productos',
      JSON.stringify(productosPrueba)
    )

    localStorage.setItem(
      'carritoFerreteria',
      JSON.stringify([])
    )
  })


  /*
     PRUEBA 1
     Obtener productos del catálogo
  */
  it('debe obtener los productos guardados', function () {

    const productos =
      MockDB.getTabla('productos')

    expect(productos.length).toBe(2)

    expect(
      productos[0].nombre
    ).toBe('Taladro de prueba')
  })


  /*
     PRUEBA 2
     Agregar producto al carrito
  */
  it('debe agregar un producto disponible al carrito', function () {

    const resultado =
      MockDB.agregarAlCarrito(1, 1)

    const carrito =
      MockDB.getCarrito()

    expect(resultado.exito).toBeTrue()

    expect(
      carrito.length
    ).toBe(1)

    expect(
      carrito[0].id
    ).toBe(1)

    expect(
      carrito[0].cantidad
    ).toBe(1)
  })


  /*
     PRUEBA 3
     Aumentar cantidad
  */
  it('debe aumentar la cantidad si el producto ya está en el carrito', function () {

    MockDB.agregarAlCarrito(1, 1)

    MockDB.agregarAlCarrito(1, 2)

    const carrito =
      MockDB.getCarrito()

    expect(
      carrito.length
    ).toBe(1)

    expect(
      carrito[0].cantidad
    ).toBe(3)
  })


  /*
     PRUEBA 4
     No superar stock
  */
  it('no debe permitir superar el stock disponible', function () {

    const resultado =
      MockDB.agregarAlCarrito(1, 6)

    const carrito =
      MockDB.getCarrito()

    expect(
      resultado.exito
    ).toBeFalse()

    expect(
      carrito.length
    ).toBe(0)
  })


  /*
     PRUEBA 5
     Producto sin stock
  */
  it('no debe permitir agregar un producto sin stock', function () {

    const resultado =
      MockDB.agregarAlCarrito(2, 1)

    const carrito =
      MockDB.getCarrito()

    expect(
      resultado.exito
    ).toBeFalse()

    expect(
      carrito.length
    ).toBe(0)
  })


  /*
     PRUEBA 6
     Persistencia en localStorage
  */
  it('debe guardar el carrito en localStorage', function () {

    MockDB.agregarAlCarrito(1, 2)

    const carritoGuardado =
      JSON.parse(
        localStorage.getItem(
          'carritoFerreteria'
        )
      )

    expect(
      carritoGuardado.length
    ).toBe(1)

    expect(
      carritoGuardado[0].id
    ).toBe(1)

    expect(
      carritoGuardado[0].cantidad
    ).toBe(2)
  })


  /*
     PRUEBA 7
     Modificar cantidad del carrito
  */
  it('debe guardar una nueva cantidad del producto en el carrito', function () {

    MockDB.agregarAlCarrito(1, 1)

    const carrito =
      MockDB.getCarrito()

    carrito[0].cantidad = 4

    MockDB.guardarCarrito(
      carrito
    )

    const carritoActualizado =
      MockDB.getCarrito()

    expect(
      carritoActualizado[0].cantidad
    ).toBe(4)

    const carritoLocalStorage =
      JSON.parse(
        localStorage.getItem(
          'carritoFerreteria'
        )
      )

    expect(
      carritoLocalStorage[0].cantidad
    ).toBe(4)
  })


  /*
     PRUEBA 8
     Eliminar producto del carrito
  */
  it('debe eliminar un producto del carrito', function () {

    MockDB.agregarAlCarrito(1, 1)

    const carrito =
      MockDB.getCarrito()

    const carritoActualizado =
      carrito.filter(
        item =>
          item.id !== 1
      )

    MockDB.guardarCarrito(
      carritoActualizado
    )

    const carritoFinal =
      MockDB.getCarrito()

    expect(
      carritoFinal.length
    ).toBe(0)
  })


  /*
     PRUEBA 9
     Compra con débito
  */
  it('debe descontar stock al comprar con debito y vaciar el carrito', function () {

    MockDB.agregarAlCarrito(1, 2)

    const resultado =
      MockDB.realizarCompra(
        'debito'
      )

    const producto =
      MockDB
        .getTabla('productos')
        .find(
          producto =>
            producto.id === 1
        )

    expect(
      resultado.exito
    ).toBeTrue()

    expect(
      producto.stockActual
    ).toBe(3)

    expect(
      MockDB.getCarrito().length
    ).toBe(0)
  })


  /*
     PRUEBA 10
     Compra con crédito
  */
  it('debe descontar stock al comprar con credito y vaciar el carrito', function () {

    MockDB.agregarAlCarrito(1, 1)

    const resultado =
      MockDB.realizarCompra(
        'credito'
      )

    const producto =
      MockDB
        .getTabla('productos')
        .find(
          producto =>
            producto.id === 1
        )

    expect(
      resultado.exito
    ).toBeTrue()

    expect(
      producto.stockActual
    ).toBe(4)

    expect(
      MockDB.getCarrito().length
    ).toBe(0)
  })

})