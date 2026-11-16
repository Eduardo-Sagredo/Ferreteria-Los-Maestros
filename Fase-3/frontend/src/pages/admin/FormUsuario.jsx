import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/axiosConfig.js';
import '../../components/styles.css';
import '../../components/tienda.css';

export const FormUsuario = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const idEdicion = searchParams.get('id') || searchParams.get('edit');
    const modoEdicion = Boolean(idEdicion);

    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [rol, setRol] = useState('Cliente');
    const [estado, setEstado] = useState('Activo');

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (modoEdicion) {
            setCargando(true);
            api.get(`/usuarios/${idEdicion}`)
                .then((response) => {
                    const u = response.data;
                    setRut(u.rut || '');
                    setNombre(u.nombre || '');
                    setApellidos(u.apellidos || u.apellido || '');
                    setCorreo(u.correo || '');

                    const rolesArray = Array.isArray(u.roles) ? u.roles : (u.rol ? [u.rol] : []);
                    if (rolesArray.some(r => String(r).includes('ADMIN'))) {
                        setRol('Administrador');
                    } else if (rolesArray.some(r => String(r).includes('VENDEDOR'))) {
                        setRol('Vendedor');
                    } else {
                        setRol('Cliente');
                    }

                    const esActivo = u.estado === 'ACTIVO' || u.estado === true || u.estado === 'Activo' || u.estado === undefined;
                    setEstado(esActivo ? 'Activo' : 'Inactivo');
                })
                .catch((err) => {
                    console.error('Error al cargar datos del usuario:', err);
                    setError('No se pudieron obtener los datos del usuario.');
                })
                .finally(() => setCargando(false));
        }
    }, [idEdicion, modoEdicion]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!rut.trim() || !nombre.trim() || !apellidos.trim() || !correo.trim()) {
            setError('RUT, Nombre, Apellidos y Correo son campos obligatorios.');
            return;
        }

        if (!modoEdicion && (!password || !confirmarPassword)) {
            setError('Debes ingresar y confirmar la contraseña para el nuevo usuario.');
            return;
        }

        if (password && password !== confirmarPassword) {
            setError('Las contraseñas no coinciden entre sí.');
            return;
        }

        let rolBackend = 'ROLE_CLIENTE';
        if (rol === 'Administrador') rolBackend = 'ROLE_ADMIN';
        if (rol === 'Vendedor') rolBackend = 'ROLE_VENDEDOR';

        setCargando(true);

        try {
            if (!modoEdicion) {
                const nuevoUsuario = {
                    rut: rut.trim(),
                    nombre: nombre.trim(),
                    apellidos: apellidos.trim(),
                    correo: correo.trim().toLowerCase(),
                    contrasena: password.trim()
                };

                await api.post('/auth/register', nuevoUsuario);
                alert('Usuario creado exitosamente.');
            } else {
                const datosActualizados = {
                    rut: rut.trim(),
                    nombre: nombre.trim(),
                    apellidos: apellidos.trim(),
                    correo: correo.trim().toLowerCase(),
                    rol: rolBackend,
                    estado: estado === 'Activo',
                    contrasena: password.trim() ? password.trim() : null
                };

                await api.put(`/usuarios/${idEdicion}`, datosActualizados);
                alert('Usuario actualizado con éxito.');
            }

            navigate('/admin/gestionUsuarios');
        } catch (err) {
            console.error('Error al procesar el formulario:', err);
            if (err.response && err.response.data?.mensaje) {
                setError(err.response.data.mensaje);
            } else {
                setError('Ocurrió un error al guardar los cambios en la base de datos.');
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
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

                        {error && <div className="alert alert-danger mb-3">{error}</div>}

                        {cargando && modoEdicion ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-dark" role="status"></div>
                                <p className="mt-2 text-muted">Cargando datos del usuario...</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">

                                    <div className="col-12">
                                        <label htmlFor="input-rut" className="form-label fw-medium text-dark">RUT *</label>
                                        <input
                                            type="text"
                                            className="form-control shadow-none rounded-3"
                                            id="input-rut"
                                            maxLength="9"
                                            placeholder="12345678K"
                                            required
                                            value={rut}
                                            onChange={(e) => setRut(e.target.value)}
                                        />
                                        <small className="text-muted">Ingrese el RUT sin puntos ni guion.</small>
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="input-nombre" className="form-label fw-medium text-dark">Nombre *</label>
                                        <input
                                            type="text"
                                            className="form-control shadow-none rounded-3"
                                            id="input-nombre"
                                            placeholder="Ej. Matias"
                                            required
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="input-apellidos" className="form-label fw-medium text-dark">Apellidos *</label>
                                        <input
                                            type="text"
                                            className="form-control shadow-none rounded-3"
                                            id="input-apellidos"
                                            placeholder="Ej. Rodríguez Travers"
                                            required
                                            value={apellidos}
                                            onChange={(e) => setApellidos(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="input-correo" className="form-label fw-medium text-dark">Correo electrónico *</label>
                                        <input
                                            type="email"
                                            className="form-control shadow-none rounded-3"
                                            id="input-correo"
                                            placeholder="ejemplo@gmail.com"
                                            required
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-medium text-dark">
                                            Contraseña {modoEdicion ? '(Opcional, dejar en blanco para conservar actual)' : '*'}
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control shadow-none rounded-3"
                                            required={!modoEdicion}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-medium text-dark">
                                            Confirmar contraseña {modoEdicion ? '' : '*'}
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control shadow-none rounded-3"
                                            required={!modoEdicion && password.length > 0}
                                            value={confirmarPassword}
                                            onChange={(e) => setConfirmarPassword(e.target.value)}
                                        />
                                    </div>

                                    {modoEdicion && (
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
                                    )}

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
                                                <button
                                                    type="submit"
                                                    className="btn w-100 py-2 rounded-3 fw-medium text-white shadow-sm"
                                                    style={{ backgroundColor: '#d97706' }}
                                                    disabled={cargando}
                                                >
                                                    {cargando ? 'Procesando...' : (modoEdicion ? 'Editar usuario' : 'Crear usuario')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default FormUsuario;