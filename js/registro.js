const formulario = document.getElementById("formRegistro");

const rut = document.getElementById("rut");
const errorRut = document.getElementById("errorRut");

const nombre = document.getElementById("nombre");
const errorNombre = document.getElementById("errorNombre");

const apellidos = document.getElementById("apellidos");
const errorApellidos = document.getElementById("errorApellidos");

const correo = document.getElementById("correo");
const errorCorreo = document.getElementById("errorCorreo");

const contrasena = document.getElementById("contrasena");
const errorContrasena = document.getElementById("errorContrasena");

const mensajeExito = document.getElementById("mensajeExito");

function validarRut() {

    errorRut.textContent = "";

    const valorRut = rut.value.trim();

    if (valorRut === "") {
        errorRut.textContent = "El RUT es obligatorio.";
        return false;
    }

    else if (!/^\d{6,8}[0-9Kk]$/.test(valorRut)) {
        errorRut.textContent =
            "El RUT debe tener entre 7 y 9 caracteres, sin puntos ni guion.";
        return false;
    }

    return true;
}

function validarNombre() {

    errorNombre.textContent = "";

    const valorNombre = nombre.value.trim();

    if (valorNombre === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        return false;
    }

    else if (valorNombre.length > 50) {
        errorNombre.textContent =
            "El nombre no puede superar los 50 caracteres.";
        return false;
    }

    return true;
}

function validarApellidos() {

    errorApellidos.textContent = "";

    const valorApellidos = apellidos.value.trim();

    if (valorApellidos === "") {
        errorApellidos.textContent = "Los apellidos son obligatorios.";
        return false;
    }

    else if (valorApellidos.length > 100) {
        errorApellidos.textContent =
            "Los apellidos no pueden superar los 100 caracteres.";
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

    else if (valorCorreo.length > 100) {
        errorCorreo.textContent =
            "El correo no puede superar los 100 caracteres.";
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

function validarContrasena() {

    errorContrasena.textContent = "";

    const valorContrasena = contrasena.value.trim();

    if (valorContrasena === "") {
        errorContrasena.textContent = "La contraseña es obligatoria.";
        return false;
    }

    else if (valorContrasena.length < 4 || valorContrasena.length > 10) {
        errorContrasena.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";
        return false;
    }

    return true;
}

rut.addEventListener("input", validarRut);
nombre.addEventListener("input", validarNombre);
apellidos.addEventListener("input", validarApellidos);
correo.addEventListener("input", validarCorreo);
contrasena.addEventListener("input", validarContrasena);


formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    mensajeExito.textContent = "";

    const rutValido = validarRut();
    const nombreValido = validarNombre();
    const apellidosValidos = validarApellidos();
    const correoValido = validarCorreo();
    const contrasenaValida = validarContrasena();

    if (
        rutValido &&
        nombreValido &&
        apellidosValidos &&
        correoValido &&
        contrasenaValida
    ) {
        mensajeExito.textContent = "Registro realizado correctamente.";
    }

});