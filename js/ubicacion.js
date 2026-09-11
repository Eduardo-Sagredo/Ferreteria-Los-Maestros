document.addEventListener('DOMContentLoaded', function() {
    const btnVerificar = document.getElementById('btn-verificar');
    const inputDireccion = document.getElementById('input-direccion');
    const contenedorMensaje = document.getElementById('mensaje-cobertura');

    btnVerificar.addEventListener('click', function() {
        // Obtenemos el texto y lo pasamos a minúsculas para facilitar la búsqueda
        const direccion = inputDireccion.value.toLowerCase().trim();
        
        // Zonas válidas
        const zonasValidas = ['la serena', 'coquimbo', 'peñuelas', 'las compañias', 'las compañias'];

        // Limpiamos el mensaje anterior
        contenedorMensaje.innerHTML = '';

        if (direccion === '') {
            contenedorMensaje.innerHTML = `<div class="alert alert-danger py-2" role="alert">Por favor, ingresa una dirección para verificar.</div>`;
            return;
        }

        // Comprobamos si alguna zona válida está escrita dentro del input
        const tieneCobertura = zonasValidas.some(zona => direccion.includes(zona));

        if (tieneCobertura) {
            contenedorMensaje.innerHTML = `<div class="alert alert-success py-2" role="alert">¡Excelentes noticias! Tenemos cobertura en tu ubicación.</div>`;
        } else {
            contenedorMensaje.innerHTML = `<div class="alert alert-warning py-2" role="alert">Actualmente no tenemos cobertura automática para esa zona. Contáctanos.</div>`;
        }
    });
});