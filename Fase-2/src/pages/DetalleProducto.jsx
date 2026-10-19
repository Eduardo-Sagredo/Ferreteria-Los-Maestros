import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MockDB from '../services/MockDB.js'

function DetalleProducto() {
  const { id } = useParams()

  const [producto, setProducto] = useState(null)
  const [cantidad, setCantidad] = useState(1)

  const [mensaje, setMensaje] = useState('')
  const [mensajeError, setMensajeError] = useState(false)

  useEffect(() => {
    const productos = MockDB.getTabla('productos')

    const productoEncontrado = productos.find(
      (producto) => producto.id === Number(id)
    )

    setProducto(productoEncontrado)
  }, [id])

  if (!producto) {
    return (
      <main className="container py-5">

        <h1>
          Producto no encontrado
        </h1>

        <Link
          to="/productos"
          className="btn btn-dark mt-3"
        >
          Volver al catálogo
        </Link>

      </main>
    )
  }

  const sinStock =
    producto.stockActual <= 0

  function mostrarMensaje(
    texto,
    esError
  ) {
    setMensaje(texto)
    setMensajeError(esError)
  }

  function cambiarCantidad(evento) {
    let nuevaCantidad =
      Number(evento.target.value)

    if (nuevaCantidad < 1) {

      nuevaCantidad = 1

      mostrarMensaje(
        'La cantidad mínima es 1.',
        true
      )
    }

    if (
      nuevaCantidad >
      producto.stockActual
    ) {

      nuevaCantidad =
        producto.stockActual

      mostrarMensaje(
        'La cantidad no puede superar el stock disponible.',
        true
      )
    }

    setCantidad(nuevaCantidad)
  }

  function agregarProducto() {

    const resultado =
      MockDB.agregarAlCarrito(
        producto.id,
        cantidad
      )

    mostrarMensaje(
      resultado.mensaje,
      !resultado.exito
    )
  }

  return (
    <main className="detalle-producto-section">

      <div className="container">

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

        <div className="detalle-producto-card">

          <div className="row align-items-center g-5">

            <div className="col-12 col-md-6 text-center">

              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="detalle-producto-img"
              />

            </div>

            <div className="col-12 col-md-6">

              <p className="detalle-categoria">
                {producto.categoria}
              </p>

              <h1 className="detalle-nombre">
                {producto.nombre}
              </h1>

              <p className="detalle-descripcion">
                {producto.descripcion}
              </p>

              <p className="detalle-precio">
                $
                {producto.precio.toLocaleString(
                  'es-CL'
                )}
              </p>

              {sinStock ? (

                <p className="detalle-sin-stock">
                  Producto sin stock
                </p>

              ) : (

                <p className="detalle-stock">
                  {producto.stockActual} unidades disponibles
                </p>

              )}

              {!sinStock && (
                <>

                  <label
                    htmlFor="cantidad"
                    className="form-label mt-3"
                  >
                    Cantidad
                  </label>

                  <div className="row g-3 mb-4">

                    <div className="col-12 col-md-4">

                      <input
                        id="cantidad"
                        type="number"
                        className="form-control"
                        value={cantidad}
                        min="1"
                        max={
                          producto.stockActual
                        }
                        onChange={
                          cambiarCantidad
                        }
                      />

                    </div>

                    <div className="col-12 col-md-8">

                      <button
                        className="btn btn-warning w-100"
                        onClick={
                          agregarProducto
                        }
                      >
                        <i className="bi bi-cart-plus"></i>{' '}
                        Agregar al carrito
                      </button>

                    </div>

                  </div>

                </>
              )}

              <Link
                to="/productos"
                className="btn btn-dark"
              >
                <i className="bi bi-arrow-left"></i>{' '}
                Volver al catálogo
              </Link>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}

export default DetalleProducto