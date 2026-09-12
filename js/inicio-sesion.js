const formulario = document.getElementById("formInicioSesion");
const correo = document.getElementById("correo");
const errorCorreo = document.getElementById("errorCorreo");

const contrasena = document.getElementById("contrasena");
const errorContrasena = document.getElementById("errorContrasena");


formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    errorCorreo.textContent = "";
    errorContrasena.textContent = "";

    const valorCorreo = correo.value.trim();

    if (valorCorreo === "") {
        errorCorreo.textContent = "El correo es obligatorio.";
    }

    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorCorreo)) {
        errorCorreo.textContent = "Ingrese un correo electrónico válido.";
    }

    else {
        const dominio = valorCorreo.split("@")[1].toLowerCase();

        if (dominio !== "gmail.com") {
            errorCorreo.textContent =
                "Solo se permiten correos @gmail.com.";
        }
    }

    const valorContrasena = contrasena.value.trim();

    if (valorContrasena === "") {
        errorContrasena.textContent = "La contraseña es obligatoria.";
    }

    else if (valorContrasena.length < 4 || valorContrasena.length > 10) {
        errorContrasena.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";
    }

});