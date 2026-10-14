import MockDB from '../src/services/MockDB.js'

describe('Pruebas del módulo tienda', function () {

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
  */
  it('debe obtener los productos guardados', function () {
    const productos =
      MockDB.getTabla('productos')

    expect(productos.length).toBe(2)
  })


  /*
     PRUEBA 2
  */
  it('debe agregar un producto al carrito', function () {
    const resultado =
      MockDB.agregarAlCarrito(1, 1)

    const carrito =
      MockDB.getCarrito()

    expect(resultado.exito).toBeTrue()
    expect(carrito.length).toBe(1)
    expect(carrito[0].cantidad).toBe(1)
  })


  /*
     PRUEBA 3
  */
  it('debe aumentar la cantidad si el producto ya está en el carrito', function () {
    MockDB.agregarAlCarrito(1, 1)
    MockDB.agregarAlCarrito(1, 2)

    const carrito =
      MockDB.getCarrito()

    expect(carrito[0].cantidad).toBe(3)
  })


  /*
     PRUEBA 4
  */
  it('no debe permitir superar el stock disponible', function () {
    const resultado =
      MockDB.agregarAlCarrito(1, 6)

    expect(resultado.exito).toBeFalse()
  })


  /*
     PRUEBA 5
  */
  it('no debe permitir agregar un producto sin stock', function () {
    const resultado =
      MockDB.agregarAlCarrito(2, 1)

    expect(resultado.exito).toBeFalse()
  })


  /*
     PRUEBA 6
  */
  it('debe descontar stock al comprar con debito', function () {
    MockDB.agregarAlCarrito(1, 2)

    const resultado =
      MockDB.realizarCompra('debito')

    const productos =
      MockDB.getTabla('productos')

    const producto =
      productos.find(
        producto => producto.id === 1
      )

    expect(resultado.exito).toBeTrue()
    expect(producto.stockActual).toBe(3)
    expect(MockDB.getCarrito().length).toBe(0)
  })


  /*
     PRUEBA 7
  */
  it('debe descontar stock al comprar con credito', function () {
    MockDB.agregarAlCarrito(1, 1)

    const resultado =
      MockDB.realizarCompra('credito')

    const producto =
      MockDB
        .getTabla('productos')
        .find(
          producto =>
            producto.id === 1
        )

    expect(resultado.exito).toBeTrue()
    expect(producto.stockActual).toBe(4)
  })


  /*
     PRUEBA 8
  */
  it('debe agregar un producto nuevo', function () {
    const resultado =
      MockDB.agregarProducto({
        codigo: 'HER-002',
        nombre: 'Martillo nuevo',
        categoria: 'herramientas',
        precio: 15000,
        stockActual: 10,
        stockMinimo: 3,
        imagen: '/img/martillo.png',
        descripcion: 'Martillo de prueba'
      })

    expect(resultado.exito).toBeTrue()

    const productos =
      MockDB.getTabla('productos')

    expect(productos.length).toBe(3)
  })


  /*
     PRUEBA 9
  */
  it('debe editar un producto existente', function () {
    const producto =
      MockDB
        .getTabla('productos')
        .find(
          producto =>
            producto.id === 1
        )

    const resultado =
      MockDB.actualizarProducto(
        1,
        {
          ...producto,
          nombre: 'Taladro editado',
          precio: 25000,
          stockActual: 4
        }
      )

    const productoEditado =
      MockDB
        .getTabla('productos')
        .find(
          producto =>
            producto.id === 1
        )

    expect(resultado.exito).toBeTrue()
    expect(
      productoEditado.nombre
    ).toBe('Taladro editado')

    expect(
      productoEditado.precio
    ).toBe(25000)
  })


  /*
     PRUEBA 10
  */
  it('debe eliminar un producto', function () {
    const resultado =
      MockDB.eliminarProducto(1)

    const productos =
      MockDB.getTabla('productos')

    const producto =
      productos.find(
        producto =>
          producto.id === 1
      )

    expect(resultado.exito).toBeTrue()
    expect(producto).toBeUndefined()
  })

})