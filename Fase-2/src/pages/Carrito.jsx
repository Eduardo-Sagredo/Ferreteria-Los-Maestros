import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MockDB from '../services/MockDB.js'

function Carrito() {
  const [carrito, setCarrito] = useState([])
  const [productos, setProductos] = useState([])
  const [metodoPago, setMetodoPago] = useState('')

  const [mensaje, setMensaje] = useState('')
  const [mensajeError, setMensajeError] = useState(false)

  useEffect(() => {
    setCarrito(MockDB.getCarrito())
    setProductos(MockDB.getTabla('productos'))
  }, [])

  function mostrarMensaje(texto, esError) {
    setMensaje(texto)
    setMensajeError(esError)
  }

  function obtenerProducto(id) {
    return productos.find(
      (producto) => producto.id === id
    )
  }

  function actualizarCarrito(nuevoCarrito) {
    setCarrito(nuevoCarrito)
    MockDB.guardarCarrito(nuevoCarrito)
  }

  function cambiarCantidad(idProducto, nuevaCantidad) {
    const producto = obtenerProducto(idProducto)

    if (!producto) {
      return
    }

    let cantidad = Number(nuevaCantidad)

    if (cantidad < 1) {
      cantidad = 1

      mostrarMensaje(
        'La cantidad mínima es 1.',
        true
      )
    }

    if (cantidad > producto.stockActual) {
      cantidad = producto.stockActual

      mostrarMensaje(
        'La cantidad no puede superar el stock disponible.',
        true
      )
    }

    const carritoActualizado = carrito.map((item) => {
      if (item.id === idProducto) {
        return {
          ...item,
          cantidad: cantidad
        }
      }

      return item
    })

    actualizarCarrito(carritoActualizado)
  }

  function eliminarProducto(idProducto) {
    const carritoActualizado = carrito.filter(
      (item) => item.id !== idProducto
    )

    actualizarCarrito(carritoActualizado)

    mostrarMensaje(
      'Producto eliminado del carrito.',
      false
    )
  }

  function realizarCompra() {
    if (carrito.length === 0) {
      mostrarMensaje(
        'El carrito está vacío.',
        true
      )

      return
    }

    if (metodoPago === '') {
      mostrarMensaje(
        'Selecciona un método de pago.',
        true
      )

      return
    }

    actualizarCarrito([])

    setMetodoPago('')

    mostrarMensaje(
      'Compra realizada correctamente.',
      false
    )
  }

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  )

  const totalCarrito = carrito.reduce(
    (total, item) => {
      const producto = obtenerProducto(item.id)

      if (!producto) {
        return total
      }

      return total + producto.precio * item.cantidad
    },
    0
  )

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

        {carrito.length === 0 ? (

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

          <div className="row g-4">

            <div className="col-12 col-lg-8">

              {carrito.map((item) => {

                const producto = obtenerProducto(item.id)

                if (!producto) {
                  return null
                }

                const subtotal =
                  producto.precio * item.cantidad

                return (
                  <div
                    className="carrito-item"
                    key={item.id}
                  >

                    <div className="row g-3 align-items-center">

                      <div className="col-4 col-md-2 text-center">

                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="carrito-imagen"
                        />

                      </div>

                      <div className="col-8 col-md-4">

                        <h2 className="carrito-producto-nombre">
                          {producto.nombre}
                        </h2>

                        <p className="mb-1">
                          ${producto.precio.toLocaleString('es-CL')} c/u
                        </p>

                        <small>
                          Stock disponible: {producto.stockActual}
                        </small>

                      </div>

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
                          onChange={(evento) =>
                            cambiarCantidad(
                              producto.id,
                              evento.target.value
                            )
                          }
                        />

                      </div>

                      <div className="col-6 col-md-2">

                        <p className="fw-bold mb-1">
                          Subtotal
                        </p>

                        <p className="mb-0">
                          ${subtotal.toLocaleString('es-CL')}
                        </p>

                      </div>

                      <div className="col-12 col-md-2 text-md-end">

                        <button
                          className="btn btn-outline-danger"
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

            <div className="col-12 col-lg-4">

              <div className="carrito-resumen">

                <h2>
                  Resumen
                </h2>

                <div className="resumen-linea">

                  <span>
                    Unidades
                  </span>

                  <strong>
                    {cantidadTotal}
                  </strong>

                </div>

                <hr />

                <div className="resumen-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ${totalCarrito.toLocaleString('es-CL')}
                  </strong>

                </div>

                <hr />

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

                <button
                  className="btn btn-success w-100 mb-2"
                  onClick={realizarCompra}
                >
                  <i className="bi bi-bag-check"></i>{' '}
                  Realizar compra
                </button>

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