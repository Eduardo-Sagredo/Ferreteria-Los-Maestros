console.log("JavaScript de la tienda funcionando");


// Lista de productos: UNA SOLA FUENTE DE DATOS.
// Administrador, vendedor y tienda pública leen la misma tabla de MockDB.
let productos = MockDB.getTabla('productos').map(function (producto) {
    return {
        ...producto,
        stock: Number(producto.stockActual || 0),
        imagen: resolverImagenProducto(producto.imagen),
        descripcion: producto.descripcion || ''
    };
});

function resolverImagenProducto(imagen) {
    if (!imagen) {
        return window.location.pathname.includes('/pages/') ? '../img/logo.png' : 'img/logo.png';
    }

    if (/^(https?:|data:|blob:)/i.test(imagen)) {
        return imagen;
    }

    if (imagen.startsWith('../') || imagen.startsWith('img/')) {
        // Normaliza rutas guardadas antiguamente.
        const nombre = imagen.split('/').pop();
        return window.location.pathname.includes('/pages/') ? '../img/' + nombre : 'img/' + nombre;
    }

    return window.location.pathname.includes('/pages/') ? '../img/' + imagen : 'img/' + imagen;
}

// Guarda los cambios de stock directamente en db_productos.
function guardarStock() {
    const productosDB = MockDB.getTabla('productos');

    productos.forEach(function (productoVista) {
        const productoDB = productosDB.find(function (p) {
            return p.id === productoVista.id;
        });

        if (productoDB) {
            productoDB.stockActual = productoVista.stock;
            productoDB.estado = productoDB.stockActual <= 0
                ? 'Sin stock'
                : (productoDB.stockActual <= productoDB.stockMinimo ? 'Stock bajo' : 'Disponible');
        }
    });

    MockDB.setTabla('productos', productosDB);
}


// Carrito guardado en el navegador

let carrito = [];

const carritoGuardado =
    MockDB.getDato("carritoFerreteria", null);


if (carritoGuardado) {

    carrito =
        carritoGuardado;

}


// Busca un producto por su id

function buscarProductoPorId(id) {

    let productoEncontrado = null;


    productos.forEach(function (producto) {

        if (producto.id === id) {

            productoEncontrado = producto;

        }

    });


    return productoEncontrado;

}


// Guarda el carrito

function guardarCarrito() {

    MockDB.setDato(
        "carritoFerreteria",
        carrito
    );

    actualizarContadorCarrito();

}


// Muestra la cantidad de productos en el icono del carrito

function actualizarContadorCarrito() {

    const contadorCarrito =
        document.getElementById("contadorCarrito");


    if (contadorCarrito) {

        let cantidadTotal = 0;


        carrito.forEach(function (item) {

            cantidadTotal =
                cantidadTotal + item.cantidad;

        });


        contadorCarrito.textContent =
            cantidadTotal;

    }

}


// Muestra mensajes de éxito o error

function mostrarMensaje(texto, esError) {

    const mensaje =
        document.getElementById("mensajeTienda");


    if (mensaje) {

        if (esError) {

            mensaje.className =
                "alert alert-danger mt-3";

        } else {

            mensaje.className =
                "alert alert-success mt-3";

        }


        mensaje.textContent = texto;

    } else {

        alert(texto);

    }

}


// Agrega un producto al carrito

