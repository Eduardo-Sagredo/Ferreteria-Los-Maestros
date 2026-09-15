const formulario = document.getElementById("formInicioSesion");

const correo = document.getElementById("correo");

const errorCorreo = document.getElementById("errorCorreo");

const contrasena = document.getElementById("contrasena");

const errorContrasena = document.getElementById("errorContrasena");

const mensajeExito = document.getElementById("mensajeExito");


function validarCorreo() {

    errorCorreo.textContent = "";

    const valorCorreo = correo.value.trim();

    if (valorCorreo === "") {

        errorCorreo.textContent = "El correo es obligatorio.";

        return false;
    }

    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorCorreo)) {

        errorCorreo.textContent = "Ingrese un correo electrónico válido.";

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


correo.addEventListener("input", validarCorreo);


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


contrasena.addEventListener("input", validarContrasena);


formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    mensajeExito.textContent = "";

    errorCorreo.textContent = "";

    errorContrasena.textContent = "";


    const valorCorreo = correo.value.trim();

    if (valorCorreo === "") {

        errorCorreo.textContent = "El correo es obligatorio.";
    }

    else if (valorCorreo.length > 100) {

        errorCorreo.textContent =
            "El correo no puede superar los 100 caracteres.";
    }

    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorCorreo)) {

        errorCorreo.textContent =
            "Ingrese un correo electrónico válido.";
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
        }
    }


    const valorContrasena = contrasena.value.trim();

    if (valorContrasena === "") {

        errorContrasena.textContent =
            "La contraseña es obligatoria.";
    }

    else if (valorContrasena.length < 4 || valorContrasena.length > 10) {

        errorContrasena.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";
    }


    if (errorCorreo.textContent === "" &&
        errorContrasena.textContent === "") {

        mensajeExito.textContent =
            "Inicio de sesión validado correctamente.";


        const usuarioSesion = {
            correo: valorCorreo
        };


        localStorage.setItem(
            "usuarioSesion",
            JSON.stringify(usuarioSesion)
        );


        window.location.href = "../index.html";
    }

});