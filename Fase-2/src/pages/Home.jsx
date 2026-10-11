function Home() {
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

              <a href="/productos" className="btn btn-warning">
                Ver productos
              </a>

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
              <div className="card categoria-card text-center">
                <div className="card-body">

                  <i className="bi bi-tools fs-1"></i>

                  <h3 className="mt-3">
                    Herramientas
                  </h3>

                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card categoria-card text-center">
                <div className="card-body">

                  <i className="bi bi-bricks fs-1"></i>

                  <h3 className="mt-3">
                    Construcción
                  </h3>

                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card categoria-card text-center">
                <div className="card-body">

                  <i className="bi bi-lightning-charge fs-1"></i>

                  <h3 className="mt-3">
                    Electricidad
                  </h3>

                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card categoria-card text-center">
                <div className="card-body">

                  <i className="bi bi-paint-bucket fs-1"></i>

                  <h3 className="mt-3">
                    Pinturas
                  </h3>

                </div>
              </div>
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

            <div className="col-12 col-md-4">
              <div className="card h-100 shadow-sm">

                <img
                  src="/img/taladro.jpg"
                  className="card-img-top producto-home-img"
                  alt="Taladro"
                />

                <div className="card-body">
                  <h3 className="h5">
                    Taladro
                  </h3>

                  <p>
                    Herramienta ideal para trabajos de construcción.
                  </p>
                </div>

              </div>
            </div>


            <div className="col-12 col-md-4">
              <div className="card h-100 shadow-sm">

                <img
                  src="/img/pintura.png"
                  className="card-img-top producto-home-img"
                  alt="Pintura"
                />

                <div className="card-body">
                  <h3 className="h5">
                    Pintura
                  </h3>

                  <p>
                    Pinturas para interior y exterior.
                  </p>
                </div>

              </div>
            </div>


            <div className="col-12 col-md-4">
              <div className="card h-100 shadow-sm">

                <img
                  src="/img/sierra-makita.png"
                  className="card-img-top producto-home-img"
                  alt="Sierra Makita"
                />

                <div className="card-body">
                  <h3 className="h5">
                    Sierra Makita
                  </h3>

                  <p>
                    Equipo para cortes precisos y trabajos profesionales.
                  </p>
                </div>

              </div>
            </div>

          </div>

          <div className="text-center mt-4">
            <a
              href="/productos"
              className="btn btn-warning"
            >
              Ver todos los productos
            </a>
          </div>

        </div>
      </section>

    </main>
  )
}

export default Home