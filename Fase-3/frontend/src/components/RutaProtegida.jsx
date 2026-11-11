import { Navigate, Outlet } from 'react-router-dom';

const RutaProtegida = ({ rolesPermitidos }) => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    if (!token || !usuario) {
        return <Navigate to="/login" replace />;
    }

    const rolesUsuario = usuario.roles || [];
    const tienePermiso = rolesUsuario.some((rol) => rolesPermitidos.includes(rol));

    if (!tienePermiso) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default RutaProtegida;