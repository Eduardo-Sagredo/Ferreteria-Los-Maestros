import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* Logo y nombre */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
          to="/"
        >
          <img
            src="/img/logo.png"
            alt="Logo Ferretería Los Maestros"
            className="logo-navbar"
          />

          <span>Ferretería Los Maestros</span>
        </Link>

        {/* Botón menú celular */}
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

        {/* Menú */}
        <div
          className="collapse navbar-collapse"
          id="navbarPrincipal"
        >
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door-fill"></i>
                {' '}Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                <i className="bi bi-box-seam"></i>
                {' '}Productos
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/sobre-nosotros">
                <i className="bi bi-people-fill"></i>
                {' '}Sobre nosotros
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/contacto">
                <i className="bi bi-envelope-fill"></i>
                {' '}Contacto
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/ubicacion">
                <i className="bi bi-geo-alt-fill"></i>
                {' '}Ubicación
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                <i className="bi bi-cart-fill"></i>
                {' '}Carrito
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar