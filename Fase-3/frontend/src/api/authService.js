import api from './axiosConfig';

export const login = async (correo, contrasena) => {
    const response = await api.post('/auth/login', { correo, contrasena });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data));
    }
    return response.data;
};

export const registrar = async (datosUsuario) => {
    const response = await api.post('/auth/register', datosUsuario);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
};