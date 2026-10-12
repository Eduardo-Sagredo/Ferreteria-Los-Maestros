import productosIniciales from '../data/productos.js'

const MockDB = {

  init() {
    const productosGuardados = localStorage.getItem('db_productos')

    if (!productosGuardados) {
      localStorage.setItem(
        'db_productos',
        JSON.stringify(productosIniciales)
      )
    }
  },

  getTabla(tabla) {
    return JSON.parse(
      localStorage.getItem(`db_${tabla}`)
    ) || []
  },

  setTabla(tabla, datos) {
    localStorage.setItem(
      `db_${tabla}`,
      JSON.stringify(datos)
    )
  },

  getDato(clave) {
    return JSON.parse(
      localStorage.getItem(clave)
    )
  },

  setDato(clave, dato) {
    localStorage.setItem(
      clave,
      JSON.stringify(dato)
    )
  },

  eliminarDato(clave) {
    localStorage.removeItem(clave)
  },

  calcularEstadoStock(stockActual, stockMinimo) {

    if (stockActual <= 0) {
      return 'Sin stock'
    }

    if (stockActual <= stockMinimo) {
      return 'Stock bajo'
    }

    return 'Disponible'
  },

  actualizarStockProducto(id, nuevoStock) {
    const productos = this.getTabla('productos')

    const producto = productos.find(
      (producto) => producto.id === id
    )

    if (producto) {

      producto.stockActual = Number(nuevoStock)

      producto.estado = this.calcularEstadoStock(
        producto.stockActual,
        producto.stockMinimo
      )

      this.setTabla('productos', productos)
    }
  },

  eliminarRegistro(tabla, id) {

    const datos = this
      .getTabla(tabla)
      .filter((item) => item.id !== id)

    this.setTabla(tabla, datos)
  },

  getCarrito() {
    return this.getDato('carritoFerreteria') || []
  },

  guardarCarrito(carrito) {

    this.setDato(
      'carritoFerreteria',
      carrito
    )

    window.dispatchEvent(
      new Event('carritoActualizado')
    )
  },

  agregarAlCarrito(idProducto, cantidad) {

    const productos = this.getTabla('productos')

    const producto = productos.find(
      (producto) => producto.id === idProducto
    )

    if (!producto) {
      return {
        exito: false,
        mensaje: 'No se encontró el producto.'
      }
    }

    if (producto.stockActual <= 0) {
      return {
        exito: false,
        mensaje: 'Este producto no tiene stock disponible.'
      }
    }

    if (cantidad < 1) {
      return {
        exito: false,
        mensaje: 'La cantidad debe ser mayor a 0.'
      }
    }

    const carrito = this.getCarrito()

    const itemEncontrado = carrito.find(
      (item) => item.id === idProducto
    )

    let cantidadActual = 0

    if (itemEncontrado) {
      cantidadActual = itemEncontrado.cantidad
    }

    if (
      cantidadActual + cantidad >
      producto.stockActual
    ) {
      return {
        exito: false,
        mensaje: 'No puedes superar el stock disponible.'
      }
    }

    if (itemEncontrado) {

      itemEncontrado.cantidad =
        itemEncontrado.cantidad + cantidad

    } else {

      carrito.push({
        id: idProducto,
        cantidad: cantidad
      })

    }

    this.guardarCarrito(carrito)

    return {
      exito: true,
      mensaje: 'Producto agregado al carrito.'
    }
  }
}

MockDB.init()

export default MockDB