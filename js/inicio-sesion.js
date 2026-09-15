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
        errorContrasena.textContent =
            "La contraseña es obligatoria.";
        return false;
    }

    else if (
        valorContrasena.length < 4 ||
        valorContrasena.length > 10
    ) {

        errorContrasena.textContent =
            "La contraseña debe tener entre 4 y 10 caracteres.";

        return false;
    }

    return true;
}


// Validaciones en tiempo real
correo.addEventListener("input", validarCorreo);
contrasena.addEventListener("input", validarContrasena);


// Inicio de sesión
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    mensajeExito.textContent = "";

    const correoValido = validarCorreo();
    const contrasenaValida = validarContrasena();

    if (!correoValido || !contrasenaValida) {
        return;
    }


    // Obtener usuarios registrados
    const usuariosGuardados =
        JSON.parse(localStorage.getItem("usuarios")) || [];


    const correoIngresado =
        correo.value.trim().toLowerCase();

    const contrasenaIngresada =
        contrasena.value.trim();


    // Buscar usuario por correo
    const usuarioEncontrado =
        usuariosGuardados.find(function(usuario) {

            return usuario.correo &&
                usuario.correo.toLowerCase() === correoIngresado;

        });


    // El correo no está registrado
    if (!usuarioEncontrado) {

        errorCorreo.textContent =
            "No existe un usuario registrado con este correo.";

        return;
    }


    // La contraseña no corresponde
    if (usuarioEncontrado.contrasena !== contrasenaIngresada) {

        errorContrasena.textContent =
            "La contraseña ingresada es incorrecta.";

        return;
    }


    // Guardar usuario que inició sesión
    const usuarioActivo = {
        rut: usuarioEncontrado.rut,
        nombre: usuarioEncontrado.nombre,
        apellidos: usuarioEncontrado.apellidos,
        correo: usuarioEncontrado.correo
    };

    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuarioActivo)
    );


    mensajeExito.textContent =
        "Inicio de sesión validado correctamente.";

});