function agregarAlCarrito(idProducto, cantidad) {

    const producto =
        buscarProductoPorId(idProducto);


    if (producto === null) {

        mostrarMensaje(
            "No se encontró el producto.",
            true
        );

        return;

    }


    if (producto.stock === 0) {

        mostrarMensaje(
            "Este producto no tiene stock disponible.",
            true
        );

        return;

    }


    if (cantidad < 1) {

        mostrarMensaje(
            "La cantidad debe ser mayor a 0.",
            true
        );

        return;

    }


    let itemEncontrado = null;


    carrito.forEach(function (item) {

        if (item.id === idProducto) {

            itemEncontrado = item;

        }

    });


    let cantidadActual = 0;


    if (itemEncontrado !== null) {

        cantidadActual =
            itemEncontrado.cantidad;

    }


    if (cantidadActual + cantidad > producto.stock) {

        mostrarMensaje(
            "No puedes superar el stock disponible.",
            true
        );

        return;

    }


    if (itemEncontrado !== null) {

        itemEncontrado.cantidad =
            itemEncontrado.cantidad + cantidad;

    } else {

        carrito.push({

            id: idProducto,
            cantidad: cantidad

        });

    }


    guardarCarrito();

    mostrarMensaje(
        "Producto agregado al carrito.",
        false
    );

}


// Productos destacados de la página de inicio.
// Se generan desde MockDB para que editar/eliminar desde administrador se refleje aquí.
const contenedorDestacados = document.getElementById('productosDestacados');

function mostrarProductosDestacados() {
    if (!contenedorDestacados) return;

    const destacados = productos.slice(0, 4);

    if (destacados.length === 0) {
        contenedorDestacados.innerHTML = '<div class="col-12 text-center"><p>No hay productos disponibles.</p></div>';
        return;
    }

    contenedorDestacados.innerHTML = destacados.map(function (producto) {
        return `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title">${producto.nombre}</h3>
                        <p class="card-text">${producto.descripcion || 'Producto disponible en Ferretería Los Maestros.'}</p>
                        <p class="fw-bold">$${producto.precio.toLocaleString('es-CL')}</p>
                        <a href="pages/detalle-producto.html?id=${producto.id}" class="btn btn-warning mt-auto">Ver producto</a>
                    </div>
                </div>
            </div>`;
    }).join('');
}

mostrarProductosDestacados();

// Catalogo

const listaProductos =
    document.getElementById("listaProductos");

const buscarProducto =
    document.getElementById("buscarProducto");


function mostrarProductos(lista) {

    if (listaProductos === null) {

        return;

    }


    listaProductos.innerHTML = "";


    if (lista.length === 0) {

        listaProductos.innerHTML = `

            <div class="col-12 text-center py-5">

                <p>
                    No se encontraron productos.
                </p>

            </div>

        `;

        return;

    }


    lista.forEach(function (producto) {

        let textoStock = "";

        let botonAgregar = "";


        if (producto.stock > 0) {

            textoStock = `
                <span class="stock-disponible">
                    Stock: ${producto.stock}
                </span>
            `;


            botonAgregar = `

                <button
                    class="btn btn-dark btn-agregar"
                    data-id="${producto.id}">

                    <i class="bi bi-cart-plus"></i>

                    Agregar

                </button>

            `;

        } else {

            textoStock = `
                <span class="sin-stock">
                    Sin stock
                </span>
            `;


            botonAgregar = `

                <button
                    class="btn btn-secondary"
                    disabled>

                    Sin stock

                </button>

            `;

        }


        listaProductos.innerHTML =
            listaProductos.innerHTML + `

            <div class="col-12 col-md-6 col-lg-3">

                <div class="card producto-card h-100">

                    <img
                        src="${producto.imagen}"
                        class="card-img-top"
                        alt="${producto.nombre}">


                    <div class="card-body d-flex flex-column">

                        <p class="categoria-producto mb-2">
                            ${producto.categoria}
                        </p>

                        <h2 class="card-title producto-titulo">
                            ${producto.nombre}
                        </h2>

                        <p class="precio-producto">
                            $${producto.precio.toLocaleString("es-CL")}
                        </p>

                        <p>
                            ${textoStock}
                        </p>


                        <div class="mt-auto d-flex gap-2 flex-wrap">

                            <a
                                href="detalle-producto.html?id=${producto.id}"
                                class="btn btn-warning">

                                Ver producto

                            </a>

                            ${botonAgregar}

                        </div>

                    </div>

                </div>

            </div>

        `;

    });


    const botonesAgregar =
        document.querySelectorAll(".btn-agregar");


    botonesAgregar.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const idProducto =
                Number(
                    boton.getAttribute("data-id")
                );


            agregarAlCarrito(
                idProducto,
                1
            );

        });

    });

}


