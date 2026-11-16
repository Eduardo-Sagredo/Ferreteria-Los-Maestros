import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MockDB from '../services/MockDB.js'
import productoService from '../api/productoService.js'
import { crearPedido } from '../api/pedidoService.js'

function Carrito() {

  // ESTADOS DEL COMPONENTE

  const [carrito, setCarrito] = useState([])
  const [productos, setProductos] = useState([])
  const [metodoPago, setMetodoPago] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [mensajeError, setMensajeError] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [procesando, setProcesando] = useState(false)

  // CARGAR PRODUCTOS DESDE SPRING BOOT

  useEffect(() => {

    async function cargarProductos() {

      try {

        setCargando(true)

        const productosBackend = await productoService.obtenerTodos()

        if (!Array.isArray(productosBackend)) {
          throw new Error('Formato de productos no válido')
        }

        const carritoGuardado = MockDB.getCarrito() || []

        const carritoValido = carritoGuardado.filter((item) =>
          productosBackend.some(
            (producto) =>
              Number(producto.id) === Number(item.id)
          )
        )

        if (carritoValido.length !== carritoGuardado.length) {
          MockDB.guardarCarrito(carritoValido)
        }

        setProductos(productosBackend)
        setCarrito(carritoValido)

      } catch (error) {

        console.error('Error al cargar productos:', error)

        mostrarMensaje(
          'No fue posible cargar los productos desde el servidor.',
          true
        )

      } finally {

        setCargando(false)

      }
    }

    cargarProductos()

  }, [])

  // MOSTRAR MENSAJES

  function mostrarMensaje(texto, esError = false) {
    setMensaje(texto)
    setMensajeError(esError)
  }

  // BUSCAR PRODUCTO

  function obtenerProducto(id) {

    return productos.find(
      (producto) => Number(producto.id) === Number(id)
    )

  }

  // ACTUALIZAR CARRITO

  function actualizarCarrito(nuevoCarrito) {

    setCarrito(nuevoCarrito)

    MockDB.guardarCarrito(nuevoCarrito)

  }

  // CAMBIAR CANTIDAD

  function cambiarCantidad(idProducto, nuevaCantidad) {

    const producto = obtenerProducto(idProducto)

    if (!producto) {
      mostrarMensaje('Producto no encontrado.', true)
      return
    }

    const stockDisponible = Number(producto.stockActual)

    if (stockDisponible <= 0) {

      mostrarMensaje(
        'Este producto ya no tiene stock disponible.',
        true
      )

      return
    }

    let cantidad = Number(nuevaCantidad)

    if (!Number.isInteger(cantidad) || cantidad < 1) {

      cantidad = 1

      mostrarMensaje(
        'La cantidad mínima es 1.',
        true
      )

    } else if (cantidad > stockDisponible) {

      cantidad = stockDisponible

      mostrarMensaje(
        'La cantidad no puede superar el stock disponible.',
        true
      )

    } else {

      setMensaje('')

    }

    const carritoActualizado = carrito.map((item) => {

      if (Number(item.id) === Number(idProducto)) {

        return {
          ...item,
          cantidad
        }

      }

      return item

    })

    actualizarCarrito(carritoActualizado)

  }

  // ELIMINAR PRODUCTO

  function eliminarProducto(idProducto) {

    const carritoActualizado = carrito.filter(
      (item) => Number(item.id) !== Number(idProducto)
    )

    actualizarCarrito(carritoActualizado)

    mostrarMensaje(
      'Producto eliminado del carrito.',
      false
    )

  }

  // REALIZAR COMPRA MEDIANTE API REST

  async function realizarCompra() {

    if (procesando) return

    // VALIDAR MÉTODO DE PAGO

    if (!metodoPago) {

      mostrarMensaje(
        'Selecciona un método de pago.',
        true
      )

      return

    }

    // VALIDAR CARRITO

    if (carrito.length === 0) {

      mostrarMensaje(
        'El carrito está vacío.',
        true
      )

      return

    }

    // VALIDAR SESIÓN

    const token = localStorage.getItem('token')

    if (!token) {

      mostrarMensaje(
        'Debes iniciar sesión para realizar una compra.',
        true
      )

      return

    }

    // VALIDAR STOCK Y CANTIDADES

    for (const item of carrito) {

      const producto = obtenerProducto(item.id)

      if (!producto) {

        mostrarMensaje(
          'Uno de los productos ya no está disponible.',
          true
        )

        return

      }

      const cantidad = Number(item.cantidad)
      const stock = Number(producto.stockActual)

      if (!Number.isInteger(cantidad) || cantidad < 1) {

        mostrarMensaje(
          'La cantidad de productos debe ser mayor a cero.',
          true
        )

        return

      }

      if (cantidad > stock) {

        mostrarMensaje(
          `No hay stock suficiente para ${producto.nombre}. Stock disponible: ${stock}.`,
          true
        )

        return

      }
    }

    // PREPARAR DATOS PARA SPRING BOOT

    const productosPedido = carrito.map((item) => ({
      productoId: Number(item.id),
      cantidad: Number(item.cantidad)
    }))

    // ENVIAR PEDIDO AL BACKEND

    try {

      setProcesando(true)
      setMensaje('')

      const pedidoCreado = await crearPedido(productosPedido)

      // LIMPIAR CARRITO DESPUÉS DEL ÉXITO

      actualizarCarrito([])

      setMetodoPago('')

      mostrarMensaje(
        `¡Pedido #${pedidoCreado.id} registrado correctamente! El pago no ha sido procesado.`,
        false
      )

      // ACTUALIZAR PRODUCTOS Y STOCK

      try {

        const productosActualizados =
          await productoService.obtenerTodos()

        if (Array.isArray(productosActualizados)) {
          setProductos(productosActualizados)
        }

      } catch (error) {

        console.error(
          'No fue posible actualizar el catálogo:',
          error
        )

      }

    } catch (error) {

      console.error('Error al crear pedido:', error)

      const mensajeServidor =
        error.response?.data?.mensaje ||
        error.response?.data?.detail ||
        error.response?.data?.message

      if (error.response?.status === 401) {

        mostrarMensaje(
          'Tu sesión no es válida. Vuelve a iniciar sesión.',
          true
        )

      } else if (error.response?.status === 403) {

        mostrarMensaje(
          'No tienes permisos para realizar esta compra.',
          true
        )

      } else {

        mostrarMensaje(
          mensajeServidor ||
          'No fue posible registrar el pedido. Verifica la conexión y el stock disponible.',
          true
        )

      }

    } finally {

      setProcesando(false)

    }
  }

  // CALCULAR TOTAL DE UNIDADES

  const cantidadTotal = carrito.reduce(
    (total, item) =>
      total + Number(item.cantidad),
    0
  )

  // CALCULAR TOTAL DEL CARRITO

  const totalCarrito = carrito.reduce((total, item) => {

    const producto = obtenerProducto(item.id)

    if (!producto) return total

    return (
      total +
      Number(producto.precio) * Number(item.cantidad)
    )

  }, 0)

  // INTERFAZ DEL CARRITO

  return (

    <main className="carrito-section">

      <div className="container py-5">

        <div className="text-center mb-4">

          <p className="carrito-etiqueta">
            TU COMPRA
          </p>

          <h1 className="carrito-titulo">
            Carrito de compras
          </h1>

        </div>

        {/* MENSAJES */}

        {mensaje !== '' && (

          <div
            className={
              mensajeError
                ? 'alert alert-danger mb-3'
                : 'alert alert-success mb-3'
            }
          >

            {mensaje}

          </div>

        )}

        {/* CARGANDO PRODUCTOS */}

        {cargando ? (

          <div className="text-center py-5">

            <div
              className="spinner-border text-warning"
              role="status"
            >
              <span className="visually-hidden">
                Cargando...
              </span>
            </div>

            <p className="mt-3">
              Cargando carrito de compras...
            </p>

          </div>

        ) : carrito.length === 0 ? (

          // CARRITO VACÍO

          <div className="carrito-vacio text-center py-5">

            <i className="bi bi-cart-x fs-1"></i>

            <h2 className="h4 mt-3">
              Tu carrito está vacío
            </h2>

            <p>
              Agrega productos desde nuestro catálogo.
            </p>

            <Link
              to="/productos"
              className="btn btn-warning"
            >
              Ver productos
            </Link>

          </div>

        ) : (

          // CARRITO CON PRODUCTOS

          <div className="row g-4">

            <div className="col-12 col-lg-8">

              {carrito.map((item) => {

                const producto = obtenerProducto(item.id)

                if (!producto) return null

                const subtotal =
                  Number(producto.precio) * Number(item.cantidad)

                return (

                  <div
                    className="carrito-item"
                    key={item.id}
                  >

                    <div className="row g-3 align-items-center">

                      {/* IMAGEN */}

                      <div className="col-4 col-md-2 text-center">

                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="carrito-imagen"
                        />

                      </div>

                      {/* INFORMACIÓN DEL PRODUCTO */}

                      <div className="col-8 col-md-4">

                        <h2 className="carrito-producto-nombre">
                          {producto.nombre}
                        </h2>

                        <p className="mb-1">

                          ${Number(producto.precio).toLocaleString('es-CL')} c/u

                        </p>

                        <small>

                          Stock disponible: {producto.stockActual}

                        </small>

                      </div>

                      {/* CANTIDAD */}

                      <div className="col-6 col-md-2">

                        <label
                          htmlFor={`cantidad-${producto.id}`}
                          className="form-label"
                        >
                          Cantidad
                        </label>

                        <input
                          type="number"
                          id={`cantidad-${producto.id}`}
                          className="form-control"
                          value={item.cantidad}
                          min="1"
                          max={producto.stockActual}
                          disabled={procesando}
                          onChange={(evento) =>
                            cambiarCantidad(
                              producto.id,
                              evento.target.value
                            )
                          }
                        />

                      </div>

                      {/* SUBTOTAL */}

                      <div className="col-6 col-md-2">

                        <p className="fw-bold mb-1">
                          Subtotal
                        </p>

                        <p className="mb-0">

                          ${subtotal.toLocaleString('es-CL')}

                        </p>

                      </div>

                      {/* ELIMINAR PRODUCTO */}

                      <div className="col-12 col-md-2 text-md-end">

                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          disabled={procesando}
                          onClick={() =>
                            eliminarProducto(producto.id)
                          }
                        >

                          <i className="bi bi-trash"></i>{' '}
                          Eliminar

                        </button>

                      </div>

                    </div>

                  </div>

                )

              })}

            </div>

            {/* RESUMEN DE COMPRA */}

            <div className="col-12 col-lg-4">

              <div className="carrito-resumen">

                <h2>
                  Resumen
                </h2>

                {/* TOTAL DE UNIDADES */}

                <div className="resumen-linea">

                  <span>
                    Unidades
                  </span>

                  <strong>
                    {cantidadTotal}
                  </strong>

                </div>

                <hr />

                {/* TOTAL A PAGAR */}

                <div className="resumen-total">

                  <span>
                    Total
                  </span>

                  <strong>

                    ${totalCarrito.toLocaleString('es-CL')}

                  </strong>

                </div>

                <hr />

                {/* MÉTODO DE PAGO */}

                <p className="fw-bold mb-3">
                  Método de pago
                </p>

                <div className="form-check mb-2">

                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodoPago"
                    id="debito"
                    value="debito"
                    checked={metodoPago === 'debito'}
                    disabled={procesando}
                    onChange={(evento) =>
                      setMetodoPago(evento.target.value)
                    }
                  />

                  <label
                    className="form-check-label"
                    htmlFor="debito"
                  >

                    <i className="bi bi-credit-card"></i>{' '}
                    Débito

                  </label>

                </div>

                <div className="form-check mb-4">

                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodoPago"
                    id="credito"
                    value="credito"
                    checked={metodoPago === 'credito'}
                    disabled={procesando}
                    onChange={(evento) =>
                      setMetodoPago(evento.target.value)
                    }
                  />

                  <label
                    className="form-check-label"
                    htmlFor="credito"
                  >

                    <i className="bi bi-credit-card-2-front"></i>{' '}
                    Crédito

                  </label>

                </div>

                <p className="small text-muted">
                  La selección es referencial. El sistema registra
                  el pedido, pero no realiza un cobro.
                </p>

                {/* BOTÓN DE COMPRA */}

                <button
                  type="button"
                  className="btn btn-success w-100 mb-2"
                  onClick={realizarCompra}
                  disabled={procesando}
                >

                  <i className="bi bi-bag-check"></i>{' '}

                  {procesando
                    ? 'Registrando pedido...'
                    : 'Registrar pedido'
                  }

                </button>

                {/* SEGUIR COMPRANDO */}

                <Link
                  to="/productos"
                  className="btn btn-warning w-100"
                >

                  Seguir comprando

                </Link>

              </div>

            </div>

          </div>

        )}

      </div>

    </main>

  )
}

export default Carrito