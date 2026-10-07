const formulario = document.getElementById("formContacto");

const nombre = document.getElementById("nombre");
const errorNombre = document.getElementById("errorNombre");

const correo = document.getElementById("correo");
const errorCorreo = document.getElementById("errorCorreo");

const comentario = document.getElementById("comentario");
const errorComentario = document.getElementById("errorComentario");

const mensajeExito = document.getElementById("mensajeExito");


function validarNombre() {

    errorNombre.textContent = "";

    const valorNombre = nombre.value.trim();

    if (valorNombre === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        return false;
    }

    else if (valorNombre.length > 100) {
        errorNombre.textContent =
            "El nombre no puede superar los 100 caracteres.";
        return false;
    }

    return true;
}

function validarCorreo() {

    errorCorreo.textContent = "";

    const valorCorreo = correo.value.trim();

    if (valorCorreo === "") {
        errorCorreo.textContent = "El correo es obligatorio.";
        return false;
    }

    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorCorreo)) {
        errorCorreo.textContent =
            "Ingrese un correo electrónico válido.";
        return false;
    }

    else {
        const dominio = valorCorreo.split("@")[1].toLowerCase();

        const dominiosPermitidos = [
            "duoc.cl",
            "profesor.duoc.cl",
            "gmail.com"
        ];

        if (!dominiosPermitidos.includes(dominio)) {
            errorCorreo.textContent =
                "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            return false;
        }
    }

    return true;
}

function validarComentario() {

    errorComentario.textContent = "";

    const valorComentario = comentario.value.trim();

    if (valorComentario === "") {
        errorComentario.textContent = "El comentario es obligatorio.";
        return false;
    }

    else if (valorComentario.length > 500) {
        errorComentario.textContent =
            "El comentario no puede superar los 500 caracteres.";
        return false;
    }

    return true;
}


nombre.addEventListener("input", validarNombre);
correo.addEventListener("input", validarCorreo);
comentario.addEventListener("input", validarComentario);


formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    mensajeExito.textContent = "";

    const nombreValido = validarNombre();
    const correoValido = validarCorreo();
    const comentarioValido = validarComentario();

    if (
        nombreValido &&
        correoValido &&
        comentarioValido
    ) {
        mensajeExito.textContent = "Mensaje enviado correctamente.";
    }

});