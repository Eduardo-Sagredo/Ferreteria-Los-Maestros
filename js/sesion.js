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


function protegerPaginaPrivada() {

    const paginaActual =
        window.location.pathname.split("/").pop();

    const paginasPrivadas = [
        "mis-pedidos.html",
        "historial.html",
        "cuenta-corriente.html"
    ];

    if (paginasPrivadas.includes(paginaActual) &&
        !haySesionIniciada()) {

        window.location.href = "inicio-sesion.html";
    }
}


document.addEventListener("DOMContentLoaded", function() {

    protegerPaginaPrivada();

    actualizarMenuSesion();

});