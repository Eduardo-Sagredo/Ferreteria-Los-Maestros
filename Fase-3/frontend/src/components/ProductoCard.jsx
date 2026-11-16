import { Link } from 'react-router-dom'
import MockDB from '../services/MockDB.js'

function ProductoCard({ producto, mostrarMensaje }) {

  // VERIFICAR DISPONIBILIDAD DEL PRODUCTO

  const stockDisponible = Number(producto.stockActual)

  const sinStock =
    !Number.isFinite(stockDisponible) ||
    stockDisponible <= 0

  // AGREGAR PRODUCTO AL CARRITO

  function agregarProducto() {

    const idProducto = Number(producto.id)

    if (!Number.isInteger(idProducto) || idProducto <= 0) {

      mostrarMensaje(
        'El producto no tiene un identificador válido.',
        true
      )

      return
    }

    // VERIFICAR STOCK

    if (sinStock) {

      mostrarMensaje(
        'Este producto no tiene stock disponible.',
        true
      )

      return
    }

    // OBTENER CARRITO ACTUAL

    const carritoActual = MockDB.getCarrito() || []

    // COMPROBAR SI EL PRODUCTO YA EXISTE

    const productoExistente = carritoActual.find(
      (item) => Number(item.id) === idProducto
    )

    const cantidadActual = productoExistente
      ? Number(productoExistente.cantidad)
      : 0

    // VALIDAR QUE NO SE SUPERE EL STOCK

    if (cantidadActual + 1 > stockDisponible) {

      mostrarMensaje(
        'No puedes agregar más unidades que el stock disponible.',
        true
      )

      return
    }

    // ACTUALIZAR PRODUCTO EXISTENTE O AGREGAR UNO NUEVO

    let carritoActualizado

    if (productoExistente) {

      carritoActualizado = carritoActual.map((item) => {

        if (Number(item.id) === idProducto) {

          return {
            ...item,
            id: idProducto,
            cantidad: Number(item.cantidad) + 1
          }
        }

        return item
      })

    } else {

      carritoActualizado = [
        ...carritoActual,
        {
          id: idProducto,
          cantidad: 1
        }
      ]

    }

    // GUARDAR CARRITO TEMPORALMENTE

    MockDB.guardarCarrito(carritoActualizado)

    mostrarMensaje(
      'Producto agregado al carrito.',
      false
    )
  }

  // INTERFAZ DE LA TARJETA

  return (

    <div className="card h-100 producto-card">

      {/* IMAGEN DEL PRODUCTO */}

      <div className="producto-imagen-contenedor">

        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="producto-img"
        />

      </div>

      <div className="card-body d-flex flex-column">

        {/* CATEGORÍA */}

        <p className="producto-categoria">
          {producto.categoria}
        </p>

        {/* NOMBRE */}

        <h5 className="producto-nombre">
          {producto.nombre}
        </h5>

        {/* PRECIO */}

        <p className="producto-precio">

          ${Number(producto.precio).toLocaleString('es-CL')}

        </p>

        {/* STOCK */}

        {sinStock ? (

          <p className="producto-sin-stock">
            Sin stock
          </p>

        ) : (

          <p className="producto-stock">

            Stock: {stockDisponible}

          </p>

        )}

        {/* BOTONES */}

        <div className="d-flex gap-2 mt-auto">

          <Link
            to={`/producto/${producto.id}`}
            className="btn btn-warning producto-btn-ver"
          >
            Ver producto
          </Link>

          <button
            type="button"
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