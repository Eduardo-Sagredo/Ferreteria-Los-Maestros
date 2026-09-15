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

    if (window.location.pathname.includes("/pages/")) {

        window.location.href = "../index.html";

    } else {

        window.location.href = "index.html";

    }
}


function actualizarMenuSesion() {

    const opcionesPrivadas =
        document.querySelectorAll(".opcion-privada");

    const opcionesConSesion =
        document.querySelectorAll(".opcion-con-sesion");

    const opcionesSinSesion =
        document.querySelectorAll(".opcion-sin-sesion");


    if (haySesionIniciada()) {

        opcionesPrivadas.forEach(function (opcion) {
            opcion.style.display = "";
        });

        opcionesConSesion.forEach(function (opcion) {
            opcion.style.display = "";
        });

        opcionesSinSesion.forEach(function (opcion) {
            opcion.style.display = "none";
        });

    } else {

        opcionesPrivadas.forEach(function (opcion) {
            opcion.style.display = "none";
        });

        opcionesConSesion.forEach(function (opcion) {
            opcion.style.display = "none";
        });

        opcionesSinSesion.forEach(function (opcion) {
            opcion.style.display = "";
        });

    }
}


function protegerPaginaPrivada() {

    const paginaActual =
        window.location.pathname.split("/").pop();

    const paginasPrivadas = [
        "mis-pedidos.html",
        "historial.html",
        "cuenta-corriente.html",
        "confirmar-pedido.html"
    ];

    if (paginasPrivadas.includes(paginaActual) &&
        !haySesionIniciada()) {

        window.location.href = "inicio-sesion.html";
    }
}


document.addEventListener("DOMContentLoaded", function () {

    protegerPaginaPrivada();

    actualizarMenuSesion();

    const botonCerrarSesion =
        document.getElementById("btnCerrarSesion");

    if (botonCerrarSesion !== null) {

        botonCerrarSesion.addEventListener("click", function (event) {

            event.preventDefault();

            cerrarSesion();

        });

    }

});