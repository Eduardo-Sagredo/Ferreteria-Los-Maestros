import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductoCard from '../components/ProductoCard.jsx'
import MockDB from '../services/MockDB.js'

function Productos() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [mensajeError, setMensajeError] = useState(false)

  const [searchParams] = useSearchParams()

  const categoriaSeleccionada =
    searchParams.get('categoria')

  useEffect(() => {
    const productosGuardados =
      MockDB.getTabla('productos')

    setProductos(productosGuardados)
  }, [])

  function mostrarMensaje(texto, esError) {
    setMensaje(texto)
    setMensajeError(esError)
  }

  const productosFiltrados =
    productos.filter((producto) => {

      const coincideBusqueda =
        producto.nombre
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )

      const coincideCategoria =
        !categoriaSeleccionada ||
        producto.categoria ===
          categoriaSeleccionada

      return (
        coincideBusqueda &&
        coincideCategoria
      )
    })

  return (
    <main className="catalogo-section">

      <div className="container py-5">

        <div className="catalogo-encabezado">

          <p className="seccion-etiqueta">
            FERRETERÍA LOS MAESTROS
          </p>

          <h1>
            Catálogo de productos
          </h1>

          <p className="catalogo-descripcion">
            Busca por nombre o entra directamente a una categoría.
          </p>

          <div className="buscador-catalogo">

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(evento) =>
                  setBusqueda(
                    evento.target.value
                  )
                }
              />

            </div>

          </div>

          <div className="filtros-catalogo">

            <Link
              to="/productos"
              className="btn btn-outline-dark"
            >
              Todos
            </Link>

            <Link
              to="/productos?categoria=herramientas"
              className="btn btn-outline-dark"
            >
              Herramientas
            </Link>

            <Link
              to="/productos?categoria=construccion"
              className="btn btn-outline-dark"
            >
              Construcción
            </Link>

            <Link
              to="/productos?categoria=electricidad"
              className="btn btn-outline-dark"
            >
              Electricidad
            </Link>

            <Link
              to="/productos?categoria=pinturas"
              className="btn btn-outline-dark"
            >
              Pinturas
            </Link>

          </div>

        </div>

        {mensaje !== '' && (
          <div
            className={
              mensajeError
                ? 'alert alert-danger'
                : 'alert alert-success'
            }
          >
            {mensaje}
          </div>
        )}

        <div className="row g-4">

          {productosFiltrados.length > 0 ? (

            productosFiltrados.map(
              (producto) => (

                <div
                  className="col-12 col-md-6 col-lg-3"
                  key={producto.id}
                >

                  <ProductoCard
                    producto={producto}
                    mostrarMensaje={
                      mostrarMensaje
                    }
                  />

                </div>

              )
            )

          ) : (

            <div className="col-12 text-center py-5">
              <p className="fs-5 text-muted">
                No se encontraron productos.
              </p>
            </div>

          )}

        </div>

      </div>

    </main>
  )
}

export default Productos