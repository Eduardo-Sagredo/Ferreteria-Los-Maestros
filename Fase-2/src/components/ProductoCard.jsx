function ProductoCard({ producto }) {

  const sinStock = producto.stockActual <= 0

  return (
    <div className="card h-100 shadow-sm producto-card">

      <img
        src={producto.imagen}
        className="card-img-top producto-img"
        alt={producto.nombre}
      />

      <div className="card-body d-flex flex-column">

        <h5 className="card-title">
          {producto.nombre}
        </h5>

        <p className="text-muted">
          {producto.categoria}
        </p>

        <p className="card-text">
          {producto.descripcion}
        </p>

        <p className="fw-bold fs-5">
          ${producto.precio.toLocaleString('es-CL')}
        </p>

        {sinStock ? (
          <span className="badge bg-danger mb-3">
            Sin stock
          </span>
        ) : (
          <span className="badge bg-success mb-3">
            Stock: {producto.stockActual}
          </span>
        )}

        <button
          className="btn btn-warning mt-auto"
          disabled={sinStock}
        >
          {sinStock
            ? 'Producto sin stock'
            : 'Agregar al carrito'}
        </button>

      </div>

    </div>
  )
}

export default ProductoCard