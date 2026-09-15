const formulario = document.getElementById("formConfirmarPedido");

const retiro = document.getElementById("retiro");
const despacho = document.getElementById("despacho");

const contenedorDireccion =
    document.getElementById("contenedorDireccion");

const direccion =
    document.getElementById("direccion");

const errorTipoEntrega =
    document.getElementById("errorTipoEntrega");

const errorDireccion =
    document.getElementById("errorDireccion");

const mensajeExito =
    document.getElementById("mensajeExito");


// Retiro en tienda
retiro.addEventListener("change", function() {

    contenedorDireccion.classList.add("d-none");

    direccion.value = "";

    errorTipoEntrega.textContent = "";
    errorDireccion.textContent = "";
    mensajeExito.textContent = "";

});


// Despacho a domicilio
despacho.addEventListener("change", function() {

    contenedorDireccion.classList.remove("d-none");

    errorTipoEntrega.textContent = "";
    errorDireccion.textContent = "";
    mensajeExito.textContent = "";

});


// Validar dirección mientras escribe
direccion.addEventListener("input", function() {

    errorDireccion.textContent = "";
    mensajeExito.textContent = "";

    if (
        despacho.checked &&
        direccion.value.trim() === ""
    ) {

        errorDireccion.textContent =
            "La dirección es obligatoria para el despacho a domicilio.";

    }

});


// Confirmar pedido
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    errorTipoEntrega.textContent = "";
    errorDireccion.textContent = "";
    mensajeExito.textContent = "";


    // No seleccionó ningún tipo de entrega
    if (!retiro.checked && !despacho.checked) {

        errorTipoEntrega.textContent =
            "Debe seleccionar un tipo de entrega.";

        return;
    }


    // Despacho sin dirección
    if (
        despacho.checked &&
        direccion.value.trim() === ""
    ) {

        errorDireccion.textContent =
            "La dirección es obligatoria para el despacho a domicilio.";

        return;
    }


    // Pedido válido
    mensajeExito.textContent =
        "Pedido confirmado correctamente.";

});