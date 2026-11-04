import productosIniciales from '../data/productos.js'

const MockDB = {

  /*
     INICIAR BASE DE DATOS
  */
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

  /*
     OBTENER TABLA
  */
  getTabla(tabla) {
    return JSON.parse(
      localStorage.getItem(`db_${tabla}`)
    ) || []
  },

  /*
     GUARDAR TABLA
  */
  setTabla(tabla, datos) {
    localStorage.setItem(
      `db_${tabla}`,
      JSON.stringify(datos)
    )
  },

  /*
     OBTENER DATO
  */
  getDato(clave) {
    return JSON.parse(
      localStorage.getItem(clave)
    )
  },

  /*
     GUARDAR DATO
  */
  setDato(clave, dato) {
    localStorage.setItem(
      clave,
      JSON.stringify(dato)
    )
  },

  /*
     ELIMINAR DATO
  */
  eliminarDato(clave) {
    localStorage.removeItem(clave)
  },

  /*
     CALCULAR ESTADO DEL STOCK
  */
  calcularEstadoStock(
    stockActual,
    stockMinimo
  ) {

    if (stockActual <= 0) {
      return 'Sin stock'
    }

    if (stockActual <= stockMinimo) {
      return 'Stock bajo'
    }

    return 'Disponible'
  },

  /*
     ACTUALIZAR STOCK
  */
  actualizarStockProducto(
    id,
    nuevoStock
  ) {

    const productos =
      this.getTabla('productos')

    const producto =
      productos.find(
        (producto) =>
          producto.id === id
      )

    if (!producto) {
      return {
        exito: false,
        mensaje:
          'No se encontró el producto.'
      }
    }

    producto.stockActual =
      Number(nuevoStock)

    producto.estado =
      this.calcularEstadoStock(
        producto.stockActual,
        producto.stockMinimo
      )

    this.setTabla(
      'productos',
      productos
    )

    return {
      exito: true,
      mensaje:
        'Stock actualizado correctamente.'
    }
  },

  /*
     AGREGAR PRODUCTO
  */
  agregarProducto(
    nuevoProducto
  ) {

    const productos =
      this.getTabla('productos')

    /*
       VALIDAR CÓDIGO REPETIDO
    */
    const codigoExiste =
      productos.some(
        (producto) =>
          producto.codigo ===
          nuevoProducto.codigo
      )

    if (codigoExiste) {
      return {
        exito: false,
        mensaje:
          'Ya existe un producto con ese código.'
      }
    }

    /*
       GENERAR NUEVO ID
    */
    let nuevoId = 1

    if (productos.length > 0) {

      nuevoId =
        Math.max(
          ...productos.map(
            (producto) =>
              producto.id
          )
        ) + 1
    }

    const stockActual =
      Number(
        nuevoProducto.stockActual
      )

    const stockMinimo =
      Number(
        nuevoProducto.stockMinimo
      )

    const productoCompleto = {

      id: nuevoId,

      codigo:
        nuevoProducto.codigo,

      nombre:
        nuevoProducto.nombre,

      categoria:
        nuevoProducto.categoria,

      precio:
        Number(
          nuevoProducto.precio
        ),

      stockActual:
        stockActual,

      stockMinimo:
        stockMinimo,

      estado:
        this.calcularEstadoStock(
          stockActual,
          stockMinimo
        ),

      imagen:
        nuevoProducto.imagen,

      descripcion:
        nuevoProducto.descripcion
    }

    productos.push(
      productoCompleto
    )

    this.setTabla(
      'productos',
      productos
    )

    return {
      exito: true,
      mensaje:
        'Producto agregado correctamente.',
      producto:
        productoCompleto
    }
  },

  /*
     EDITAR PRODUCTO
  */
  actualizarProducto(
    id,
    datosActualizados
  ) {

    const productos =
      this.getTabla('productos')

    const indice =
      productos.findIndex(
        (producto) =>
          producto.id === id
      )

    if (indice === -1) {
      return {
        exito: false,
        mensaje:
          'No se encontró el producto.'
      }
    }

    /*
       VALIDAR CÓDIGO REPETIDO
    */
    const codigoExiste =
      productos.some(
        (producto) =>
          producto.codigo ===
            datosActualizados.codigo &&
          producto.id !== id
      )

    if (codigoExiste) {
      return {
        exito: false,
        mensaje:
          'Ya existe otro producto con ese código.'
      }
    }

    const stockActual =
      Number(
        datosActualizados.stockActual
      )

    const stockMinimo =
      Number(
        datosActualizados.stockMinimo
      )

    productos[indice] = {

      ...productos[indice],

      ...datosActualizados,

      id: id,

      precio:
        Number(
          datosActualizados.precio
        ),

      stockActual:
        stockActual,

      stockMinimo:
        stockMinimo,

      estado:
        this.calcularEstadoStock(
          stockActual,
          stockMinimo
        )
    }

    this.setTabla(
      'productos',
      productos
    )

    return {
      exito: true,
      mensaje:
        'Producto actualizado correctamente.'
    }
  },

  /*
     ELIMINAR PRODUCTO
  */
  eliminarProducto(id) {

    const productos =
      this.getTabla('productos')

    const productoExiste =
      productos.some(
        (producto) =>
          producto.id === id
      )

    if (!productoExiste) {
      return {
        exito: false,
        mensaje:
          'No se encontró el producto.'
      }
    }

    const productosActualizados =
      productos.filter(
        (producto) =>
          producto.id !== id
      )

    this.setTabla(
      'productos',
      productosActualizados
    )

    /*
       SI ESTABA EN EL CARRITO
       TAMBIÉN SE ELIMINA
    */
    const carrito =
      this.getCarrito()

    const carritoActualizado =
      carrito.filter(
        (item) =>
          item.id !== id
      )

    this.guardarCarrito(
      carritoActualizado
    )

    return {
      exito: true,
      mensaje:
        'Producto eliminado correctamente.'
    }
  },

  /*
     ELIMINAR REGISTRO GENÉRICO
  */
  eliminarRegistro(
    tabla,
    id
  ) {

    const datos =
      this.getTabla(tabla)
        .filter(
          (item) =>
            item.id !== id
        )

    this.setTabla(
      tabla,
      datos
    )
  },

  /*
     OBTENER CARRITO
  */
  getCarrito() {

    return this.getDato(
      'carritoFerreteria'
    ) || []
  },

  /*
     GUARDAR CARRITO
  */
  guardarCarrito(carrito) {

    this.setDato(
      'carritoFerreteria',
      carrito
    )

    window.dispatchEvent(
      new Event(
        'carritoActualizado'
      )
    )
  },

  /*
     AGREGAR AL CARRITO
  */
  agregarAlCarrito(
    idProducto,
    cantidad
  ) {

    const productos =
      this.getTabla('productos')

    const producto =
      productos.find(
        (producto) =>
          producto.id === idProducto
      )

    if (!producto) {
      return {
        exito: false,
        mensaje:
          'No se encontró el producto.'
      }
    }

    if (
      producto.stockActual <= 0
    ) {
      return {
        exito: false,
        mensaje:
          'Este producto no tiene stock disponible.'
      }
    }

    if (cantidad < 1) {
      return {
        exito: false,
        mensaje:
          'La cantidad debe ser mayor a 0.'
      }
    }

    const carrito =
      this.getCarrito()

    const itemEncontrado =
      carrito.find(
        (item) =>
          item.id === idProducto
      )

    let cantidadActual = 0

    if (itemEncontrado) {
      cantidadActual =
        itemEncontrado.cantidad
    }

    if (
      cantidadActual + cantidad >
      producto.stockActual
    ) {
      return {
        exito: false,
        mensaje:
          'No puedes superar el stock disponible.'
      }
    }

    if (itemEncontrado) {

      itemEncontrado.cantidad =
        itemEncontrado.cantidad +
        cantidad

    } else {

      carrito.push({
        id: idProducto,
        cantidad: cantidad
      })
    }

    this.guardarCarrito(
      carrito
    )

    return {
      exito: true,
      mensaje:
        'Producto agregado al carrito.'
    }
  },

  /*
     REALIZAR COMPRA
  */
  realizarCompra(
    metodoPago
  ) {

    /*
       VALIDAR MÉTODO
    */
    if (
      metodoPago !== 'debito' &&
      metodoPago !== 'credito'
    ) {
      return {
        exito: false,
        mensaje:
          'Selecciona un método de pago.'
      }
    }

    const carrito =
      this.getCarrito()

    /*
       VALIDAR CARRITO
    */
    if (carrito.length === 0) {

      return {
        exito: false,
        mensaje:
          'El carrito está vacío.'
      }
    }

    const productos =
      this.getTabla('productos')

    /*
       VALIDAR STOCK
       ANTES DE COMPRAR
    */
    for (
      const item of carrito
    ) {

      const producto =
        productos.find(
          (producto) =>
            producto.id ===
            item.id
        )

      if (!producto) {

        return {
          exito: false,
          mensaje:
            'Uno de los productos ya no está disponible.'
        }
      }

      if (
        producto.stockActual <= 0
      ) {

        return {
          exito: false,
          mensaje:
            `${producto.nombre} ya no tiene stock disponible.`
        }
      }

      if (
        item.cantidad >
        producto.stockActual
      ) {

        return {
          exito: false,
          mensaje:
            `No hay stock suficiente para ${producto.nombre}. Stock disponible: ${producto.stockActual}.`
        }
      }
    }

    /*
       DESCONTAR STOCK
    */
    const productosActualizados =
      productos.map(
        (producto) => {

          const itemCarrito =
            carrito.find(
              (item) =>
                item.id ===
                producto.id
            )

          if (!itemCarrito) {
            return producto
          }

          const nuevoStock =
            producto.stockActual -
            itemCarrito.cantidad

          return {

            ...producto,

            stockActual:
              nuevoStock,

            estado:
              this.calcularEstadoStock(
                nuevoStock,
                producto.stockMinimo
              )
          }
        }
      )

    /*
       GUARDAR NUEVO STOCK
    */
    this.setTabla(
      'productos',
      productosActualizados
    )

    /*
       VACIAR CARRITO
    */
    this.guardarCarrito([])

    return {
      exito: true,
      mensaje:
        'Compra realizada correctamente.'
    }
  }
}

MockDB.init()

export default MockDB