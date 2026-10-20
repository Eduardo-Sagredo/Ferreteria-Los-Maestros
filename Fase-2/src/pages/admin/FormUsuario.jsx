import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MockDB from '../../services/MockDB.js';
import '../../components/styles.css'
import '../../components/tienda.css'

export const FormUsuario = () => {
    const [usuarios] = useState(() => MockDB.getTabla('usuarios'));
    const navigate = useNavigate();

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

    useEffect(() => {
        if (modoEdicion && usuarios) {
            const usuarioEditar = usuarios.find(u => u.id === parseInt(idEdicion));
            if (usuarioEditar) {
                setNombre(usuarioEditar.nombre);
                setCorreo(usuarioEditar.correo);
                setRol(usuarioEditar.rol);
                setEstado(usuarioEditar.estado);
            } else {
                navigate('/admin/gestionUsuarios');
            }
        }
    }, [idEdicion, modoEdicion, usuarios, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password || !confirmarPassword) {
            alert('Debes ingresar y confirmar la contraseña.');
            return;
        }

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
                estado: 'Activo'
            };

            const resultado = MockDB.agregarUsuario(nuevoUsuario);
            if (!resultado.exito) {
                alert(resultado.mensaje);
                return;
            }
            alert('Usuario creado con éxito.');

        } else {
            // === EDITAR USUARIO ===
            const usuarioOriginal = usuarios.find(u => u.id === parseInt(idEdicion));

            if (usuarioOriginal && usuarioOriginal.password !== password) {
                alert('La contraseña ingresada es incorrecta (no coincide con la original). Edición denegada.');
                return;
            }

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
                password
            };

            const resultado = MockDB.editarUsuario(parseInt(idEdicion), datosActualizados);
            if (!resultado.exito) {
                alert(resultado.mensaje);
                return;
            }
            alert('Usuario actualizado con éxito.');
        }

        navigate('/admin/gestionUsuarios');
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
        </div>
    );
};

export default FormUsuario;