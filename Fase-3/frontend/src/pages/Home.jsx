import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MockDB from '../services/MockDB.js'

function Home() {
  const [productosDestacados, setProductosDestacados] = useState([])

  useEffect(() => {
    const productos = MockDB.getTabla('productos')

    /*
       PRODUCTOS DESTACADOS
    */
    const destacados = productos.filter(
      (producto) =>
        producto.id === 1 ||
        producto.id === 16 ||
        producto.id === 4
    )

    setProductosDestacados(destacados)
  }, [])

  return (
    <main>

      {/* HERO */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-12 col-lg-6">

              <span className="text-warning fw-bold text-uppercase etiqueta-home">
                Ferretería Los Maestros
              </span>

              <h1>
                Todo lo que necesitas para tu obra en un solo lugar
              </h1>

              <p>
                Encuentra herramientas, materiales de construcción
                y productos de ferretería para todos tus proyectos.
              </p>

              <Link
                to="/productos"
                className="btn btn-warning"
              >
                Ver productos
              </Link>

            </div>

          </div>
        </div>
      </section>


      {/* CATEGORÍAS */}
      <section className="categorias">
        <div className="container">

          <h2 className="text-center">
            Categorías
          </h2>

          <div className="row g-4">

            <div className="col-12 col-md-6 col-lg-3">

              <Link
                to="/productos?categoria=herramientas"
                className="text-decoration-none"
              >
                <div className="card categoria-card text-center">

                  <div className="card-body">

                    <i className="bi bi-tools fs-1"></i>

                    <h3 className="mt-3">
                      Herramientas
                    </h3>

                  </div>

                </div>
              </Link>

            </div>


            <div className="col-12 col-md-6 col-lg-3">

              <Link
                to="/productos?categoria=construccion"
                className="text-decoration-none"
              >
                <div className="card categoria-card text-center">

                  <div className="card-body">

                    <i className="bi bi-bricks fs-1"></i>

                    <h3 className="mt-3">
                      Construcción
                    </h3>

                  </div>

                </div>
              </Link>

            </div>


            <div className="col-12 col-md-6 col-lg-3">

              <Link
                to="/productos?categoria=electricidad"
                className="text-decoration-none"
              >
                <div className="card categoria-card text-center">

                  <div className="card-body">

                    <i className="bi bi-lightning-charge fs-1"></i>

                    <h3 className="mt-3">
                      Electricidad
                    </h3>

                  </div>

                </div>
              </Link>

            </div>


            <div className="col-12 col-md-6 col-lg-3">

              <Link
                to="/productos?categoria=pinturas"
                className="text-decoration-none"
              >
                <div className="card categoria-card text-center">

                  <div className="card-body">

                    <i className="bi bi-paint-bucket fs-1"></i>

                    <h3 className="mt-3">
                      Pinturas
                    </h3>

                  </div>

                </div>
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* PRODUCTOS DESTACADOS */}
      <section className="productos-destacados">

        <div className="container">

          <h2 className="text-center">
            Productos destacados
          </h2>

          <div className="row g-4">

            {productosDestacados.map((producto) => (

              <div
                className="col-12 col-md-4"
                key={producto.id}
              >

                <div className="card h-100 shadow-sm">

                  <img
                    src={producto.imagen}
                    className="card-img-top producto-home-img"
                    alt={producto.nombre}
                  />

                  <div className="card-body">

                    <h3 className="h5">
                      {producto.nombre}
                    </h3>

                    <p>
                      {producto.descripcion}
                    </p>

                    <p className="fw-bold">
                      ${producto.precio.toLocaleString('es-CL')}
                    </p>

                    <Link
                      to={`/producto/${producto.id}`}
                      className="btn btn-warning"
                    >
                      Ver producto
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

          <div className="text-center mt-4">

            <Link
              to="/productos"
              className="btn btn-warning"
            >
              Ver todos los productos
            </Link>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Home