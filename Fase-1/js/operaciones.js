document.addEventListener('DOMContentLoaded', () => {
    const usuarios = MockDB.getTabla('usuarios');
    const pedidos = MockDB.getTabla('pedidos');

    // --- Módulo Usuarios ---
    if(document.getElementById('tabla-usuarios')) {
        renderTablaUsuarios(usuarios);

        const filtrarUsr = () => {
            const buscador = document.getElementById('buscador-usuarios');
            const filtroRol = document.getElementById('filtro-rol') || document.getElementById('filtro-categoria');
            const filtroEstado = document.getElementById('filtro-estado');

            // Capturar valores y forzar a minúsculas
            const txt = buscador ? buscador.value.toLowerCase() : '';
            const rol = filtroRol ? filtroRol.value.toLowerCase() : 'todos';
            const est = filtroEstado ? filtroEstado.value.toLowerCase() : 'todos';

            const filtrados = usuarios.filter(u => {
                if(!u) return false;
                
                const uNombre = (u.nombre || '').toLowerCase();
                const uCorreo = (u.correo || '').toLowerCase();
                const uRol = (u.rol || '').toLowerCase();
                const uEst = (u.estado || '').toLowerCase();

                const coincideTxt = uNombre.includes(txt) || uCorreo.includes(txt);
                const coincideRol = (rol === 'todos' || rol === 'todas') || uRol === rol;
                const coincideEst = (est === 'todos' || est === 'todas') || uEst === est;
                
                return coincideTxt && coincideRol && coincideEst;
            });
            
            renderTablaUsuarios(filtrados);
        };

        document.getElementById('buscador-usuarios')?.addEventListener('input', filtrarUsr);
        document.getElementById('filtro-rol')?.addEventListener('change', filtrarUsr);
        document.getElementById('filtro-estado')?.addEventListener('change', filtrarUsr);
    }

    // --- Módulo Pedidos ---
    if(document.getElementById('tabla-pedidos')) {
        renderTablaPedidos(pedidos);

        const filtrarPed = () => {
            const txt = (document.getElementById('buscador-pedidos')?.value || '').toLowerCase();
            const est = document.getElementById('filtro-estado')?.value || 'todos';

            const filtrados = pedidos.filter(p => {
                const coincideTxt = (p.cliente || '').toLowerCase().includes(txt) || (p.numero || '').toLowerCase().includes(txt);
                const coincideEst = est === 'todos' || p.estado === est;
                return coincideTxt && coincideEst;
            });
            renderTablaPedidos(filtrados);
        };

        document.getElementById('buscador-pedidos')?.addEventListener('input', filtrarPed);
        document.getElementById('filtro-estado')?.addEventListener('change', filtrarPed);
    }
});

function renderTablaUsuarios(datos) {
    document.getElementById('tabla-usuarios').innerHTML = datos.map(u => {
        const colorEstado = u.estado === 'Activo' ? 'background-color: #86efac; color: #14532d;' : 'background-color: #fca5a5; color: #7f1d1d;';
        return `<tr>
            <td class="text-dark fw-medium">${u.nombre}</td><td class="text-secondary">${u.correo}</td><td>${u.rol}</td>
            <td><span class="badge rounded-pill" style="${colorEstado}">${u.estado}</span></td>
            <td class="text-center">
                <!-- Redirige a crear-usuario pero pasándole el ID por la URL -->
                <button class="btn btn-sm btn-outline-primary rounded-3 me-1" onclick="window.location.href='crear-usuario.html?edit=${u.id}'">Editar</button>
                <button class="btn btn-sm btn-outline-danger rounded-3" onclick="if(confirm('¿Eliminar?')){ MockDB.eliminarRegistro('usuarios', ${u.id}); location.reload(); }">Eliminar</button>
            </td>
        </tr>`;
    }).join('');
}

function renderTablaPedidos(datos) {
    document.getElementById('tabla-pedidos').innerHTML = datos.map(p => {
        let colorBadge = 'background-color: #7dd3fc; color: #1E293B;'; // Preparando (Azul)
        if (p.estado === 'Entregado' || p.estado === 'Listo para retiro') colorBadge = 'background-color: #86efac; color: #14532d;'; // Verde
        else if (p.estado === 'Pendiente') colorBadge = 'background-color: #fde047; color: #1E293B;'; // Amarillo

        return `<tr>
            <td class="text-secondary font-monospace">${p.numero}</td><td class="text-dark fw-medium">${p.cliente}</td>
            <td class="text-secondary">${p.fecha}</td><td style="color: #d97706; font-weight: 500;">$${p.total.toLocaleString('es-CL')}</td>
            <td>${p.entrega}</td><td class="text-center"><span class="badge rounded-pill" style="${colorBadge}">${p.estado}</span></td>
            <td class="text-center"><button class="btn btn-sm btn-outline-secondary rounded-3" onclick="abrirModalPedido(${p.id})">Ver detalle</button></td>
        </tr>`;
    }).join('');
}

window.abrirModalPedido = function(id) {
    const p = MockDB.getTabla('pedidos').find(x => x.id == id);
    if(p) {
        document.getElementById('modal-pedido-nro').innerText = p.numero;
        document.getElementById('modal-pedido-cliente').innerText = p.cliente;
        document.getElementById('modal-pedido-estado').innerText = p.estado;
        document.getElementById('modal-pedido-productos').innerHTML = p.productos.map(prod => `<li class="d-flex justify-content-between border-bottom pb-2 mb-2"><span>${prod.nombre}</span><span class="text-secondary">Cant: ${prod.cant}</span></li>`).join('');
        new bootstrap.Modal(document.getElementById('modalDetallePedido')).show();
    }
};