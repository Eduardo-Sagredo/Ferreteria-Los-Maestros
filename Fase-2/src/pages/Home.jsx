function Home() {
  return (
    <main>

      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-12 col-lg-6">

              <span className="text-warning fw-bold text-uppercase">
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


      <section className="py-5 bg-light">

        <div className="container">

          <h2 className="text-center mb-4">
            Categorías
          </h2>

          <div className="row g-4">

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card text-center h-100">
                <div className="card-body">

                  <i className="bi bi-tools fs-1 text-warning"></i>

                  <h3 className="h5 mt-3">
                    Herramientas
                  </h3>

                </div>
              </div>
            </div>


            <div className="col-12 col-md-6 col-lg-3">
              <div className="card text-center h-100">
                <div className="card-body">

                  <i className="bi bi-bricks fs-1 text-warning"></i>

                  <h3 className="h5 mt-3">
                    Construcción
                  </h3>

                </div>
              </div>
            </div>


            <div className="col-12 col-md-6 col-lg-3">
              <div className="card text-center h-100">
                <div className="card-body">

                  <i className="bi bi-lightning-charge fs-1 text-warning"></i>

                  <h3 className="h5 mt-3">
                    Electricidad
                  </h3>

                </div>
              </div>
            </div>


            <div className="col-12 col-md-6 col-lg-3">
              <div className="card text-center h-100">
                <div className="card-body">

                  <i className="bi bi-paint-bucket fs-1 text-warning"></i>

                  <h3 className="h5 mt-3">
                    Pinturas
                  </h3>

                </div>
              </div>
            </div>

          </div>

        </div>

      </section>


      <section className="py-5">

        <div className="container">

          <h2 className="text-center mb-4">
            Productos destacados
          </h2>

          <p className="text-center">
            Próximamente se cargarán los productos desde el catálogo.
          </p>

        </div>

      </section>

    </main>
  )
}

export default Home