if (listaProductos) {

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const categoriaSeleccionada =
        parametros.get("categoria");


    let productosIniciales = [];


    if (categoriaSeleccionada) {

        productos.forEach(function (producto) {

            if (
                producto.categoria ===
                categoriaSeleccionada
            ) {

                productosIniciales.push(
                    producto
                );

            }

        });

    } else {

        productosIniciales =
            productos;

    }


    mostrarProductos(
        productosIniciales
    );


    if (buscarProducto) {

        buscarProducto.addEventListener(
            "input",
            function () {

                const texto =
                    buscarProducto.value.toLowerCase();


                const productosEncontrados = [];


                productosIniciales.forEach(
                    function (producto) {

                        const nombre =
                            producto.nombre.toLowerCase();


                        if (
                            nombre.includes(texto)
                        ) {

                            productosEncontrados.push(
                                producto
                            );

                        }

                    }
                );


                mostrarProductos(
                    productosEncontrados
                );

            }
        );

    }

}


// Detalle del producto

const detalleProducto =
    document.getElementById("detalleProducto");


if (detalleProducto) {

    const parametrosDetalle =
        new URLSearchParams(
            window.location.search
        );


    const idProducto =
        Number(
            parametrosDetalle.get("id")
        );


    const producto =
        buscarProductoPorId(idProducto);


    if (producto !== null) {

        let stockDetalle = "";

        let zonaBoton = "";


        if (producto.stock > 0) {

            stockDetalle = `

                <span class="stock-disponible">

                    ${producto.stock}
                    unidades disponibles

                </span>

            `;


            zonaBoton = `

                <div class="row g-3 align-items-end">

                    <div class="col-12 col-sm-4">

                        <label
                            for="cantidadProducto"
                            class="form-label">

                            Cantidad

                        </label>

                        <input
                            type="number"
                            id="cantidadProducto"
                            class="form-control"
                            value="1"
                            min="1"
                            max="${producto.stock}">

                    </div>


                    <div class="col-12 col-sm-8">

                        <button
                            id="btnAgregarDetalle"
                            class="btn btn-warning w-100">

                            <i class="bi bi-cart-plus"></i>

                            Agregar al carrito

                        </button>

                    </div>

                </div>

            `;

        } else {

            stockDetalle = `

                <span class="sin-stock">
                    Producto sin stock
                </span>

            `;


            zonaBoton = `

                <button
                    class="btn btn-secondary w-100"
                    disabled>

                    Sin stock

                </button>

            `;

        }


        detalleProducto.innerHTML = `

            <div class="row g-5 align-items-center">

                <div class="col-12 col-lg-6 text-center">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        class="img-fluid detalle-imagen">

                </div>


                <div class="col-12 col-lg-6">

                    <p class="categoria-producto">
                        ${producto.categoria}
                    </p>

                    <h1>
                        ${producto.nombre}
                    </h1>

                    <p class="detalle-descripcion">
                        ${producto.descripcion}
                    </p>

                    <p class="detalle-precio">

                        $${producto.precio.toLocaleString("es-CL")}

                    </p>

                    <p class="mb-4">

                        ${stockDetalle}

                    </p>

                    ${zonaBoton}


                    <a
                        href="productos.html"
                        class="btn volver-catalogo mt-4">

                        <i class="bi bi-arrow-left"></i>

                        Volver al catálogo

                    </a>

                </div>

            </div>

        `;


        const btnAgregarDetalle =
            document.getElementById(
                "btnAgregarDetalle"
            );


        if (btnAgregarDetalle) {

            btnAgregarDetalle.addEventListener(
                "click",
                function () {

                    const campoCantidad =
                        document.getElementById(
                            "cantidadProducto"
                        );


                    const cantidad =
                        Number(
                            campoCantidad.value
                        );


                    if (
                        campoCantidad.value === "" ||
                        cantidad < 1
                    ) {

                        mostrarMensaje(
                            "La cantidad mínima es 1.",
                            true
                        );

                        campoCantidad.value = 1;

                        return;

                    }


                    if (
                        cantidad >
                        producto.stock
                    ) {

                        mostrarMensaje(
                            "La cantidad supera el stock disponible.",
                            true
                        );

                        campoCantidad.value =
                            producto.stock;

                        return;

                    }


                    agregarAlCarrito(
                        producto.id,
                        cantidad
                    );

                }
            );

        }

    }

}


