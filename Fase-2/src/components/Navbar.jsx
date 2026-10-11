function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <a
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
          href="/"
        >
          <img
            src="/img/logo.png"
            alt="Logo Ferretería Los Maestros"
            className="logo-navbar"
          />

          <span>Ferretería Los Maestros</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarPrincipal"
          aria-controls="navbarPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarPrincipal"
        >
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="bi bi-house-door-fill"></i> Inicio
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/productos">
                <i className="bi bi-box-seam"></i> Productos
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/sobre-nosotros">
                <i className="bi bi-people-fill"></i> Sobre nosotros
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/contacto">
                <i className="bi bi-envelope-fill"></i> Contacto
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/ubicacion">
                <i className="bi bi-geo-alt-fill"></i> Ubicación
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/carrito">
                <i className="bi bi-cart-fill"></i> Carrito
              </a>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar