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

}


function actualizarMenuSesion() {

    const opcionesPrivadas =
        document.querySelectorAll(".opcion-privada");

    if (haySesionIniciada()) {

        opcionesPrivadas.forEach(function(opcion) {

            opcion.style.display = "";

        });

    } else {

        opcionesPrivadas.forEach(function(opcion) {

            opcion.style.display = "none";

        });

    }
}


document.addEventListener("DOMContentLoaded", function() {

    actualizarMenuSesion();

});