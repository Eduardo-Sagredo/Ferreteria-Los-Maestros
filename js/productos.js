let productos = MockDB.getTabla('productos');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Inicial
    if (document.getElementById('tabla-productos')) renderTablaProductos(productos);
    if (document.getElementById('tabla-inventario')) renderTablaInventario(productos);
    renderAlertasInventario(productos);

    // 2. Eventos de Filtros
    document.getElementById('buscador-productos')?.addEventListener('input', aplicarFiltrosProd);
    document.getElementById('filtro-categoria')?.addEventListener('change', aplicarFiltrosProd);
    document.getElementById('filtro-estado')?.addEventListener('change', aplicarFiltrosProd);

    function aplicarFiltrosProd() {
        const txt = document.getElementById('buscador-productos')?.value.toLowerCase() || '';
        const cat = document.getElementById('filtro-categoria')?.value || 'todas';
        const est = document.getElementById('filtro-estado')?.value || 'todos';

        const filtrados = productos.filter(p => {
            const coincideTxt = p.nombre.toLowerCase().includes(txt) || p.codigo.toLowerCase().includes(txt);
            const coincideCat = cat === 'todas' || p.categoria === cat;
            const coincideEst = est === 'todos' || p.estado === est;
            return coincideTxt && coincideCat && coincideEst;
        });
        
        if (document.getElementById('tabla-productos')) renderTablaProductos(filtrados);
        if (document.getElementById('tabla-inventario')) renderTablaInventario(filtrados);
    }
});

// --- FUNCIONES DE RENDERIZADO ---

function renderAlertasInventario(datos) {
    const listaSinStock = document.getElementById('lista-alertas-sin-stock');
    if (listaSinStock) {
        listaSinStock.innerHTML = datos.filter(p => p.estado === 'Sin stock').map(p => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div><span class="d-block text-dark fw-medium">${p.nombre}</span><small class="text-secondary">Stock: ${p.stockActual} / Mín: ${p.stockMinimo}</small></div>
                <button class="btn btn-sm btn-outline-secondary rounded-3" onclick="abrirModalStock(${p.id}, '${p.nombre}', ${p.stockActual})">Actualizar</button>
            </li>
        `).join('');
    }

    const listaStockBajo = document.getElementById('lista-alertas-stock-bajo');
    if (listaStockBajo) {
        listaStockBajo.innerHTML = datos.filter(p => p.estado === 'Stock bajo').map(p => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div><span class="d-block text-dark fw-medium">${p.nombre}</span><small class="text-secondary">Stock: ${p.stockActual} / Mín: ${p.stockMinimo}</small></div>
                <button class="btn btn-sm btn-outline-secondary rounded-3" onclick="abrirModalStock(${p.id}, '${p.nombre}', ${p.stockActual})">Actualizar</button>
            </li>
        `).join('');
    }
}

function renderTablaProductos(datos) {
    const tbody = document.getElementById('tabla-productos');
    if(!tbody) return; // Seguridad si no existe en la página
    
    tbody.innerHTML = datos.map(p => {
        const estiloPildora = p.estado === 'Sin stock' ? 'background-color: #fca5a5; color: #7f1d1d;' : (p.estado === 'Stock bajo' ? 'background-color: #fde047; color: #1E293B;' : 'background-color: #86efac; color: #14532d;');
        return `<tr>
            <td class="text-secondary font-monospace">${p.codigo}</td>
            <td class="text-dark">${p.nombre}</td>
            <td class="text-secondary">${p.categoria || '-'}</td>
            <td style="color: #d97706; font-weight: 500;">$${p.precio.toLocaleString('es-CL')}</td>
            <td class="text-center">${p.stockActual}</td>
            <td class="text-center text-secondary">${p.stockMinimo}</td>
            <td class="text-center"><span class="badge rounded-pill" style="${estiloPildora}">${p.estado}</span></td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary rounded-3 me-1" onclick="editarProducto(${p.id})">Editar</button>
                <button class="btn btn-sm btn-outline-danger rounded-3" onclick="eliminarProducto(${p.id})">Eliminar</button>
            </td>
        </tr>`;
    }).join('');
}

function renderTablaInventario(datos) {
    const tbody = document.getElementById('tabla-inventario');
    if(!tbody) return; // Seguridad si no existe en la página
    
    tbody.innerHTML = datos.map(p => {
        const estiloPildora = p.estado === 'Sin stock' ? 'background-color: #fca5a5; color: #7f1d1d;' : (p.estado === 'Stock bajo' ? 'background-color: #fde047; color: #1E293B;' : 'background-color: #86efac; color: #14532d;');
        return `<tr>
            <td class="text-secondary font-monospace">${p.codigo}</td>
            <td class="text-dark">${p.nombre}</td>
            <td class="text-center">${p.stockActual}</td>
            <td class="text-center text-secondary">${p.stockMinimo}</td>
            <td class="text-center"><span class="badge rounded-pill" style="${estiloPildora}">${p.estado}</span></td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-secondary rounded-3" onclick="abrirModalStock(${p.id}, '${p.nombre}', ${p.stockActual})">Actualizar stock</button>
            </td>
        </tr>`;
    }).join('');
}

// --- FUNCIONES GLOBALES (CRUD Y MODAL) ---

window.editarProducto = (id) => window.location.href = `agregar-producto.html?edit=${id}`;

window.eliminarProducto = (id) => {
    if(confirm('¿Seguro que deseas eliminar este producto?')) { 
        MockDB.eliminarRegistro('productos', id); 
        location.reload(); 
    }
};

let idProdSel = null;

// Abrir el Modal de Stock
window.abrirModalStock = function(id, nombre, stock) {
    idProdSel = id;
    const prod = MockDB.getTabla('productos').find(p => p.id == id);
    
    // Buscar los elementos usando ambos IDs posibles (por si alguno quedó antiguo en tu HTML)
    const nombreEl = document.getElementById('modal-nombre-prod') || document.getElementById('modal-nombre-producto');
    const inputEl = document.getElementById('modal-input-stock') || document.getElementById('input-nuevo-stock');
    
    if(nombreEl) nombreEl.innerText = nombre;
    if(inputEl) inputEl.value = stock;
    
    if(prod) {
        const codEl = document.getElementById('modal-codigo-producto');
        const stActEl = document.getElementById('modal-stock-actual');
        const stMinEl = document.getElementById('modal-stock-minimo');
        
        if(codEl) codEl.innerText = prod.codigo;
        if(stActEl) stActEl.innerText = prod.stockActual;
        if(stMinEl) stMinEl.innerText = prod.stockMinimo;
    }
    
    // Abrir modal usando Bootstrap
    const modalElement = document.getElementById('modalActualizarStock');
    if(modalElement) {
        new bootstrap.Modal(modalElement).show();
    }
};

// Guardar el Stock (Soporta ambos nombres que pudiste haberle puesto al botón en el HTML)
window.guardarNuevoStock = window.guardarStockModal = function() {
    const inputEl = document.getElementById('modal-input-stock') || document.getElementById('input-nuevo-stock');
    if(inputEl && idProdSel !== null) {
        MockDB.actualizarStockProducto(idProdSel, inputEl.value);
        location.reload(); 
    }
};