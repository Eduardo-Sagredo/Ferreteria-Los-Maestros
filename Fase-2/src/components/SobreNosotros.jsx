import logoImg from '../assets/logo.png';
import imagenNosotros from '../assets/imagen-nosotros.jpg'
import './styles-nosotros.css'
import './tienda.css'
import './styles.css'
import { Link } from 'react-router-dom';

export const SobreNosotros = () => {
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

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarPrincipal"
                            aria-controls="navbarPrincipal" aria-expanded="false" aria-label="Mostrar menú">
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
                                    <Link className="nav-link" to="#" id="btnCerrarSesion">
                                        <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                                    </Link> 
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

            <section className="hero-nosotros">
                <div className="container text-white">
                    <span className="text-warning fw-bold text-uppercase" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>
                        Ferretería Los Maestros • La Serena
                    </span>
                    <h1 className="display-4 fw-bold mt-2">
                        Nuestra Historia
                    </h1>
                    <p className="fs-5 mt-3 col-md-8">
                        Más de dos décadas construyendo confianza y entregando soluciones para tus proyectos.
                    </p>
                </div>
            </section>

            <section className="nosotros-contenido container my-5">
                <div className="row align-items-center">
                    <div className="col-md-7 pe-md-5">
                        <div className="py-1 px-3 rounded-pill d-inline-block mb-2" style={{ backgroundColor: 'rgba(245, 158, 11, 0.25)' }}>
                            <h2 className="m-0 fs-6 fw-bold" style={{ fontFamily: 'var(--fuente-para-textos-pequenos)', color: '#b45309', letterSpacing: '2px' }}>
                                NUESTRA HISTORIA
                            </h2>
                        </div>
                        <h3 className="text-start mb-3">
                            ¿Quiénes somos?
                        </h3>
                        <div style={{ textAlign: 'justify' }}>
                            <p>
                                Fundada hace 22 años en la hermosa ciudad de La Serena, Región de Coquimbo, <strong>Ferretería Los Maestros</strong> nació como un pequeño emprendimiento familiar con una misión clara: convertirse en el aliado principal de los trabajadores de la construcción y las familias de nuestra región.
                            </p>
                            <p>
                                Hoy en día, somos un negocio consolidado, atendido directamente por sus dueños y nuestro equipo de planta, quienes se esfuerzan diariamente por entregar una atención cercana, experta y personalizada.
                            </p>
                        </div>

                        <div className="py-1 px-3 rounded-pill d-inline-block mt-4 mb-2" style={{ backgroundColor: 'var(--color-header)' }}>
                            <h2 className="m-0 fs-6 fw-bold" style={{ fontFamily: 'var(--fuente-para-textos-pequenos)', color: 'var(--color-accent)', letterSpacing: '2px' }}>
                                LO QUE NOS MUEVE
                            </h2>
                        </div>
                        <h3 className="text-start mb-3">
                            Nuestro Compromiso
                        </h3>
                        <div style={{ textAlign: 'justify' }}>
                            <p>
                                Entendemos que el tiempo es fundamental en cualquier obra. Por eso, nos especializamos en ofrecer un catálogo robusto de más de 800 referencias, que incluye materiales de construcción, herramientas eléctricas y manuales, insumos de gasfitería, electricidad y artículos de ferretería general.
                            </p>
                            <p>
                                Ya seas un maestro contratista que busca abastecerse en volumen, o un cliente particular mejorando su hogar, en Ferretería Los Maestros encontrarás la asesoría y los productos que necesitas para que tu proyecto sea un éxito.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5 mt-5 mt-md-0">
                        <img src={imagenNosotros} alt="Interior de Ferretería Los Maestros" className="img-fluid rounded shadow" />
                    </div>
                </div>
            </section>

            <section className="my-5">
                <aside className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-md-8">
                            <div className="py-1 px-3 rounded-pill d-inline-block mb-3" style={{ backgroundColor: 'rgba(245, 158, 11, 0.25)' }}>
                                <h2 className="m-0 fs-6 fw-bold" style={{ fontFamily: 'var(--fuente-para-textos-pequenos)', color: '#b45309', letterSpacing: '2px' }}>
                                    EN ACCIÓN
                                </h2>
                            </div>
                            <h3 className="mb-3">
                                Conoce más sobre nuestras herramientas
                            </h3>
                            <p className="mb-4" style={{ textAlign: 'justify' }}>
                                Descubre en este video la calidad y resistencia de las herramientas eléctricas que ofrecemos en nuestro catálogo para facilitar tu trabajo diario.
                            </p>
                            <div className="d-flex justify-content-center">
                                <iframe width="560" height="315"
                                    src="https://www.youtube.com/embed/HzPoQA5R8OI?si=QPiQWO3EoiXdz6d0"
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                    </div>
                </aside>
            </section>

            <footer className="footer-tienda">
                <div className="container text-center">
                    <p className="mb-0">
                        &copy; 2026 Ferretería Los Maestros. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </>
    );
}