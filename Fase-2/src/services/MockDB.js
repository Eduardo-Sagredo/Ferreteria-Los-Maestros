import { 
  productosIniciales, 
  pedidosIniciales, 
  usuariosIniciales 
} from '../data/productos.js' // Asegúrate de que la ruta sea correcta

const MockDB = {
  // ==========================================
  // INICIAR BASE DE DATOS
  // ==========================================
  init() {
    if (!localStorage.getItem('db_productos')) {
      localStorage.setItem('db_productos', JSON.stringify(productosIniciales))
    }
    // Inicializamos también pedidos y usuarios
    if (!localStorage.getItem('db_pedidos')) {
      localStorage.setItem('db_pedidos', JSON.stringify(pedidosIniciales))
    }
    if (!localStorage.getItem('db_usuarios')) {
      localStorage.setItem('db_usuarios', JSON.stringify(usuariosIniciales || []))
    }
    if (!localStorage.getItem('carritoFerreteria')) {
      localStorage.setItem('carritoFerreteria', JSON.stringify([]))
    }
  },

  // ==========================================
  // FUNCIONES BASE (GETTERS Y SETTERS)
  // ==========================================
  getTabla(tabla) {
    return JSON.parse(localStorage.getItem(`db_${tabla}`)) || []
  },

  setTabla(tabla, datos) {
    localStorage.setItem(`db_${tabla}`, JSON.stringify(datos))
    // Emitimos un evento genérico por si React necesita actualizar la pantalla
    window.dispatchEvent(new Event(`db_${tabla}_actualizada`))
  },

  getDato(clave) {
    return JSON.parse(localStorage.getItem(clave))
  },

  setDato(clave, dato) {
    localStorage.setItem(clave, JSON.stringify(dato))
  },

  eliminarDato(clave) {
    localStorage.removeItem(clave)
  },

  eliminarRegistro(tabla, id) {
    const datos = this.getTabla(tabla).filter((item) => item.id !== id)
    this.setTabla(tabla, datos)
    return { exito: true, mensaje: 'Registro eliminado correctamente.' }
  },

  // ==========================================
  // LÓGICA DE PRODUCTOS (ADMIN / VENDEDOR)
  // ==========================================
  calcularEstadoStock(stockActual, stockMinimo) {
    if (stockActual <= 0) return 'Sin stock'
    if (stockActual <= stockMinimo) return 'Stock bajo'
    return 'Disponible'
  },

  actualizarStockProducto(id, nuevoStock) {
    const productos = this.getTabla('productos')
    const producto = productos.find((p) => p.id === id)

    if (!producto) {
      return { exito: false, mensaje: 'No se encontró el producto.' }
    }

    producto.stockActual = Number(nuevoStock)
    producto.estado = this.calcularEstadoStock(producto.stockActual, producto.stockMinimo)

    this.setTabla('productos', productos)
    return { exito: true, mensaje: 'Stock actualizado correctamente.' }
  },

  agregarProducto(nuevoProducto) {
    const productos = this.getTabla('productos')
    const codigoExiste = productos.some((p) => p.codigo === nuevoProducto.codigo)

    if (codigoExiste) {
      return { exito: false, mensaje: 'Ya existe un producto con ese código.' }
    }

    let nuevoId = 1
    if (productos.length > 0) {
      nuevoId = Math.max(...productos.map((p) => p.id)) + 1
    }

    const stockActual = Number(nuevoProducto.stockActual)
    const stockMinimo = Number(nuevoProducto.stockMinimo)

    const productoCompleto = {
      ...nuevoProducto,
      id: nuevoId,
      precio: Number(nuevoProducto.precio),
      stockActual,
      stockMinimo,
      estado: this.calcularEstadoStock(stockActual, stockMinimo)
    }

    productos.push(productoCompleto)
    this.setTabla('productos', productos)

    return { exito: true, mensaje: 'Producto agregado correctamente.', producto: productoCompleto }
  },

  editarProducto(id, datosActualizados) {
    const productos = this.getTabla('productos')
    const indice = productos.findIndex((p) => p.id === id)

    if (indice === -1) {
      return { exito: false, mensaje: 'No se encontró el producto.' }
    }

    const codigoExiste = productos.some(
      (p) => p.codigo === datosActualizados.codigo && p.id !== id
    )

    if (codigoExiste) {
      return { exito: false, mensaje: 'Ya existe otro producto con ese código.' }
    }

    const stockActual = Number(datosActualizados.stockActual)
    const stockMinimo = Number(datosActualizados.stockMinimo)

    productos[indice] = {
      ...productos[indice],
      ...datosActualizados,
      id: id,
      precio: Number(datosActualizados.precio),
      stockActual,
      stockMinimo,
      estado: this.calcularEstadoStock(stockActual, stockMinimo)
    }

    this.setTabla('productos', productos)
    return { exito: true, mensaje: 'Producto actualizado correctamente.' }
  },

  eliminarProducto(id) {
    const productos = this.getTabla('productos')
    const productoExiste = productos.some((p) => p.id === id)

    if (!productoExiste) {
      return { exito: false, mensaje: 'No se encontró el producto.' }
    }

    // Eliminar de la base de datos
    this.eliminarRegistro('productos', id)

    // Si estaba en el carrito, también se elimina
    const carrito = this.getCarrito()
    const carritoActualizado = carrito.filter((item) => item.id !== id)
    this.guardarCarrito(carritoActualizado)

    return { exito: true, mensaje: 'Producto eliminado correctamente.' }
  },

  // ==========================================
  // LÓGICA DE USUARIOS (ADMINISTRADOR)
  // ==========================================
  agregarUsuario(nuevoUsuario) {
    const usuarios = this.getTabla('usuarios')
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1
    
    usuarios.push({ ...nuevoUsuario, id: nuevoId })
    this.setTabla('usuarios', usuarios)
    
    return { exito: true, mensaje: 'Usuario agregado correctamente.' }
  },

  editarUsuario(id, datosActualizados) {
    const usuarios = this.getTabla('usuarios')
    const indice = usuarios.findIndex((u) => u.id === id)

    if (indice === -1) {
      return { exito: false, mensaje: 'No se encontró el usuario.' }
    }

    usuarios[indice] = { ...usuarios[indice], ...datosActualizados }
    this.setTabla('usuarios', usuarios)
    
    return { exito: true, mensaje: 'Usuario actualizado correctamente.' }
  },

  eliminarUsuario(id) {
    return this.eliminarRegistro('usuarios', id)
  },

  // ==========================================
  // LÓGICA DEL CARRITO Y COMPRAS (CLIENTE)
  // ==========================================
  getCarrito() {
    return this.getDato('carritoFerreteria') || []
  },

  guardarCarrito(carrito) {
    this.setDato('carritoFerreteria', carrito)
    window.dispatchEvent(new Event('carritoActualizado'))
  },

  agregarAlCarrito(idProducto, cantidad) {
    const productos = this.getTabla('productos')
    const producto = productos.find((p) => p.id === idProducto)

    if (!producto) return { exito: false, mensaje: 'No se encontró el producto.' }
    if (producto.stockActual <= 0) return { exito: false, mensaje: 'Este producto no tiene stock disponible.' }
    if (cantidad < 1) return { exito: false, mensaje: 'La cantidad debe ser mayor a 0.' }

    const carrito = this.getCarrito()
    const itemEncontrado = carrito.find((item) => item.id === idProducto)
    let cantidadActual = itemEncontrado ? itemEncontrado.cantidad : 0

    if (cantidadActual + cantidad > producto.stockActual) {
      return { exito: false, mensaje: 'No puedes superar el stock disponible.' }
    }

    if (itemEncontrado) {
      itemEncontrado.cantidad += cantidad
    } else {
      carrito.push({ id: idProducto, cantidad: cantidad })
    }

    this.guardarCarrito(carrito)
    return { exito: true, mensaje: 'Producto agregado al carrito.' }
  },

  realizarCompra(metodoPago) {
    if (metodoPago !== 'debito' && metodoPago !== 'credito') {
      return { exito: false, mensaje: 'Selecciona un método de pago.' }
    }

    const carrito = this.getCarrito()
    if (carrito.length === 0) {
      return { exito: false, mensaje: 'El carrito está vacío.' }
    }

    const productos = this.getTabla('productos')

    // Validar stock antes de comprar
    for (const item of carrito) {
      const producto = productos.find((p) => p.id === item.id)
      if (!producto) return { exito: false, mensaje: 'Uno de los productos ya no está disponible.' }
      if (producto.stockActual <= 0) return { exito: false, mensaje: `${producto.nombre} ya no tiene stock disponible.` }
      if (item.cantidad > producto.stockActual) {
        return { exito: false, mensaje: `No hay stock suficiente para ${producto.nombre}. Stock disponible: ${producto.stockActual}.` }
      }
    }

    // Descontar stock
    const productosActualizados = productos.map((producto) => {
      const itemCarrito = carrito.find((item) => item.id === producto.id)
      if (!itemCarrito) return producto

      const nuevoStock = producto.stockActual - itemCarrito.cantidad
      return {
        ...producto,
        stockActual: nuevoStock,
        estado: this.calcularEstadoStock(nuevoStock, producto.stockMinimo)
      }
    })

    // Guardar cambios
    this.setTabla('productos', productosActualizados)
    this.guardarCarrito([])

    return { exito: true, mensaje: 'Compra realizada correctamente.' }
  }
}

// Inicializamos la base de datos automáticamente al cargar el archivo
MockDB.init()

export default MockDB