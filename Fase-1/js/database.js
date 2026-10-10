const MockDB = (function() {
    // --- DATOS SEMILLA ---
    const seed = {
        productos: [
            { id: 1, codigo: 'PROD-001', nombre: 'Taladro inalámbrico Bauker 20V', categoria: 'herramientas', precio: 59990, stockActual: 8, stockMinimo: 3, estado: 'Disponible', imagen: 'taladro.jpg', descripcion: 'Taladro inalámbrico para perforar y atornillar en trabajos domésticos y de obra.' },
            { id: 2, codigo: 'PROD-002', nombre: 'Martillo Bauker 16 oz', categoria: 'herramientas', precio: 12990, stockActual: 12, stockMinimo: 5, estado: 'Disponible', imagen: 'martillo.png', descripcion: 'Martillo de uña resistente, ideal para trabajos de carpintería y construcción.' },
            { id: 3, codigo: 'PROD-003', nombre: 'Esmeril angular Bosch', categoria: 'herramientas', precio: 49990, stockActual: 7, stockMinimo: 3, estado: 'Disponible', imagen: 'esmeril-bosch.png', descripcion: 'Esmeril angular para corte y desbaste de diferentes materiales.' },
            { id: 4, codigo: 'PROD-004', nombre: 'Sierra circular Makita', categoria: 'herramientas', precio: 89990, stockActual: 5, stockMinimo: 2, estado: 'Disponible', imagen: 'sierra-makita.png', descripcion: 'Sierra circular para realizar cortes rectos en madera y tableros.' },
            { id: 5, codigo: 'PROD-005', nombre: 'Juego de destornilladores Stanley', categoria: 'herramientas', precio: 19990, stockActual: 18, stockMinimo: 5, estado: 'Disponible', imagen: 'destornilladores-stanley.png', descripcion: 'Set de destornilladores para reparaciones y trabajos de montaje.' },
            { id: 6, codigo: 'PROD-006', nombre: 'Cemento Melón 25 kg', categoria: 'construccion', precio: 8990, stockActual: 20, stockMinimo: 5, estado: 'Disponible', imagen: 'cemento.png', descripcion: 'Cemento multiuso para trabajos de hormigón, albañilería y terminaciones.' },
            { id: 7, codigo: 'PROD-007', nombre: 'Cemento Polpaico 25 kg', categoria: 'construccion', precio: 8490, stockActual: 25, stockMinimo: 5, estado: 'Disponible', imagen: 'cemento-polpaico.png', descripcion: 'Cemento para obras generales, reparaciones y trabajos de albañilería.' },
            { id: 8, codigo: 'PROD-008', nombre: 'Yeso Volcán 25 kg', categoria: 'construccion', precio: 9990, stockActual: 14, stockMinimo: 5, estado: 'Disponible', imagen: 'yeso-volcan.png', descripcion: 'Yeso para terminaciones interiores, reparaciones y nivelación de superficies.' },
            { id: 9, codigo: 'PROD-009', nombre: 'Plancha yeso cartón Volcán', categoria: 'construccion', precio: 10990, stockActual: 30, stockMinimo: 8, estado: 'Disponible', imagen: 'plancha-volcan.png', descripcion: 'Plancha de yeso cartón para tabiques, cielos y revestimientos interiores.' },
            { id: 10, codigo: 'PROD-010', nombre: 'Mortero Presec 25 kg', categoria: 'construccion', precio: 7990, stockActual: 16, stockMinimo: 5, estado: 'Disponible', imagen: 'mortero-presec.png', descripcion: 'Mortero multiuso para pegar, reparar y nivelar en trabajos de construcción.' },
            { id: 11, codigo: 'PROD-011', nombre: 'Interruptor automático Schneider 16A', categoria: 'electricidad', precio: 8990, stockActual: 15, stockMinimo: 5, estado: 'Disponible', imagen: 'automatico-schneider.png', descripcion: 'Interruptor automático para protección de circuitos eléctricos domiciliarios.' },
            { id: 12, codigo: 'PROD-012', nombre: 'Enchufe doble Legrand', categoria: 'electricidad', precio: 5490, stockActual: 25, stockMinimo: 5, estado: 'Disponible', imagen: 'enchufe-legrand.png', descripcion: 'Enchufe doble para instalaciones eléctricas interiores.' },
            { id: 13, codigo: 'PROD-013', nombre: 'Cable eléctrico Nexans 2.5 mm', categoria: 'electricidad', precio: 18990, stockActual: 10, stockMinimo: 4, estado: 'Disponible', imagen: 'cable-nexans.png', descripcion: 'Cable eléctrico de 2,5 mm para instalaciones y circuitos domiciliarios.' },
            { id: 14, codigo: 'PROD-014', nombre: 'Ampolleta LED Philips 12W', categoria: 'electricidad', precio: 3990, stockActual: 30, stockMinimo: 10, estado: 'Disponible', imagen: 'ampolleta-philips.png', descripcion: 'Ampolleta LED de bajo consumo para iluminación interior.' },
            { id: 15, codigo: 'PROD-015', nombre: 'Tubo conduit Tigre 20 mm', categoria: 'electricidad', precio: 2990, stockActual: 40, stockMinimo: 10, estado: 'Disponible', imagen: 'tubo-tigre.png', descripcion: 'Tubo conduit para proteger y ordenar cableado eléctrico.' },
            { id: 16, codigo: 'PROD-016', nombre: 'Pintura Ceresita Esmalte al Agua', categoria: 'pinturas', precio: 24990, stockActual: 6, stockMinimo: 3, estado: 'Disponible', imagen: 'pintura.png', descripcion: 'Esmalte al agua multisuperficie para uso interior y exterior.' },
            { id: 17, codigo: 'PROD-017', nombre: 'Látex interior Sipa', categoria: 'pinturas', precio: 19990, stockActual: 9, stockMinimo: 3, estado: 'Disponible', imagen: 'pintura-sipa.png', descripcion: 'Pintura látex para muros y cielos interiores de alta cobertura.' },
            { id: 18, codigo: 'PROD-018', nombre: 'Esmalte sintético Tricolor', categoria: 'pinturas', precio: 16990, stockActual: 11, stockMinimo: 3, estado: 'Disponible', imagen: 'pintura-tricolor.png', descripcion: 'Esmalte sintético para proteger y decorar distintas superficies.' },
            { id: 19, codigo: 'PROD-019', nombre: 'Anticorrosivo Chilcorrofin', categoria: 'pinturas', precio: 22990, stockActual: 7, stockMinimo: 3, estado: 'Disponible', imagen: 'chilcorrofin.png', descripcion: 'Pintura anticorrosiva para protección de superficies metálicas.' },
            { id: 20, codigo: 'PROD-020', nombre: 'Látex interior Sherwin-Williams', categoria: 'pinturas', precio: 27990, stockActual: 0, stockMinimo: 3, estado: 'Sin stock', imagen: 'sherwin-williams.png', descripcion: 'Pintura látex interior de terminación mate para muros y cielos.' }
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

    // Inicializar la base simulada y migrar datos antiguos si existen.
    // IMPORTANTE: solo este archivo toca localStorage directamente.
    function init() {
        const migrarClave = (claveAntigua, claveNueva) => {
            if (localStorage.getItem(claveNueva) === null && localStorage.getItem(claveAntigua) !== null) {
                localStorage.setItem(claveNueva, localStorage.getItem(claveAntigua));
                localStorage.removeItem(claveAntigua);
            }
        };

        // Migración de la versión anterior del proyecto.
        migrarClave('usuarios', 'db_usuarios');
        migrarClave('usuarioSesion', 'db_usuarioSesion');
        migrarClave('usuarioActivo', 'db_usuarioActivo');
        migrarClave('stockFerreteria', 'db_stockFerreteria');
        migrarClave('carritoFerreteria', 'db_carritoFerreteria');

        // Versión 2: unifica el catálogo público, administrador y vendedor.
        // Se ejecuta una sola vez en navegadores que tenían la versión antigua separada.
        if (localStorage.getItem('db_productos_version') !== '2') {
            localStorage.setItem('db_productos', JSON.stringify(seed.productos));
            localStorage.setItem('db_productos_version', '2');
            localStorage.removeItem('db_stockFerreteria');
        } else if (!localStorage.getItem('db_productos')) {
            localStorage.setItem('db_productos', JSON.stringify(seed.productos));
        }
        if (!localStorage.getItem('db_pedidos')) localStorage.setItem('db_pedidos', JSON.stringify(seed.pedidos));
        if (!localStorage.getItem('db_usuarios')) localStorage.setItem('db_usuarios', JSON.stringify(seed.usuarios));
    }

    // --- MÉTODOS CRUD GENÉRICOS ---
    const getTabla = (tabla) => JSON.parse(localStorage.getItem(`db_${tabla}`)) || [];
    const setTabla = (tabla, data) => localStorage.setItem(`db_${tabla}`, JSON.stringify(data));

    // Para datos que no son tablas, por ejemplo sesión, carrito o stock.
    const getDato = (clave, valorPorDefecto = null) => {
        const valor = localStorage.getItem(`db_${clave}`);
        return valor === null ? valorPorDefecto : JSON.parse(valor);
    };

    const setDato = (clave, valor) => {
        localStorage.setItem(`db_${clave}`, JSON.stringify(valor));
    };

    const eliminarDato = (clave) => {
        localStorage.removeItem(`db_${clave}`);
    };

    // Lógica automática de estado de stock
    const calcularEstadoStock = (actual, minimo) => {
        if (actual <= 0) return 'Sin stock';
        if (actual <= minimo) return 'Stock bajo';
        return 'Disponible';
    };

    return {
        init, getTabla, setTabla, getDato, setDato, eliminarDato,
        
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