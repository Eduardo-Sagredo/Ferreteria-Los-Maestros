document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idEdit = urlParams.get('edit');
    
    if(idEdit) {
        document.getElementById('titulo-formulario').innerText = "Editar Producto";
        const prod = MockDB.getTabla('productos').find(p => p.id == idEdit);
        if(prod) {
            document.getElementById('input-codigo').value = prod.codigo;
            document.getElementById('input-nombre').value = prod.nombre;
            document.getElementById('input-categoria').value = prod.categoria;
            document.getElementById('input-precio').value = prod.precio;
            document.getElementById('input-stock').value = prod.stockActual;
            document.getElementById('input-stock-minimo').value = prod.stockMinimo;
            if(document.getElementById('input-descripcion')) document.getElementById('input-descripcion').value = prod.descripcion || '';
            if(document.getElementById('input-url-imagen')) {
                const imagen = prod.imagen || '';
                document.getElementById('input-url-imagen').value = /^(https?:)/i.test(imagen) ? imagen : '';
            }
        }
    }

    document.getElementById('form-producto')?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let productos = MockDB.getTabla('productos');
        const stockIngresado = parseInt(document.getElementById('input-stock').value) || 0;
        const minIngresado = parseInt(document.getElementById('input-stock-minimo').value) || 0;
        
        let estadoCalc = 'Disponible';
        if (stockIngresado <= 0) estadoCalc = 'Sin stock';
        else if (stockIngresado <= minIngresado) estadoCalc = 'Stock bajo';

        const productoAnterior = idEdit ? productos.find(p => p.id == idEdit) : null;
        const urlImagen = document.getElementById('input-url-imagen')?.value.trim() || '';

        const data = {
            ...(productoAnterior || {}),
            id: idEdit ? parseInt(idEdit) : Date.now(),
            codigo: document.getElementById('input-codigo').value,
            nombre: document.getElementById('input-nombre').value,
            categoria: document.getElementById('input-categoria').value,
            precio: parseInt(document.getElementById('input-precio').value) || 0,
            stockActual: stockIngresado,
            stockMinimo: minIngresado,
            estado: estadoCalc,
            descripcion: document.getElementById('input-descripcion')?.value.trim() || '',
            imagen: urlImagen || productoAnterior?.imagen || 'logo.png'
        };

        if(idEdit) {
            const index = productos.findIndex(p => p.id == idEdit);
            if(index !== -1) productos[index] = data;
        } else {
            productos.push(data);
        }

        MockDB.setTabla('productos', productos);
        window.location.href = 'gestion-productos.html'; // Asegúrate de que el nombre de tu archivo HTML sea este
    });
});