import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import logoImg from '../../assets/logo.png';

export const FormUsuario = () => {
    const { usuarios, agregarUsuario, editarUsuario } = useContext(AppContext);
    const navigate = useNavigate();

    // Para saber si estamos editando
    const [searchParams] = useSearchParams();
    const idEdicion = searchParams.get('edit');
    const modoEdicion = Boolean(idEdicion);

    // Estados del formulario
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [rol, setRol] = useState('Cliente');
    const [estado, setEstado] = useState('Activo');

    // Cargar datos si estamos en modo edición
    useEffect(() => {
        if (modoEdicion && usuarios) {
            const usuarioEditar = usuarios.find(u => u.id === parseInt(idEdicion));
            if (usuarioEditar) {
                setNombre(usuarioEditar.nombre);
                setCorreo(usuarioEditar.correo);
                setRol(usuarioEditar.rol);
                setEstado(usuarioEditar.estado);
                // La contraseña se deja en blanco obligando a que la vuelva a escribir
            } else {
                navigate('/admin/usuarios');
            }
        }
    }, [idEdicion, modoEdicion, usuarios, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Validar que la contraseña esté escrita (el HTML5 lo exige, pero lo reforzamos aquí)
        if (!password || !confirmarPassword) {
            alert('Debes ingresar y confirmar la contraseña.');
            return;
        }

        // 2. Validar que coincidan entre sí (Contraseña === Confirmar Contraseña)
        if (password !== confirmarPassword) {
            alert('Las contraseñas no coinciden entre sí. Por favor, verifica.');
            return;
        }

        if (!modoEdicion) {
            // === CREAR USUARIO ===
            const correoExiste = usuarios.some(u => u.correo.toLowerCase() === correo.toLowerCase());
            if (correoExiste) {
                alert('Ese correo ya está registrado en el sistema. Por favor, usa otro.');
                return;
            }

            const nuevoUsuario = {
                nombre,
                correo,
                password,
                rol,
                estado: 'Activo' // Por defecto siempre activo al crear
            };

            agregarUsuario(nuevoUsuario);
            alert('Usuario creado con éxito.');

        } else {
            // === EDITAR USUARIO ===
            const usuarioOriginal = usuarios.find(u => u.id === parseInt(idEdicion));

            // 3. Validar que la contraseña escrita coincida con la original del usuario
            if (usuarioOriginal && usuarioOriginal.password !== password) {
                alert('La contraseña ingresada es incorrecta (no coincide con la original). Edición denegada.');
                return; // Bloquea la edición
            }

            // Validar correo único respecto a otros usuarios
            const correoExisteEnOtro = usuarios.some(u => u.correo.toLowerCase() === correo.toLowerCase() && u.id !== parseInt(idEdicion));
            if (correoExisteEnOtro) {
                alert('Ese correo ya está en uso por otro usuario.');
                return;
            }

            const datosActualizados = {
                nombre,
                correo,
                rol,
                estado,
                password // Se mantiene la misma
            };

            editarUsuario(parseInt(idEdicion), datosActualizados);
            alert('Usuario actualizado con éxito.');
        }

        navigate('/admin/usuarios');
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <header>
                <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container">
                        <Link className="navbar-brand" to="/admin">
                            <img src={logoImg} alt="Logo Ferretería Los Maestros" className="logo-img" />
                            <span className="texto-ferreteria">Ferretería</span>
                            <span className="texto-maestros">Los Maestros</span>
                        </Link>
                        <ul className="navbar-nav">
                            <li className="nav-item"><Link className="nav-link" to="/admin"><i className="bi bi-house-door-fill"></i> Inicio</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/admin/productos"><i className="bi bi-box-seam"></i> Productos</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/admin/inventario"><i className="bi bi-card-checklist"></i> Inventario</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/admin/pedidos"><i className="bi bi-receipt"></i> Pedidos</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/admin/usuarios"><i className="bi bi-person"></i> Usuarios</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/admin/reportes"><i className="bi bi-file-bar-graph"></i> Reportes</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="flex-grow-1">
                <div className="my-2 mx-2">
                    <button onClick={() => navigate(-1)} className="btn" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-header)' }}>
                        ← Volver
                    </button>
                </div>

                <section>
                    <div className="card mt-5 border-0 shadow-sm rounded-4 p-4 mx-auto" style={{ border: '1px solid #e2e8f0 !important', maxWidth: '600px' }}>
                        <h2 className="h4 mb-4 text-dark fw-bold">
                            {modoEdicion ? 'Editar Usuario' : 'Crear usuario'}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">

                                <div className="col-12">
                                    <label htmlFor="input-nombre" className="form-label fw-medium text-dark">Nombre completo *</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none rounded-3"
                                        id="input-nombre"
                                        required
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="input-correo" className="form-label fw-medium text-dark">Correo *</label>
                                    <input
                                        type="email"
                                        className="form-control shadow-none rounded-3"
                                        id="input-correo"
                                        required
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </div>

                                {/* Campos de contraseña obligatorios en AMBOS modos */}
                                <div className="col-12">
                                    <label className="form-label fw-medium text-dark">Contraseña *</label>
                                    <input
                                        type="password"
                                        className="form-control shadow-none rounded-3"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-medium text-dark">Confirmar contraseña *</label>
                                    <input
                                        type="password"
                                        className="form-control shadow-none rounded-3"
                                        required
                                        value={confirmarPassword}
                                        onChange={(e) => setConfirmarPassword(e.target.value)}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-medium text-dark">Rol *</label>
                                    <select
                                        className="form-select shadow-none rounded-3"
                                        required
                                        value={rol}
                                        onChange={(e) => setRol(e.target.value)}
                                    >
                                        <option value="Cliente">Cliente</option>
                                        <option value="Vendedor">Vendedor</option>
                                        <option value="Administrador">Administrador</option>
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-medium text-dark">
                                        Estado {!modoEdicion && <span className="fw-normal text-muted small">(Por defecto: Activo)</span>}
                                    </label>
                                    <select
                                        className="form-select shadow-none rounded-3"
                                        disabled={!modoEdicion}
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>

                                <div className="col-12 mt-4 pt-2">
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary w-100 py-2 rounded-3 fw-medium"
                                                onClick={() => navigate(-1)}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button type="submit" className="btn w-100 py-2 rounded-3 fw-medium text-white shadow-sm" style={{ backgroundColor: '#d97706' }}>
                                                {modoEdicion ? 'Editar usuario' : 'Crear usuario'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="footer-tienda mt-5">
                <div className="container text-center">
                    <p className="mb-0">&copy; 2026 Ferretería Los Maestros. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};