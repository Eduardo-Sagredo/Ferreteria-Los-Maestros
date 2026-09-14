console.log("JavaScript de la tienda funcionando");

// Lista de productos
const productos = [
    {
        id: 1,
        nombre: "Taladro inalámbrico Bauker 20V",
        categoria: "herramientas",
        precio: 59990,
        stock: 8,
        imagen: "../img/taladro.jpg",
        descripcion: "Taladro inalámbrico para perforar y atornillar en trabajos domésticos y de obra."
    },
    {
        id: 2,
        nombre: "Martillo Bauker 16 oz",
        categoria: "herramientas",
        precio: 12990,
        stock: 12,
        imagen: "../img/martillo.png",
        descripcion: "Martillo de uña resistente, ideal para trabajos de carpintería y construcción."
    },
    {
        id: 3,
        nombre: "Esmeril angular Bosch",
        categoria: "herramientas",
        precio: 49990,
        stock: 7,
        imagen: "../img/esmeril-bosch.png",
        descripcion: "Esmeril angular para corte y desbaste de diferentes materiales."
    },
    {
        id: 4,
        nombre: "Sierra circular Makita",
        categoria: "herramientas",
        precio: 89990,
        stock: 5,
        imagen: "../img/sierra-makita.png",
        descripcion: "Sierra circular para realizar cortes rectos en madera y tableros."
    },
    {
        id: 5,
        nombre: "Juego de destornilladores Stanley",
        categoria: "herramientas",
        precio: 19990,
        stock: 18,
        imagen: "../img/destornilladores-stanley.png",
        descripcion: "Set de destornilladores para reparaciones y trabajos de montaje."
    },

    {
        id: 6,
        nombre: "Cemento Melón 25 kg",
        categoria: "construccion",
        precio: 8990,
        stock: 20,
        imagen: "../img/cemento.png",
        descripcion: "Cemento multiuso para trabajos de hormigón, albañilería y terminaciones."
    },
    {
        id: 7,
        nombre: "Cemento Polpaico 25 kg",
        categoria: "construccion",
        precio: 8490,
        stock: 25,
        imagen: "../img/cemento-polpaico.png",
        descripcion: "Cemento para obras generales, reparaciones y trabajos de albañilería."
    },
    {
        id: 8,
        nombre: "Yeso Volcán 25 kg",
        categoria: "construccion",
        precio: 9990,
        stock: 14,
        imagen: "../img/yeso-volcan.png",
        descripcion: "Yeso para terminaciones interiores, reparaciones y nivelación de superficies."
    },
    {
        id: 9,
        nombre: "Plancha yeso cartón Volcán",
        categoria: "construccion",
        precio: 10990,
        stock: 30,
        imagen: "../img/plancha-volcan.png",
        descripcion: "Plancha de yeso cartón para tabiques, cielos y revestimientos interiores."
    },
    {
        id: 10,
        nombre: "Mortero Presec 25 kg",
        categoria: "construccion",
        precio: 7990,
        stock: 16,
        imagen: "../img/mortero-presec.png",
        descripcion: "Mortero multiuso para pegar, reparar y nivelar en trabajos de construcción."
    },

    {
        id: 11,
        nombre: "Interruptor automático Schneider 16A",
        categoria: "electricidad",
        precio: 8990,
        stock: 15,
        imagen: "../img/automatico-schneider.png",
        descripcion: "Interruptor automático para protección de circuitos eléctricos domiciliarios."
    },
    {
        id: 12,
        nombre: "Enchufe doble Legrand",
        categoria: "electricidad",
        precio: 5490,
        stock: 25,
        imagen: "../img/enchufe-legrand.png",
        descripcion: "Enchufe doble para instalaciones eléctricas interiores."
    },
    {
        id: 13,
        nombre: "Cable eléctrico Nexans 2.5 mm",
        categoria: "electricidad",
        precio: 18990,
        stock: 10,
        imagen: "../img/cable-nexans.png",
        descripcion: "Cable eléctrico de 2,5 mm para instalaciones y circuitos domiciliarios."
    },
    {
        id: 14,
        nombre: "Ampolleta LED Philips 12W",
        categoria: "electricidad",
        precio: 3990,
        stock: 30,
        imagen: "../img/ampolleta-philips.png",
        descripcion: "Ampolleta LED de bajo consumo para iluminación interior."
    },
    {
        id: 15,
        nombre: "Tubo conduit Tigre 20 mm",
        categoria: "electricidad",
        precio: 2990,
        stock: 40,
        imagen: "../img/tubo-tigre.png",
        descripcion: "Tubo conduit para proteger y ordenar cableado eléctrico."
    },

    {
        id: 16,
        nombre: "Pintura Ceresita Esmalte al Agua",
        categoria: "pinturas",
        precio: 24990,
        stock: 6,
        imagen: "../img/pintura.png",
        descripcion: "Esmalte al agua multisuperficie para uso interior y exterior."
    },
    {
        id: 17,
        nombre: "Látex interior Sipa",
        categoria: "pinturas",
        precio: 19990,
        stock: 9,
        imagen: "../img/pintura-sipa.png",
        descripcion: "Pintura látex para muros y cielos interiores de alta cobertura."
    },
    {
        id: 18,
        nombre: "Esmalte sintético Tricolor",
        categoria: "pinturas",
        precio: 16990,
        stock: 11,
        imagen: "../img/pintura-tricolor.png",
        descripcion: "Esmalte sintético para proteger y decorar distintas superficies."
    },
    {
        id: 19,
        nombre: "Anticorrosivo Chilcorrofin",
        categoria: "pinturas",
        precio: 22990,
        stock: 7,
        imagen: "../img/chilcorrofin.png",
        descripcion: "Pintura anticorrosiva para protección de superficies metálicas."
    },
    {
        id: 20,
        nombre: "Látex interior Sherwin-Williams",
        categoria: "pinturas",
        precio: 27990,
        stock: 0,
        imagen: "../img/sherwin-williams.png",
        descripcion: "Pintura látex interior de terminación mate para muros y cielos."
    }
];

