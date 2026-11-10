import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig.js';
import '../../components/styles.css';
import '../../components/tienda.css';

export const GestionUsuarios = () => {
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    const [busqueda, setBusqueda] = useState('');
    const [filtroRol, setFiltroRol] = useState('todos');
    const [filtroEstado, setFiltroEstado] = useState('todos');

    const cargarUsuarios = async () => {
        try {
            setCargando(true);
            const response = await api.get('/usuarios');

            const usuariosNormalizados = response.data.map((u) => {
                // 1. Combinar Nombre y Apellido(s)
                const apellido = u.apellidos || u.apellido || '';
                const nombreCompleto = `${u.nombre || ''} ${apellido}`.trim();

                // 2. Extraer y formatear el Rol desde u.roles (Arreglo de Spring Boot)
                let rolFormateado = 'Cliente';
                let rolesArray = [];

                if (Array.isArray(u.roles)) {
                    rolesArray = u.roles.map(r => (typeof r === 'object' && r !== null ? r.nombre : String(r)));
                } else if (u.rol) {
                    rolesArray = [String(u.rol)];
                }

                if (rolesArray.some(r => r.includes('ADMIN'))) {
                    rolFormateado = 'Administrador';
                } else if (rolesArray.some(r => r.includes('VENDEDOR'))) {
                    rolFormateado = 'Vendedor';
                }

                // 3. Normalizar Estado
                const esActivo = u.estado === 'ACTIVO' || u.estado === true || u.estado === 'Activo' || u.estado === undefined;
                const estadoFormateado = esActivo ? 'Activo' : 'Inactivo';

                // Sobrescribimos 'nombre', 'rol' y 'estado' directamente para calzar con las variables que lee tu JSX
                return {
                    ...u,
                    nombre: nombreCompleto || u.nombre,
                    rol: rolFormateado,
                    estado: estadoFormateado
                };
            });

            setUsuarios(usuariosNormalizados);
            setError('');
        } catch (err) {
            console.error('Error al obtener usuarios:', err);
            setError('No se pudieron obtener los usuarios desde el servidor.');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const listaUsuarios = usuarios || [];
    const usuariosFiltrados = listaUsuarios.filter((usuario) => {
        const coincideTxt = usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.correo.toLowerCase().includes(busqueda.toLowerCase());
        const coincideRol = filtroRol === 'todos' || usuario.rol === filtroRol;
        const coincideEst = filtroEstado === 'todos' || usuario.estado === filtroEstado;

        return coincideTxt && coincideRol && coincideEst;
    });

    const handleEliminar = async (id, nombre) => {
        if (window.confirm(`¿Seguro que deseas eliminar al usuario "${nombre}"?`)) {
            try {
                await api.delete(`/usuarios/${id}`);
                setUsuarios((prev) => prev.filter((u) => u.id !== id));
            } catch (err) {
                console.error('Error al eliminar usuario:', err);
                alert('No se pudo eliminar el usuario de la base de datos.');
            }
        }
    };

    const handleEditar = (id) => {
        navigate(`/admin/formUsuario?id=${id}`);
    };

    const getColorEstado = (estado) => {
        return estado === 'Activo' ? 'bg-success text-white' : 'bg-danger text-white';
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">
                <section>
                    <div className="d-flex justify-content-between mx-2 my-2 align-items-center">
                        <h1 className="mx-2 my-2 fs-2">
                            Gestión de usuarios
                        </h1>
                        <Link
                            to="/admin/formUsuario"
                            className="btn d-inline-flex align-items-center"
                            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-header)' }}
                        >
                            + Crear Usuario
                        </Link>
                    </div>

                    <div className="container my-5">
                        {error && <div className="alert alert-danger mb-4">{error}</div>}

                        <div className="row g-3 mb-4">
                            {/* Buscador */}
                            <div className="col-md-12 col-lg-6">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0 rounded-start-3 text-secondary">
                                        <i className="bi bi-search"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0 rounded-end-3 shadow-none"
                                        placeholder="Buscar usuario..."
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Filtro Rol */}
                            <div className="col-md-6 col-lg-3">
                                <select
                                    className="form-select rounded-3 shadow-none text-secondary"
                                    value={filtroRol}
                                    onChange={(e) => setFiltroRol(e.target.value)}
                                >
                                    <option value="todos">Todos los roles</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Vendedor">Vendedor</option>
                                    <option value="Cliente">Cliente</option>
                                </select>
                            </div>

                            {/* Filtro Estado */}
                            <div className="col-md-6 col-lg-3">
                                <select
                                    className="form-select rounded-3 shadow-none text-secondary"
                                    value={filtroEstado}
                                    onChange={(e) => setFiltroEstado(e.target.value)}
                                >
                                    <option value="todos">Todos los estados</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="table-responsive bg-white rounded-3 shadow-sm border" style={{ borderColor: 'var(--color-header)' }}>
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light text-secondary" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                                <tr>
                                    <th className="py-3 px-4 fw-medium border-bottom-0">NOMBRE</th>
                                    <th className="py-3 fw-medium border-bottom-0">CORREO</th>
                                    <th className="py-3 fw-medium border-bottom-0">ROL</th>
                                    <th className="py-3 fw-medium border-bottom-0">ESTADO</th>
                                    <th className="py-3 text-center fw-medium border-bottom-0">ACCIONES</th>
                                </tr>
                                </thead>

                                <tbody className="border-top-0">
                                {cargando ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-muted">
                                            Cargando usuarios desde la base de datos...
                                        </td>
                                    </tr>
                                ) : usuariosFiltrados.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-muted">No se encontraron usuarios.</td>
                                    </tr>
                                ) : (
                                    usuariosFiltrados.map((usuario) => (
                                        <tr key={usuario.id}>
                                            <td className="py-3 px-4 text-dark fw-medium">{usuario.nombre}</td>
                                            <td className="py-3 text-secondary">{usuario.correo}</td>
                                            <td className="py-3 text-dark">{usuario.rol}</td>
                                            <td className="py-3">
                                                    <span className={`badge rounded-pill px-3 py-2 fw-medium ${getColorEstado(usuario.estado)}`}>
                                                        {usuario.estado}
                                                    </span>
                                            </td>
                                            <td className="py-3 text-center">
                                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(usuario.id)}>
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(usuario.id, usuario.nombre)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default GestionUsuarios;