// Carrito

const listaCarrito =
    document.getElementById("listaCarrito");

const totalCarrito =
    document.getElementById("totalCarrito");

const cantidadProductosCarrito =
    document.getElementById(
        "cantidadProductosCarrito"
    );


function mostrarCarrito() {

    if (listaCarrito === null) {

        return;

    }


    listaCarrito.innerHTML = "";


    if (carrito.length === 0) {

        listaCarrito.innerHTML = `

            <div class="carrito-vacio text-center py-5">

                <i class="bi bi-cart-x fs-1"></i>

                <h2 class="h4 mt-3">
                    Tu carrito está vacío
                </h2>

                <p>
                    Agrega productos desde nuestro catálogo.
                </p>

                <a
                    href="productos.html"
                    class="btn btn-warning">

                    Ver productos

                </a>

            </div>

        `;


        totalCarrito.textContent =
            "$0";


        cantidadProductosCarrito.textContent =
            "0";


        return;

    }


    let total = 0;

    let cantidadTotal = 0;


    carrito.forEach(function (item) {

        const producto =
            buscarProductoPorId(item.id);


        if (producto !== null) {

            const subtotal =
                producto.precio *
                item.cantidad;


            total =
                total + subtotal;


            cantidadTotal =
                cantidadTotal +
                item.cantidad;


            listaCarrito.innerHTML =
                listaCarrito.innerHTML + `

                <div class="carrito-item">

                    <div class="row g-3 align-items-center">

                        <div class="col-4 col-md-2 text-center">

                            <img
                                src="${producto.imagen}"
                                alt="${producto.nombre}"
                                class="img-fluid carrito-imagen">

                        </div>


                        <div class="col-8 col-md-4">

                            <h2 class="h5 mb-1">
                                ${producto.nombre}
                            </h2>

                            <p class="mb-1">

                                $${producto.precio.toLocaleString("es-CL")}
                                c/u

                            </p>

                            <small>

                                Stock disponible:
                                ${producto.stock}

                            </small>

                        </div>


                        <div class="col-6 col-md-2">

                            <label
                                for="cantidad-${producto.id}"
                                class="form-label">

                                Cantidad

                            </label>

                            <input
                                type="number"
                                id="cantidad-${producto.id}"
                                class="form-control cantidad-carrito"
                                data-id="${producto.id}"
                                value="${item.cantidad}"
                                min="1"
                                max="${producto.stock}">

                        </div>


                        <div class="col-6 col-md-2">

                            <p class="mb-1 fw-bold">
                                Subtotal
                            </p>

                            <p class="mb-0">

                                $${subtotal.toLocaleString("es-CL")}

                            </p>

                        </div>


                        <div class="col-12 col-md-2 text-md-end">

                            <button
                                class="btn btn-outline-danger btn-eliminar"
                                data-id="${producto.id}">

                                <i class="bi bi-trash"></i>

                                Eliminar

                            </button>

                        </div>

                    </div>

                </div>

            `;

        }

    });


    totalCarrito.textContent =
        "$" +
        total.toLocaleString("es-CL");


    cantidadProductosCarrito.textContent =
        cantidadTotal;


    const cantidades =
        document.querySelectorAll(
            ".cantidad-carrito"
        );


    cantidades.forEach(function (campo) {

        campo.addEventListener(
            "change",
            function () {

                const idProducto =
                    Number(
                        campo.getAttribute(
                            "data-id"
                        )
                    );


                const nuevaCantidad =
                    Number(
                        campo.value
                    );


                cambiarCantidad(
                    idProducto,
                    nuevaCantidad
                );

            }
        );

    });


    const botonesEliminar =
        document.querySelectorAll(
            ".btn-eliminar"
        );


    botonesEliminar.forEach(function (boton) {

        boton.addEventListener(
            "click",
            function () {

                const idProducto =
                    Number(
                        boton.getAttribute(
                            "data-id"
                        )
                    );


                eliminarProducto(
                    idProducto
                );

            }
        );

    });

}


