import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MockDB from '../services/MockDB.js'

function Navbar() {
  const navigate = useNavigate()

  const [sesionIniciada, setSesionIniciada] = useState(
    MockDB.getDato('usuarioSesion') !== null
  )

  function cerrarSesion() {
    MockDB.eliminarDato('usuarioSesion')
    MockDB.eliminarDato('usuarioActivo')

    setSesionIniciada(false)

    navigate('/')
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container">

        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
        >
          <img
            src="/img/logo.png"
            alt="Logo Ferretería Los Maestros"
            className="logo-img"
          />

          <span className="texto-ferreteria">
            Ferretería
          </span>

          <span className="texto-maestros">
            Los Maestros
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarPrincipal"
          aria-controls="navbarPrincipal"
          aria-expanded="false"
          aria-label="Mostrar menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarPrincipal"
        >
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door-fill"></i>{' '}
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                <i className="bi bi-box-seam"></i>{' '}
                Productos
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/sobre-nosotros">
                <i className="bi bi-people"></i>{' '}
                Sobre nosotros
              </a>
            </li>

            {sesionIniciada && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/mis-pedidos">
                    <i className="bi bi-receipt"></i>{' '}
                    Mis pedidos
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/historial">
                    <i className="bi bi-clock-history"></i>{' '}
                    Historial
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/cuenta-corriente">
                    <i className="bi bi-wallet2"></i>{' '}
                    Cuenta corriente
                  </a>
                </li>
              </>
            )}

            <li className="nav-item">
              <a className="nav-link" href="/contacto">
                <i className="bi bi-envelope-fill"></i>{' '}
                Contacto
              </a>
            </li>

            {!sesionIniciada && (
              <li className="nav-item">
                <a className="nav-link" href="/inicio-sesion">
                  <i className="bi bi-box-arrow-in-right"></i>{' '}
                  Iniciar sesión
                </a>
              </li>
            )}

            {sesionIniciada && (
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-link btn btn-link"
                  onClick={cerrarSesion}
                >
                  <i className="bi bi-box-arrow-right"></i>{' '}
                  Cerrar sesión
                </button>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="/ubicacion">
                <i className="bi bi-geo-alt"></i>{' '}
                Ubicación
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                <i className="bi bi-cart-fill"></i>{' '}
                Carrito
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar