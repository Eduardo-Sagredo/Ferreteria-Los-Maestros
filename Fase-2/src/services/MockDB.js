import productosIniciales from '../data/productos.js'

const MockDB = {

  init() {
    const productosGuardados =
      localStorage.getItem('db_productos')

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
      producto => producto.id === id
    )

    if (producto) {
      producto.stockActual = Number(nuevoStock)

      producto.estado =
        this.calcularEstadoStock(
          producto.stockActual,
          producto.stockMinimo
        )

      this.setTabla(
        'productos',
        productos
      )
    }
  },

  eliminarRegistro(tabla, id) {
    const datos =
      this.getTabla(tabla).filter(
        item => item.id !== id
      )

    this.setTabla(
      tabla,
      datos
    )
  }

}

MockDB.init()

export default MockDB