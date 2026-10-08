import logoImg from '../assets/logo.png';
import './tienda.css';
import './styles.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Ubicacion = () => {
    const [direccion, setDireccion] = useState('');
    const [mensaje, setMensaje] = useState(null);

    const zonasValidas = ['la serena', 'coquimbo', 'peñuelas', 'las compañias'];

    const handleVerificar = (e) => {
        if (e) e.preventDefault();
        const direccionLimpia = direccion.toLowerCase().trim();

        if (direccionLimpia === '') {
            setMensaje({
                tipo: 'danger',
                texto: 'Por favor, ingresa una dirección para verificar.',
            });
            return;
        }

        const tieneCobertura = zonasValidas.some((zona) => direccionLimpia.includes(zona));

        if (tieneCobertura) {
            setMensaje({
                tipo: 'success',
                texto: '¡Excelentes noticias! Tenemos cobertura en tu ubicación.',
            });
        } else {
            setMensaje({
                tipo: 'warning',
                texto: 'Actualmente no tenemos cobertura automática para esa zona. Contáctanos.',
            });
        }
    };

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <img src={logoImg} alt="Logo Ferretería Los Maestros" className="logo-img" />
                            <span className="texto-ferreteria"> Ferretería </span>
                            <span className="texto-maestros"> Los Maestros </span>
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

                        <div className="collapse navbar-collapse" id="navbarPrincipal">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        <i className="bi bi-house-door-fill"></i> Inicio
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/productos">
                                        <i className="bi bi-box-seam"></i> Productos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/nosotros">
                                        <i className="bi bi-people"></i> Sobre nosotros
                                    </Link>
                                </li>
                                <li className="nav-item opcion-privada">
                                    <Link className="nav-link" to="/mis-pedidos">
                                        <i className="bi bi-receipt"></i> Mis pedidos
                                    </Link>
                                </li>
                                <li className="nav-item opcion-privada">
                                    <Link className="nav-link" to="/historial">
                                        <i className="bi bi-clock-history"></i> Historial
                                    </Link>
                                </li>
                                <li className="nav-item opcion-privada">
                                    <Link className="nav-link" to="/cuenta-corriente">
                                        <i className="bi bi-wallet2"></i> Cuenta corriente
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contacto">
                                        <i className="bi bi-envelope-fill"></i> Contacto
                                    </Link>
                                </li>
                                <li className="nav-item opcion-sin-sesion">
                                    <Link className="nav-link" to="/inicio-sesion">
                                        <i className="bi bi-box-arrow-in-right"></i> Iniciar sesión
                                    </Link>
                                </li>
                                <li className="nav-item opcion-con-sesion">
                                    <a className="nav-link" href="#" id="btnCerrarSesion">
                                        <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ubicacion">
                                        <i className="bi bi-geo-alt"></i> Ubicación
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <section className="container my-5">
                    <h1 className="text-center mb-5 fw-bold" style={{ color: '#1E293B' }}>
                        Nuestra Ubicación y Cobertura
                    </h1>

                    <div className="row g-4">
                        <div className="col-md-6">
                            <h3 className="h5 mb-3">¿Dónde nos encontramos?</h3>

                            <div className="ratio ratio-1x1 h-100" style={{ maxHeight: '450px' }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50582.46479629745!2d-71.28745079802562!3d-29.90375807115501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9691b5c986b1d52d%3A0x1f12d9ed6d837d1f!2sFerreter%C3%ADa%20FyS!5e1!3m2!1ses-419!2scl!4v1789070884068!5m2!1ses-419!2scl"
                                    width="600"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                />
                            </div>

                            <div className="card shadow-sm mt-4 border-0 rounded-4" style={{ border: '1px solid #e2e8f0' }}>
                                <div className="card-body p-4">
                                    <h4 className="h5 mb-4" style={{ color: '#1E293B' }}>
                                        Información del local
                                    </h4>

                                    <ul className="list-unstyled mb-0" style={{ fontSize: '1.05rem' }}>
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="bi bi-geo-alt-fill fs-5 me-3" style={{ color: '#e83e8c' }}></i>
                                            <span className="text-dark">Nicaragua 2030, La Serena</span>
                                        </li>

                                        <li className="d-flex align-items-center mb-3">
                                            <i className="bi bi-telephone-fill fs-5 me-3" style={{ color: '#e83e8c' }}></i>
                                            <span className="text-dark">+56 51 234 5678</span>
                                        </li>

                                        <li className="d-flex align-items-center mb-3">
                                            <i className="bi bi-clock-fill fs-5 me-3 text-secondary"></i>
                                            <span className="text-dark">Lunes a Viernes: 8:30 – 18:30 hrs</span>
                                        </li>

                                        <li className="d-flex align-items-center mb-3">
                                            <i className="bi bi-clock-fill fs-5 me-3 text-secondary"></i>
                                            <span className="text-dark">Sábados: 9:00 – 14:00 hrs</span>
                                        </li>

                                        <li className="d-flex align-items-center mt-4 pt-2 fw-medium">
                                            <i className="bi bi-truck fs-4 me-3" style={{ color: '#b45309' }}></i>
                                            <span style={{ color: '#b45309' }}>
                                                Despacho: La Serena, Coquimbo, Peñuelas y Las Compañías
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card shadow-sm mb-4 border-0 rounded-4" style={{ border: '1px solid #e2e8f0' }}>
                                <div className="card-body p-4">
                                    <h3 className="h5 text-dark mb-2">¿Llegamos a tu dirección?</h3>
                                    <p className="text-muted small mb-3">
                                        Consulta si tu dirección se encuentra dentro del rango de despacho.
                                    </p>

                                    <label htmlFor="input-direccion" className="form-label fw-semibold text-dark">
                                        Dirección
                                    </label>

                                    <input
                                        type="text"
                                        id="input-direccion"
                                        className="form-control mb-3"
                                        placeholder="Ej: Calle Balmaceda 456, La Serena"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />

                                    <button
                                        id="btn-verificar"
                                        type="button"
                                        className="btn w-100 fw-bold text-white"
                                        style={{ backgroundColor: '#d97706' }}
                                        onClick={handleVerificar}
                                    >
                                        Verificar cobertura
                                    </button>

                                    {mensaje && (
                                        <div id="mensaje-cobertura" className="mt-3">
                                            <div className={`alert alert-${mensaje.tipo} py-2 mb-0`} role="alert">
                                                {mensaje.texto}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div
                                className="card border-0 rounded-4"
                                style={{ backgroundColor: '#fefce8', border: '1px solid #fde047' }}
                            >
                                <div className="card-body p-4">
                                    <h4 className="h6 mb-3" style={{ color: '#b45309' }}>
                                        Zonas de cobertura
                                    </h4>

                                    <ul className="list-unstyled mb-0" style={{ color: '#b45309' }}>
                                        <li className="mb-2">
                                            <i className="bi bi-check-square-fill text-success me-2"></i>
                                            La Serena (toda la ciudad)
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-square-fill text-success me-2"></i>
                                            Coquimbo (zona urbana)
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-square-fill text-success me-2"></i>
                                            Peñuelas
                                        </li>
                                        <li className="mb-2">
                                            <i className="bi bi-check-square-fill text-success me-2"></i>
                                            Las Compañías
                                        </li>
                                        <li>
                                            <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                                            Zonas rurales: consultar disponibilidad
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer-tienda">
                <div className="container text-center">
                    <p className="mb-0">
                        &copy; 2026 Ferretería Los Maestros. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </>
    );
};