import { Link } from 'react-router-dom'
import MockDB from '../services/MockDB.js'

function ProductoCard({ producto, mostrarMensaje }) {
  const sinStock = producto.stockActual <= 0

  function agregarProducto() {
    const resultado = MockDB.agregarAlCarrito(
      producto.id,
      1
    )

    mostrarMensaje(
      resultado.mensaje,
      !resultado.exito
    )
  }

  return (
    <div className="card h-100 producto-card">

      <div className="producto-imagen-contenedor">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="producto-img"
        />
      </div>

      <div className="card-body d-flex flex-column">

        <p className="producto-categoria">
          {producto.categoria}
        </p>

        <h5 className="producto-nombre">
          {producto.nombre}
        </h5>

        <p className="producto-precio">
          ${producto.precio.toLocaleString('es-CL')}
        </p>

        {sinStock ? (
          <p className="producto-sin-stock">
            Sin stock
          </p>
        ) : (
          <p className="producto-stock">
            Stock: {producto.stockActual}
          </p>
        )}

        <div className="d-flex gap-2 mt-auto">

          <Link
            to={`/producto/${producto.id}`}
            className="btn btn-warning producto-btn-ver"
          >
            Ver producto
          </Link>

          <button
            className="btn btn-dark producto-btn-agregar"
            disabled={sinStock}
            onClick={agregarProducto}
          >
            <i className="bi bi-cart-plus"></i>{' '}
            {sinStock ? 'Sin stock' : 'Agregar'}
          </button>

        </div>

      </div>

    </div>
  )
}

export default ProductoCard