// Carrito guardado en el navegador
let carrito = [];
const carritoGuardado = localStorage.getItem("carritoFerreteria");

if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
}

// Busca un producto por su id
function buscarProductoPorId(id) {
    let productoEncontrado = null;

    productos.forEach(function(producto) {
        if (producto.id === id) {
            productoEncontrado = producto;
        }
    });

    return productoEncontrado;
}

// Guarda el carrito
function guardarCarrito() {
    localStorage.setItem("carritoFerreteria", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Muestra la cantidad de productos en el icono del carrito
function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById("contadorCarrito");

    if (contadorCarrito) {
        let cantidadTotal = 0;

        carrito.forEach(function(item) {
            cantidadTotal = cantidadTotal + item.cantidad;
        });

        contadorCarrito.textContent = cantidadTotal;
    }
}

// Muestra mensajes de éxito o error
function mostrarMensaje(texto, esError) {
    const mensaje = document.getElementById("mensajeTienda");

    if (mensaje) {
        if (esError) {
            mensaje.className = "alert alert-danger mt-3";
        } else {
            mensaje.className = "alert alert-success mt-3";
        }

        mensaje.textContent = texto;
    } else {
        alert(texto);
    }
}

// Agrega un producto al carrito
function agregarAlCarrito(idProducto, cantidad) {
    const producto = buscarProductoPorId(idProducto);

    if (producto === null) {
        mostrarMensaje("No se encontró el producto.", true);
        return;
    }

    if (producto.stock === 0) {
        mostrarMensaje("Este producto no tiene stock disponible.", true);
        return;
    }

    if (cantidad < 1) {
        mostrarMensaje("La cantidad debe ser mayor a 0.", true);
        return;
    }

    let itemEncontrado = null;

    carrito.forEach(function(item) {
        if (item.id === idProducto) {
            itemEncontrado = item;
        }
    });

    let cantidadActual = 0;

    if (itemEncontrado !== null) {
        cantidadActual = itemEncontrado.cantidad;
    }

    if (cantidadActual + cantidad > producto.stock) {
        mostrarMensaje("No puedes superar el stock disponible.", true);
        return;
    }

    if (itemEncontrado !== null) {
        itemEncontrado.cantidad = itemEncontrado.cantidad + cantidad;
    } else {
        carrito.push({
            id: idProducto,
            cantidad: cantidad
        });
    }

    guardarCarrito();
    mostrarMensaje("Producto agregado al carrito.", false);
}

//catalogo

const listaProductos = document.getElementById("listaProductos");
const buscarProducto = document.getElementById("buscarProducto");

function mostrarProductos(lista) {
    if (listaProductos === null) {
        return;
    }

    listaProductos.innerHTML = "";

    if (lista.length === 0) {
        listaProductos.innerHTML = `
            <div class="col-12 text-center py-5">
                <p>No se encontraron productos.</p>
            </div>
        `;
        return;
    }

    lista.forEach(function(producto) {
        let textoStock = "";
        let botonAgregar = "";

        if (producto.stock > 0) {
            textoStock = `<span class="stock-disponible">Stock: ${producto.stock}</span>`;
            botonAgregar = `
                <button class="btn btn-dark btn-agregar" data-id="${producto.id}">
                    <i class="bi bi-cart-plus"></i> Agregar
                </button>
            `;
        } else {
            textoStock = `<span class="sin-stock">Sin stock</span>`;
            botonAgregar = `<button class="btn btn-secondary" disabled>Sin stock</button>`;
        }

        listaProductos.innerHTML = listaProductos.innerHTML + `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card producto-card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">

                    <div class="card-body d-flex flex-column">
                        <p class="categoria-producto mb-2">${producto.categoria}</p>
                        <h2 class="card-title producto-titulo">${producto.nombre}</h2>
                        <p class="precio-producto">$${producto.precio.toLocaleString("es-CL")}</p>
                        <p>${textoStock}</p>

                        <div class="mt-auto d-flex gap-2 flex-wrap">
                            <a href="detalle-producto.html?id=${producto.id}" class="btn btn-warning">
                                Ver producto
                            </a>
                            ${botonAgregar}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    const botonesAgregar = document.querySelectorAll(".btn-agregar");

    botonesAgregar.forEach(function(boton) {
        boton.addEventListener("click", function() {
            const idProducto = Number(boton.getAttribute("data-id"));
            agregarAlCarrito(idProducto, 1);
        });
    });
}

if (listaProductos) {
    const parametros = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = parametros.get("categoria");
    let productosIniciales = [];

    if (categoriaSeleccionada) {
        productos.forEach(function(producto) {
            if (producto.categoria === categoriaSeleccionada) {
                productosIniciales.push(producto);
            }
        });
    } else {
        productosIniciales = productos;
    }

    mostrarProductos(productosIniciales);

    if (buscarProducto) {
        buscarProducto.addEventListener("input", function() {
            const texto = buscarProducto.value.toLowerCase();
            const productosEncontrados = [];

            productosIniciales.forEach(function(producto) {
                const nombre = producto.nombre.toLowerCase();

                if (nombre.includes(texto)) {
                    productosEncontrados.push(producto);
                }
            });

            mostrarProductos(productosEncontrados);
        });
    }
}

//detalle del producto

const detalleProducto = document.getElementById("detalleProducto");

if (detalleProducto) {
    const parametrosDetalle = new URLSearchParams(window.location.search);
    const idProducto = Number(parametrosDetalle.get("id"));
    const producto = buscarProductoPorId(idProducto);

    if (producto !== null) {
        let stockDetalle = "";
        let zonaBoton = "";

        if (producto.stock > 0) {
            stockDetalle = `<span class="stock-disponible">${producto.stock} unidades disponibles</span>`;

            zonaBoton = `
                <div class="row g-3 align-items-end">
                    <div class="col-12 col-sm-4">
                        <label for="cantidadProducto" class="form-label">Cantidad</label>
                        <input type="number" id="cantidadProducto" class="form-control" value="1" min="1" max="${producto.stock}">
                    </div>

                    <div class="col-12 col-sm-8">
                        <button id="btnAgregarDetalle" class="btn btn-warning w-100">
                            <i class="bi bi-cart-plus"></i> Agregar al carrito
                        </button>
                    </div>
                </div>
            `;
        } else {
            stockDetalle = `<span class="sin-stock">Producto sin stock</span>`;
            zonaBoton = `<button class="btn btn-secondary w-100" disabled>Sin stock</button>`;
        }

        detalleProducto.innerHTML = `
            <div class="row g-5 align-items-center">
                <div class="col-12 col-lg-6 text-center">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid detalle-imagen">
                </div>

                <div class="col-12 col-lg-6">
                    <p class="categoria-producto">${producto.categoria}</p>
                    <h1>${producto.nombre}</h1>
                    <p class="detalle-descripcion">${producto.descripcion}</p>
                    <p class="detalle-precio">$${producto.precio.toLocaleString("es-CL")}</p>
                    <p class="mb-4">${stockDetalle}</p>
                    ${zonaBoton}

                    <a href="productos.html" class="btn volver-catalogo mt-4">
                        <i class="bi bi-arrow-left"></i>
                        Volver al catálogo
                    </a>
                </div>
            </div>
        `;

        const btnAgregarDetalle = document.getElementById("btnAgregarDetalle");

        if (btnAgregarDetalle) {
            btnAgregarDetalle.addEventListener("click", function () {

                const campoCantidad = document.getElementById("cantidadProducto");
                const cantidad = Number(campoCantidad.value);

                if (campoCantidad.value === "" || cantidad < 1) {
                    mostrarMensaje("La cantidad mínima es 1.", true);
                    campoCantidad.value = 1;
                    return;
                }

                if (cantidad > producto.stock) {
                    mostrarMensaje("La cantidad supera el stock disponible.", true);
                    campoCantidad.value = producto.stock;
                    return;
                }

                agregarAlCarrito(producto.id, cantidad);
            });
        }
    }
}
//carrito

const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const cantidadProductosCarrito = document.getElementById("cantidadProductosCarrito");

function mostrarCarrito() {
    if (listaCarrito === null) {
        return;
    }

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <div class="carrito-vacio text-center py-5">
                <i class="bi bi-cart-x fs-1"></i>
                <h2 class="h4 mt-3">Tu carrito está vacío</h2>
                <p>Agrega productos desde nuestro catálogo.</p>
                <a href="productos.html" class="btn btn-warning">Ver productos</a>
            </div>
        `;

        totalCarrito.textContent = "$0";
        cantidadProductosCarrito.textContent = "0";
        return;
    }

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(function(item) {
        const producto = buscarProductoPorId(item.id);

        if (producto !== null) {
            const subtotal = producto.precio * item.cantidad;

            total = total + subtotal;
            cantidadTotal = cantidadTotal + item.cantidad;

            listaCarrito.innerHTML = listaCarrito.innerHTML + `
                <div class="carrito-item">
                    <div class="row g-3 align-items-center">
                        <div class="col-4 col-md-2 text-center">
                            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid carrito-imagen">
                        </div>

                        <div class="col-8 col-md-4">
                            <h2 class="h5 mb-1">${producto.nombre}</h2>
                            <p class="mb-1">$${producto.precio.toLocaleString("es-CL")} c/u</p>
                            <small>Stock disponible: ${producto.stock}</small>
                        </div>

                        <div class="col-6 col-md-2">
                            <label for="cantidad-${producto.id}" class="form-label">Cantidad</label>
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
                            <p class="mb-1 fw-bold">Subtotal</p>
                            <p class="mb-0">$${subtotal.toLocaleString("es-CL")}</p>
                        </div>

                        <div class="col-12 col-md-2 text-md-end">
                            <button class="btn btn-outline-danger btn-eliminar" data-id="${producto.id}">
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    totalCarrito.textContent = "$" + total.toLocaleString("es-CL");
    cantidadProductosCarrito.textContent = cantidadTotal;

    const cantidades = document.querySelectorAll(".cantidad-carrito");

    cantidades.forEach(function(campo) {
        campo.addEventListener("change", function() {
            const idProducto = Number(campo.getAttribute("data-id"));
            const nuevaCantidad = Number(campo.value);
            cambiarCantidad(idProducto, nuevaCantidad);
        });
    });

    const botonesEliminar = document.querySelectorAll(".btn-eliminar");

    botonesEliminar.forEach(function(boton) {
        boton.addEventListener("click", function() {
            const idProducto = Number(boton.getAttribute("data-id"));
            eliminarProducto(idProducto);
        });
    });
}

function cambiarCantidad(idProducto, nuevaCantidad) {
    const producto = buscarProductoPorId(idProducto);

    if (producto === null) {
        return;
    }

    if (nuevaCantidad < 1) {
        mostrarMensaje("La cantidad mínima es 1.", true);
        nuevaCantidad = 1;
    }

    if (nuevaCantidad > producto.stock) {
        mostrarMensaje("La cantidad no puede superar el stock disponible.", true);
        nuevaCantidad = producto.stock;
    }

    carrito.forEach(function(item) {
        if (item.id === idProducto) {
            item.cantidad = nuevaCantidad;
        }
    });

    guardarCarrito();
    mostrarCarrito();
}

function eliminarProducto(idProducto) {
    const nuevoCarrito = [];

    carrito.forEach(function(item) {
        if (item.id !== idProducto) {
            nuevoCarrito.push(item);
        }
    });

    carrito = nuevoCarrito;
    guardarCarrito();
    mostrarCarrito();
    mostrarMensaje("Producto eliminado del carrito.", false);
}

if (listaCarrito) {
    mostrarCarrito();
}

actualizarContadorCarrito();
