import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import MockDB from '../services/MockDB.js'
import './styles-navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  let rol = 'cliente';
  if (location.pathname.startsWith('/admin')){
    rol = 'admin';
  } else if (location.pathname.startsWith('/vendedor')){
    rol = 'vendedor';
  }

  const [sesionIniciada, setSesionIniciada] =
    useState(
      MockDB.getDato('usuarioSesion') !== null
    )

  const [cantidadCarrito, setCantidadCarrito] =
    useState(0)

  function actualizarCantidadCarrito() {
    const carrito =
      MockDB.getCarrito()

    const cantidad =
      carrito.reduce(
        (total, item) =>
          total + item.cantidad,
        0
      )

    setCantidadCarrito(
      cantidad
    )
  }

  useEffect(() => {
    actualizarCantidadCarrito()

    window.addEventListener(
      'carritoActualizado',
      actualizarCantidadCarrito
    )

    return () => {
      window.removeEventListener(
        'carritoActualizado',
        actualizarCantidadCarrito
      )
    }
  }, [])

  function cerrarSesion() {
    MockDB.eliminarDato(
      'usuarioSesion'
    )

    MockDB.eliminarDato(
      'usuarioActivo'
    )

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

            {/* === VISTA CLIENTE === */}
            {rol === 'cliente' && (
              <>
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
                  <Link className="nav-link d-flex align-items-center gap-1" to="/carrito">
                    <i className="bi bi-cart"></i>
                    Carrito
                    {cantidadCarrito > 0 && (
                      <span className="contador-carrito">
                        {cantidadCarrito}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/sobreNosotros">
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
                    <button type="button" className="nav-link btn btn-link" onClick={cerrarSesion}>
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
              </>
            )}

            {/* === VISTA ADMINISTRADOR === */}
            {rol === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin"><i className="bi bi-house-door-fill"></i> Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/gestionProductos"><i className="bi bi-box-seam"></i> Productos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="admin/inventario"><i className="bi bi-card-checklist"></i> Inventario</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="admin/gestionPedidos"><i className="bi bi-receipt"></i> Pedidos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="admin/gestionUsuarios"><i className="bi bi-person"></i> Usuarios</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="admin/gestionReportes"><i className="bi bi-bar-chart-fill"></i> Reportes</Link>
                </li>
              </>
            )}

            {/* === VISTA VENDEDOR === */}
            {rol === 'vendedor' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/"><i className="bi bi-house-door-fill"></i> Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/vendedor/productos"><i className="bi bi-box-seam"></i> Productos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/vendedor"><i className="bi bi-card-checklist"></i> Inventario</Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar