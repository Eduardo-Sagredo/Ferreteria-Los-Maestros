document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ALERTAS DEL PANEL ---
    const listaInventario = document.getElementById('lista-alertas-inventario');
    if(listaInventario) {
        const productos = MockDB.getTabla('productos');
        const alertas = productos.filter(p => p.estado !== 'Disponible').slice(0, 5);
        listaInventario.innerHTML = alertas.map(p => {
            const estiloPildora = p.estado === 'Sin stock' ? 'background-color: #fca5a5; color: #7f1d1d;' : 'background-color: #fde047; color: #1E293B;';
            return `<li class="list-group-item d-flex justify-content-between align-items-center py-3">
                <span>${p.nombre} <br><small class="text-secondary">Stock: ${p.stockActual} / Mín: ${p.stockMinimo}</small></span>
                <span class="badge rounded-pill" style="${estiloPildora}">${p.estado}</span>
            </li>`;
        }).join('');
    }

    const listaPedidos = document.getElementById('lista-alertas-pedidos');
    if(listaPedidos) {
        const pedidos = MockDB.getTabla('pedidos').slice(0, 5);
        listaPedidos.innerHTML = pedidos.map(p => 
            `<li class="list-group-item d-flex justify-content-between align-items-center py-3">
                <span>${p.numero} - ${p.cliente} <br><small class="text-secondary">${p.fecha} | $${p.total.toLocaleString('es-CL')}</small></span>
                <span class="badge rounded-pill" style="background-color: #7dd3fc; color: #1E293B;">${p.estado}</span>
            </li>`
        ).join('');
    }

    // --- 2. REPORTES: KPIs ---
    const kpiVentas = document.getElementById('resumen-ventas') || document.getElementById('kpi-ventas');
    
    if(kpiVentas) {
        const pedidos = MockDB.getTabla('pedidos') || [];
        const usuarios = MockDB.getTabla('usuarios') || [];
        
        const totalVentas = pedidos.reduce((sum, p) => sum + (p.total || 0), 0);
        const ticketProm = pedidos.length ? (totalVentas / pedidos.length).toFixed(0) : 0;
        const clientesActivos = usuarios.filter(u => u && u.rol === 'Cliente' && u.estado === 'Activo').length;

        kpiVentas.innerText = `$${totalVentas.toLocaleString('es-CL')}`;
        
        const kpiTicket = document.getElementById('resumen-ticket') || document.getElementById('kpi-ticket');
        if(kpiTicket) kpiTicket.innerText = `$${Number(ticketProm).toLocaleString('es-CL')}`;
        
        const kpiPedidos = document.getElementById('resumen-pedidos') || document.getElementById('kpi-pedidos');
        if(kpiPedidos) kpiPedidos.innerText = pedidos.length;
        
        const kpiClientes = document.getElementById('resumen-clientes') || document.getElementById('kpi-clientes');
        if(kpiClientes) kpiClientes.innerText = clientesActivos;
    }

  // --- 3. REPORTES: RANKINGS ---
    const listaClientes = document.getElementById('lista-top-clientes');
    if(listaClientes) {
        // Solución: Obtenemos los pedidos explícitamente aquí dentro para evitar errores de ReferenceError
        const pedidosParaClientes = MockDB.getTabla('pedidos') || [];
        
        const comprasPorCliente = pedidosParaClientes.reduce((acc, p) => {
            if(p.cliente) acc[p.cliente] = (acc[p.cliente] || 0) + 1;
            return acc;
        }, {});
        
        const topClientes = Object.entries(comprasPorCliente).sort((a, b) => b[1] - a[1]).slice(0, 5);
        listaClientes.innerHTML = topClientes.map((c, i) => `<li class="list-group-item d-flex justify-content-between py-3"><span class="text-dark"><strong class="me-3" style="color: #d97706;">${i + 1}</strong> ${c[0]}</span><span class="text-secondary small">${c[1]} compras</span></li>`).join('');
    }

    const listaProductos = document.getElementById('lista-top-productos');
    if(listaProductos) {
        // Solución: Obtenemos los pedidos nuevamente aquí
        const pedidosParaProductos = MockDB.getTabla('pedidos') || [];
        
        const ventasPorProducto = pedidosParaProductos.flatMap(p => p.productos || []).reduce((acc, prod) => {
            if(prod.nombre) acc[prod.nombre] = (acc[prod.nombre] || 0) + prod.cant;
            return acc;
        }, {});
        
        const topProductos = Object.entries(ventasPorProducto).sort((a, b) => b[1] - a[1]).slice(0, 5);
        listaProductos.innerHTML = topProductos.map((p, i) => `<li class="list-group-item d-flex justify-content-between py-3"><span class="text-dark"><strong class="me-3" style="color: #d97706;">${i + 1}</strong> ${p[0]}</span><span class="text-secondary small">${p[1]} uds.</span></li>`).join('');
    }
});