// Cambiar cantidad

function cambiarCantidad(
    idProducto,
    nuevaCantidad
) {

    const producto =
        buscarProductoPorId(idProducto);


    if (producto === null) {

        return;

    }


    if (nuevaCantidad < 1) {

        mostrarMensaje(
            "La cantidad mínima es 1.",
            true
        );


        nuevaCantidad = 1;

    }


    if (
        nuevaCantidad >
        producto.stock
    ) {

        mostrarMensaje(
            "La cantidad no puede superar el stock disponible.",
            true
        );


        nuevaCantidad =
            producto.stock;

    }


    carrito.forEach(function (item) {

        if (
            item.id ===
            idProducto
        ) {

            item.cantidad =
                nuevaCantidad;

        }

    });


    guardarCarrito();

    mostrarCarrito();

}


// Eliminar producto

function eliminarProducto(idProducto) {

    const nuevoCarrito = [];


    carrito.forEach(function (item) {

        if (
            item.id !==
            idProducto
        ) {

            nuevoCarrito.push(
                item
            );

        }

    });


    carrito =
        nuevoCarrito;


    guardarCarrito();

    mostrarCarrito();


    mostrarMensaje(
        "Producto eliminado del carrito.",
        false
    );

}


// Realizar compra

function realizarCompra() {

    if (carrito.length === 0) {

        mostrarMensaje(
            "El carrito está vacío.",
            true
        );

        return;

    }


    const metodoPago =
        document.querySelector(
            'input[name="metodoPago"]:checked'
        );


    if (metodoPago === null) {

        mostrarMensaje(
            "Debe seleccionar Débito o Crédito.",
            true
        );

        return;

    }


    let stockDisponible = true;


    carrito.forEach(function (item) {

        const producto =
            buscarProductoPorId(
                item.id
            );


        if (producto === null) {

            stockDisponible = false;

        }
        else if (
            item.cantidad >
            producto.stock
        ) {

            stockDisponible = false;

        }

    });


    if (!stockDisponible) {

        mostrarMensaje(
            "Uno o más productos no tienen stock suficiente.",
            true
        );

        return;

    }


    carrito.forEach(function (item) {

        const producto =
            buscarProductoPorId(
                item.id
            );


        producto.stock =
            producto.stock -
            item.cantidad;

    });


    guardarStock();


    carrito = [];


    guardarCarrito();

    mostrarCarrito();


    mostrarMensaje(
        "Compra realizada correctamente con " +
        metodoPago.value +
        ".",
        false
    );


    metodoPago.checked = false;

}


// Mostrar carrito

if (listaCarrito) {

    mostrarCarrito();

}


// Botón realizar compra

const btnRealizarCompra =
    document.getElementById(
        "btnRealizarCompra"
    );


if (btnRealizarCompra) {

    btnRealizarCompra.addEventListener(
        "click",
        function () {

            realizarCompra();

        }
    );

}


// Actualizar contador

actualizarContadorCarrito();