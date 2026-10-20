import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MockDB from '../../services/MockDB.js';
import '../../components/styles.css'
import '../../components/tienda.css'

export const GestionUsuarios = () => {
    const [usuarios, setUsuarios] = useState(() => MockDB.getTabla('usuarios'));
    const navigate = useNavigate();

    const [busqueda, setBusqueda] = useState('');
    const [filtroRol, setFiltroRol] = useState('todos');
    const [filtroEstado, setFiltroEstado] = useState('todos');

    const listaUsuarios = usuarios || [];
    // --- DERIVACIÓN DE DATOS ---
    const usuariosFiltrados = listaUsuarios.filter(usuario => {
        const coincideTxt = usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.correo.toLowerCase().includes(busqueda.toLowerCase());
        const coincideRol = filtroRol === 'todos' || usuario.rol === filtroRol;
        const coincideEst = filtroEstado === 'todos' || usuario.estado === filtroEstado;

        return coincideTxt && coincideRol && coincideEst;
    });

    // --- FUNCIONES DE ACCIÓN ---
    const handleEliminar = (id) => {
        if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
            const resultado = MockDB.eliminarUsuario(id);
            if (!resultado.exito) {
                alert(resultado.mensaje);
            } else {
                setUsuarios(MockDB.getTabla('usuarios'));
            }
        }
    };

    const handleEditar = (id) => {
        navigate(`/admin/formUsuario?edit=${id}`);
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
                                    {usuariosFiltrados.length === 0 ? (
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
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(usuario.id)}>
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