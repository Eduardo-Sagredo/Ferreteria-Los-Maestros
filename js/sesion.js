function obtenerUsuarioSesion() {

    const usuario = localStorage.getItem("usuarioSesion");

    if (usuario === null) {
        return null;
    }

    return JSON.parse(usuario);
}


function haySesionIniciada() {

    const usuario = obtenerUsuarioSesion();

    if (usuario !== null) {
        return true;
    }

    return false;
}


function cerrarSesion() {

    localStorage.removeItem("usuarioSesion");

    window.location.href = "../index.html";
}