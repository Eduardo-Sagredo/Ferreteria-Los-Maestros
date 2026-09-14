const formulario = document.getElementById("formPedido");

const retiro = document.getElementById("retiro");
const despacho = document.getElementById("despacho");

const contenedorDireccion = document.getElementById("contenedorDireccion");
const direccion = document.getElementById("direccion");

const errorEntrega = document.getElementById("errorEntrega");
const errorDireccion = document.getElementById("errorDireccion");

const mensajeExito = document.getElementById("mensajeExito");


// Si selecciona retiro en tienda
retiro.addEventListener("change", function() {

    contenedorDireccion.classList.add("d-none");

    direccion.value = "";
    errorDireccion.textContent = "";
    errorEntrega.textContent = "";
    mensajeExito.textContent = "";

});


// Si selecciona despacho a domicilio
despacho.addEventListener("change", function() {

    contenedorDireccion.classList.remove("d-none");

    errorEntrega.textContent = "";
    mensajeExito.textContent = "";

});


// Validar dirección mientras escribe
direccion.addEventListener("input", function() {

    errorDireccion.textContent = "";

    if (direccion.value.trim() === "") {
        errorDireccion.textContent =
            "La dirección es obligatoria para el despacho a domicilio.";
    }

});


// Validar al confirmar pedido
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    errorEntrega.textContent = "";
    errorDireccion.textContent = "";
    mensajeExito.textContent = "";


    // No seleccionó tipo de entrega
    if (!retiro.checked && !despacho.checked) {

        errorEntrega.textContent =
            "Debe seleccionar un tipo de entrega.";

        return;
    }


    // Seleccionó despacho pero no ingresó dirección
    if (despacho.checked && direccion.value.trim() === "") {

        errorDireccion.textContent =
            "La dirección es obligatoria para el despacho a domicilio.";

        return;
    }


    // Todo correcto
    mensajeExito.textContent =
        "Pedido confirmado correctamente.";

});