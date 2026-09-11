console.log("JavaScript de la tienda funcionando");


// ==========================================
// ARREGLO DE PRODUCTOS
// ==========================================

const productos = [

    // ==========================================
    // HERRAMIENTAS
    // ==========================================

    {
        id: 1,
        nombre: "Taladro inalámbrico Bauker 20V",
        categoria: "herramientas",
        precio: 59990,
        stock: 8,
        imagen: "../img/taladro.jpg"
    },

    {
        id: 2,
        nombre: "Martillo Bauker 16 oz",
        categoria: "herramientas",
        precio: 12990,
        stock: 12,
        imagen: "../img/martillo.png"
    },

    {
        id: 3,
        nombre: "Esmeril angular Bosch",
        categoria: "herramientas",
        precio: 49990,
        stock: 7,
        imagen: "../img/esmeril-bosch.png"
    },

    {
        id: 4,
        nombre: "Sierra circular Makita",
        categoria: "herramientas",
        precio: 89990,
        stock: 5,
        imagen: "../img/sierra-makita.png"
    },

    {
        id: 5,
        nombre: "Juego de destornilladores Stanley",
        categoria: "herramientas",
        precio: 19990,
        stock: 18,
        imagen: "../img/destornilladores-stanley.png"
    },


    // ==========================================
    // CONSTRUCCIÓN
    // ==========================================

    {
        id: 6,
        nombre: "Cemento Melón 25 kg",
        categoria: "construccion",
        precio: 8990,
        stock: 20,
        imagen: "../img/cemento.png"
    },

    {
        id: 7,
        nombre: "Cemento Polpaico 25 kg",
        categoria: "construccion",
        precio: 8490,
        stock: 25,
        imagen: "../img/cemento-polpaico.png"
    },

    {
        id: 8,
        nombre: "Yeso Volcán 25 kg",
        categoria: "construccion",
        precio: 9990,
        stock: 14,
        imagen: "../img/yeso-volcan.png"
    },

    {
        id: 9,
        nombre: "Plancha yeso cartón Volcán",
        categoria: "construccion",
        precio: 10990,
        stock: 30,
        imagen: "../img/plancha-volcan.png"
    },

    {
        id: 10,
        nombre: "Mortero Presec 25 kg",
        categoria: "construccion",
        precio: 7990,
        stock: 16,
        imagen: "../img/mortero-presec.png"
    },


    // ==========================================
    // ELECTRICIDAD
    // ==========================================

    {
        id: 11,
        nombre: "Interruptor automático Schneider 16A",
        categoria: "electricidad",
        precio: 8990,
        stock: 15,
        imagen: "../img/automatico-schneider.png"
    },

    {
        id: 12,
        nombre: "Enchufe doble Legrand",
        categoria: "electricidad",
        precio: 5490,
        stock: 25,
        imagen: "../img/enchufe-legrand.png"
    },

    {
        id: 13,
        nombre: "Cable eléctrico Nexans 2.5 mm",
        categoria: "electricidad",
        precio: 18990,
        stock: 10,
        imagen: "../img/cable-nexans.png"
    },

    {
        id: 14,
        nombre: "Ampolleta LED Philips 12W",
        categoria: "electricidad",
        precio: 3990,
        stock: 30,
        imagen: "../img/ampolleta-philips.png"
    },

    {
        id: 15,
        nombre: "Tubo conduit Tigre 20 mm",
        categoria: "electricidad",
        precio: 2990,
        stock: 40,
        imagen: "../img/tubo-tigre.png"
    },


    // ==========================================
    // PINTURAS
    // ==========================================

    {
        id: 16,
        nombre: "Pintura Ceresita Esmalte al Agua",
        categoria: "pinturas",
        precio: 24990,
        stock: 6,
        imagen: "../img/pintura.png"
    },

    {
        id: 17,
        nombre: "Látex interior Sipa",
        categoria: "pinturas",
        precio: 19990,
        stock: 9,
        imagen: "../img/pintura-sipa.png"
    },

    {
        id: 18,
        nombre: "Esmalte sintético Tricolor",
        categoria: "pinturas",
        precio: 16990,
        stock: 11,
        imagen: "../img/pintura-tricolor.png"
    },

    {
        id: 19,
        nombre: "Anticorrosivo Chilcorrofin",
        categoria: "pinturas",
        precio: 22990,
        stock: 7,
        imagen: "../img/chilcorrofin.png"
    },

    {
        id: 20,
        nombre: "Látex interior Sherwin-Williams",
        categoria: "pinturas",
        precio: 27990,
        stock: 8,
        imagen: "../img/sherwin-williams.png"
    }

];



const listaProductos = document.getElementById("listaProductos");

const buscarProducto = document.getElementById("buscarProducto");


const parametros = new URLSearchParams(window.location.search);

const categoriaSeleccionada = parametros.get("categoria");

function mostrarProductos(lista) {

    listaProductos.innerHTML = "";

    if (lista.length === 0) {

        listaProductos.innerHTML = `
            <div class="col-12 text-center">
                <p>No se encontraron productos.</p>
            </div>
        `;

        return;
    }


    lista.forEach(function(producto) {

        let estadoStock = "";

        if (producto.stock > 0) {

            estadoStock = "Stock: " + producto.stock;

        } else {

            estadoStock = "Sin stock";

        }


        listaProductos.innerHTML += `
            <div class="col-12 col-md-6 col-lg-3">

                <div class="card h-100">

                    <img
                        src="${producto.imagen}"
                        class="card-img-top"
                        alt="${producto.nombre}"
                    >

                    <div class="card-body">

                        <h3 class="card-title">
                            ${producto.nombre}
                        </h3>

                        <p class="fw-bold">
                            $${producto.precio.toLocaleString("es-CL")}
                        </p>

                        <p>
                            ${estadoStock}
                        </p>

                        <a
                            href="detalle-producto.html?id=${producto.id}"
                            class="btn btn-warning"
                        >
                            Ver producto
                        </a>

                    </div>

                </div>

            </div>
        `;

    });

}


if (listaProductos) {

    let productosIniciales = productos;

    if (categoriaSeleccionada) {

        productosIniciales = [];


        productos.forEach(function(producto) {

            if (producto.categoria === categoriaSeleccionada) {

                productosIniciales.push(producto);

            }

        });

    }


    mostrarProductos(productosIniciales);

    if (buscarProducto) {

        buscarProducto.addEventListener("input", function() {

            const textoBusqueda =
                buscarProducto.value.toLowerCase();

            const productosFiltrados = [];


            productosIniciales.forEach(function(producto) {

                const nombreProducto =
                    producto.nombre.toLowerCase();


                if (nombreProducto.includes(textoBusqueda)) {

                    productosFiltrados.push(producto);

                }

            });


            mostrarProductos(productosFiltrados);

        });

    }

}