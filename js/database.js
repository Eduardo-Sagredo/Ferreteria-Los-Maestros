const MockDB = (function() {
    // --- DATOS SEMILLA ---
    const seed = {
        productos: [
            { id: 1, codigo: 'PROD-001', nombre: 'Martillo carpintero', categoria: 'Herramientas', precio: 8990, stockActual: 15, stockMinimo: 5, estado: 'Disponible' },
            { id: 2, codigo: 'PROD-002', nombre: 'Taladro eléctrico', categoria: 'Eléctricas', precio: 49990, stockActual: 8, stockMinimo: 3, estado: 'Disponible' },
            { id: 3, codigo: 'PROD-003', nombre: 'Cemento 25 kg', categoria: 'Construcción', precio: 6990, stockActual: 3, stockMinimo: 5, estado: 'Stock bajo' },
            { id: 4, codigo: 'PROD-004', nombre: 'Sierra eléctrica', categoria: 'Eléctricas', precio: 75990, stockActual: 0, stockMinimo: 3, estado: 'Sin stock' },
            { id: 5, codigo: 'PROD-005', nombre: 'Tubo PVC 4"', categoria: 'Gásfitería', precio: 5490, stockActual: 2, stockMinimo: 5, estado: 'Stock bajo' }
        ],
        pedidos: [
            { id: 101, numero: 'PED-00125', cliente: 'Carlos González', fecha: '08/09/2026', total: 38950, entrega: 'Retiro', estado: 'Pendiente', productos: [{nombre: 'Martillo', cant: 2}, {nombre: 'Cemento', cant: 3}] },
            { id: 102, numero: 'PED-00120', cliente: 'Laura Rojas', fecha: '03/09/2026', total: 74990, entrega: 'Despacho', estado: 'Preparando', productos: [{nombre: 'Taladro', cant: 1}, {nombre: 'Brocas', cant: 2}] },
            { id: 103, numero: 'PED-00112', cliente: 'Constructora López', fecha: '25/08/2026', total: 126940, entrega: 'Despacho', estado: 'Entregado', productos: [{nombre: 'Cemento', cant: 15}] },
            { id: 104, numero: 'PED-00110', cliente: 'Juan Pérez', fecha: '20/08/2026', total: 15900, entrega: 'Retiro', estado: 'Listo para retiro', productos: [{nombre: 'Tubo PVC', cant: 3}] }
        ],
        usuarios: [
            { id: 1, nombre: 'Andrea Muñoz', correo: 'admin@ferreteria.cl', rol: 'Administrador', estado: 'Activo' },
            { id: 2, nombre: 'Pedro Soto', correo: 'pedro@ferreteria.cl', rol: 'Vendedor', estado: 'Activo' },
            { id: 3, nombre: 'Carlos González', correo: 'carlos@email.cl', rol: 'Cliente', estado: 'Activo' },
            { id: 4, nombre: 'Juan Pérez', correo: 'juan@email.cl', rol: 'Cliente', estado: 'Inactivo' }
        ]
    };

    // Inicializar localStorage si está vacío
    function init() {
        if (!localStorage.getItem('db_productos')) localStorage.setItem('db_productos', JSON.stringify(seed.productos));
        if (!localStorage.getItem('db_pedidos')) localStorage.setItem('db_pedidos', JSON.stringify(seed.pedidos));
        if (!localStorage.getItem('db_usuarios')) localStorage.setItem('db_usuarios', JSON.stringify(seed.usuarios));
    }

    // --- MÉTODOS CRUD GENÉRICOS ---
    const getTabla = (tabla) => JSON.parse(localStorage.getItem(`db_${tabla}`)) || [];
    const setTabla = (tabla, data) => localStorage.setItem(`db_${tabla}`, JSON.stringify(data));

    // Lógica automática de estado de stock
    const calcularEstadoStock = (actual, minimo) => {
        if (actual <= 0) return 'Sin stock';
        if (actual <= minimo) return 'Stock bajo';
        return 'Disponible';
    };

    return {
        init, getTabla, setTabla,
        
        // Métodos específicos
        actualizarStockProducto: (id, nuevoStock) => {
            let productos = getTabla('productos');
            let index = productos.findIndex(p => p.id === id);
            if (index !== -1) {
                productos[index].stockActual = parseInt(nuevoStock);
                productos[index].estado = calcularEstadoStock(productos[index].stockActual, productos[index].stockMinimo);
                setTabla('productos', productos);
            }
        },
        eliminarRegistro: (tabla, id) => {
            let datos = getTabla(tabla).filter(item => item.id !== id);
            setTabla(tabla, datos);
        }
    };
})();

// Auto-inicializar
MockDB.init();