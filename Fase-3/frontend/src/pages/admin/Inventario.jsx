import { useEffect, useState } from 'react';
import productoService from '../../api/productoService.js';

import '../../components/styles.css';
import '../../components/tienda.css';

export const Inventario = () => {

    const [productos, setProductos] =
        useState([]);

    const [busqueda, setBusqueda] =
        useState('');

    const [filtroEstado, setFiltroEstado] =
        useState('todos');

    const [showModal, setShowModal] =
        useState(false);

    const [productoSeleccionado, setProductoSeleccionado] =
        useState(null);

    const [nuevoStock, setNuevoStock] =
        useState(0);

    const [cargando, setCargando] =
        useState(true);

    const [guardando, setGuardando] =
        useState(false);

    const [mensaje, setMensaje] =
        useState('');

    const [mensajeError, setMensajeError] =
        useState(false);


    /*
        CARGAR PRODUCTOS DESDE BACKEND
    */
    useEffect(() => {

        cargarProductos();

    }, []);


    async function cargarProductos() {

        try {

            setCargando(true);

            const datos =
                await productoService.obtenerTodos();

            setProductos(datos);

        } catch (error) {

            console.error(
                'Error al cargar inventario:',
                error
            );

            setMensaje(
                'No fue posible cargar el inventario.'
            );

            setMensajeError(true);

        } finally {

            setCargando(false);

        }
    }


    /*
        PRODUCTOS SIN STOCK
    */
    const productosSinStock =
        productos.filter(
            producto =>
                producto.estado === 'Sin stock'
        );


    /*
        PRODUCTOS CON STOCK BAJO
    */
    const productosStockBajo =
        productos.filter(
            producto =>
                producto.estado === 'Stock bajo'
        );


    /*
        FILTROS
    */
    const productosFiltrados =
        productos.filter(producto => {

            const coincideTexto =
                producto.nombre
                    .toLowerCase()
                    .includes(
                        busqueda.toLowerCase()
                    ) ||
                producto.codigo
                    .toLowerCase()
                    .includes(
                        busqueda.toLowerCase()
                    );

            const coincideEstado =
                filtroEstado === 'todos' ||
                producto.estado ===
                    filtroEstado;

            return (
                coincideTexto &&
                coincideEstado
            );
        });


    /*
        ABRIR MODAL
    */
    const handleAbrirModal = (producto) => {

        setProductoSeleccionado(
            producto
        );

        setNuevoStock(
            producto.stockActual
        );

        setShowModal(true);
    };


    /*
        CERRAR MODAL
    */
    const handleCerrarModal = () => {

        setShowModal(false);

        setProductoSeleccionado(
            null
        );
    };


    /*
        ACTUALIZAR STOCK EN SPRING BOOT
    */
    const handleGuardarStock =
        async () => {

            if (!productoSeleccionado) {
                return;
            }

            const stock =
                Number(nuevoStock);

            if (stock < 0) {

                setMensaje(
                    'El stock no puede ser negativo.'
                );

                setMensajeError(true);

                return;
            }


            /*
                Se envía el producto completo porque
                PUT /api/productos/{id}
                trabaja con ProductoRequest.
            */
            const productoActualizado = {

                codigo:
                    productoSeleccionado.codigo,

                nombre:
                    productoSeleccionado.nombre,

                categoria:
                    productoSeleccionado.categoria,

                precio:
                    productoSeleccionado.precio,

                stockActual:
                    stock,

                stockMinimo:
                    productoSeleccionado.stockMinimo,

                imagen:
                    productoSeleccionado.imagen,

                descripcion:
                    productoSeleccionado.descripcion

            };


            try {

                setGuardando(true);

                const respuesta =
                    await productoService.actualizar(
                        productoSeleccionado.id,
                        productoActualizado
                    );


                /*
                    El backend devuelve el producto
                    con el estado ya recalculado.
                */
                setProductos(
                    productosActuales =>
                        productosActuales.map(
                            producto =>
                                producto.id ===
                                respuesta.id
                                    ? respuesta
                                    : producto
                        )
                );


                setMensaje(
                    'Stock actualizado correctamente.'
                );

                setMensajeError(false);

                handleCerrarModal();


            } catch (error) {

                console.error(
                    'Error al actualizar stock:',
                    error
                );


                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {

                    setMensaje(
                        'No tienes autorización para actualizar el stock.'
                    );

                } else {

                    setMensaje(
                        'No fue posible actualizar el stock.'
                    );
                }

                setMensajeError(true);

            } finally {

                setGuardando(false);

            }
        };


    return (

        <div className="d-flex flex-column min-vh-100">

            <main className="flex-grow-1">

                <section className="container mt-5">

                    <h1
                        className="mb-1"
                        style={{
                            color: '#1E293B'
                        }}
                    >
                        Inventario
                    </h1>

                    <h3 className="fs-6 mb-4">
                        Gestión de stock de productos
                    </h3>


                    {mensaje !== '' && (

                        <div
                            className={
                                mensajeError
                                    ? 'alert alert-danger'
                                    : 'alert alert-success'
                            }
                        >
                            {mensaje}
                        </div>

                    )}


                    <div className="row justify-content-center g-4">


                        {/* SIN STOCK */}

                        <div className="col-md-6 col-lg-5">

                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                                <div
                                    className="card-header d-flex justify-content-between align-items-center py-3 border-bottom"
                                    style={{
                                        backgroundColor:
                                            '#fff1f2'
                                    }}
                                >

                                    <h3
                                        className="h6 m-0 fw-medium"
                                        style={{
                                            color:
                                                '#f43f5e'
                                        }}
                                    >
                                        Sin stock
                                    </h3>

                                </div>


                                <ul className="list-group list-group-flush">

                                    {productosSinStock.length === 0 ? (

                                        <li className="list-group-item text-muted py-3">

                                            No hay productos sin stock.

                                        </li>

                                    ) : (

                                        productosSinStock.map(
                                            producto => (

                                                <li
                                                    key={producto.id}
                                                    className="list-group-item d-flex justify-content-between align-items-center py-3"
                                                >

                                                    <div>

                                                        <span className="d-block text-dark fw-medium">

                                                            {producto.nombre}

                                                        </span>

                                                        <small className="text-secondary">

                                                            Stock: {producto.stockActual}
                                                            {' / '}
                                                            Mín: {producto.stockMinimo}

                                                        </small>

                                                    </div>


                                                    <button
                                                        className="btn btn-sm btn-outline-secondary rounded-3"
                                                        onClick={
                                                            () =>
                                                                handleAbrirModal(
                                                                    producto
                                                                )
                                                        }
                                                    >
                                                        Actualizar
                                                    </button>

                                                </li>

                                            )
                                        )

                                    )}

                                </ul>

                            </div>

                        </div>


                        {/* STOCK BAJO */}

                        <div className="col-md-6 col-lg-5">

                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                                <div
                                    className="card-header d-flex justify-content-between align-items-center py-3 border-bottom"
                                    style={{
                                        backgroundColor:
                                            '#fefce8'
                                    }}
                                >

                                    <h3
                                        className="h6 m-0 fw-medium"
                                        style={{
                                            color:
                                                '#d97706'
                                        }}
                                    >
                                        Stock Bajo
                                    </h3>

                                </div>


                                <ul className="list-group list-group-flush">

                                    {productosStockBajo.length === 0 ? (

                                        <li className="list-group-item text-muted py-3">

                                            No hay productos con stock bajo.

                                        </li>

                                    ) : (

                                        productosStockBajo.map(
                                            producto => (

                                                <li
                                                    key={producto.id}
                                                    className="list-group-item d-flex justify-content-between align-items-center py-3"
                                                >

                                                    <div>

                                                        <span className="d-block text-dark fw-medium">

                                                            {producto.nombre}

                                                        </span>

                                                        <small className="text-secondary">

                                                            Stock: {producto.stockActual}
                                                            {' / '}
                                                            Mín: {producto.stockMinimo}

                                                        </small>

                                                    </div>


                                                    <button
                                                        className="btn btn-sm btn-outline-secondary rounded-3"
                                                        onClick={
                                                            () =>
                                                                handleAbrirModal(
                                                                    producto
                                                                )
                                                        }
                                                    >
                                                        Actualizar
                                                    </button>

                                                </li>

                                            )
                                        )

                                    )}

                                </ul>

                            </div>

                        </div>

                    </div>

                </section>


                {/* FILTROS */}

                <section>

                    <div className="container my-5">

                        <div className="row g-3 mb-4">

                            <div className="col-md-12 col-lg-6">

                                <div className="input-group">

                                    <span className="input-group-text bg-white border-end-0">

                                        <i className="bi bi-search"></i>

                                    </span>

                                    <input
                                        type="text"
                                        className="form-control border-start-0 shadow-none"
                                        placeholder="Buscar..."
                                        value={busqueda}
                                        onChange={
                                            e =>
                                                setBusqueda(
                                                    e.target.value
                                                )
                                        }
                                    />

                                </div>

                            </div>


                            <div className="col-md-6 col-lg-3">

                                <select
                                    className="form-select rounded-3 shadow-none text-secondary"
                                    value={filtroEstado}
                                    onChange={
                                        e =>
                                            setFiltroEstado(
                                                e.target.value
                                            )
                                    }
                                >

                                    <option value="todos">
                                        Todos los estados
                                    </option>

                                    <option value="Disponible">
                                        Disponible
                                    </option>

                                    <option value="Stock bajo">
                                        Stock bajo
                                    </option>

                                    <option value="Sin stock">
                                        Sin stock
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </section>


                {/* TABLA */}

                <section>

                    <div className="container">

                        <div className="table-responsive bg-white rounded-3 shadow-sm border">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-light text-secondary">

                                    <tr>

                                        <th className="py-3 px-4">
                                            CÓDIGO
                                        </th>

                                        <th className="py-3">
                                            PRODUCTO
                                        </th>

                                        <th className="py-3 text-center">
                                            STOCK ACTUAL
                                        </th>

                                        <th className="py-3 text-center">
                                            STOCK MÍNIMO
                                        </th>

                                        <th className="py-3 text-center">
                                            ESTADO
                                        </th>

                                        <th className="py-3 text-center">
                                            ACCIÓN
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {cargando ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center py-4"
                                            >
                                                Cargando inventario...
                                            </td>

                                        </tr>

                                    ) : productosFiltrados.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center py-4 text-muted"
                                            >
                                                No se encontraron productos.
                                            </td>

                                        </tr>

                                    ) : (

                                        productosFiltrados.map(
                                            producto => (

                                                <tr key={producto.id}>

                                                    <td className="py-3 px-4 text-secondary font-monospace">

                                                        {producto.codigo}

                                                    </td>


                                                    <td className="py-3 text-dark">

                                                        {producto.nombre}

                                                    </td>


                                                    <td className="py-3 text-center">

                                                        {producto.stockActual}

                                                    </td>


                                                    <td className="py-3 text-center text-secondary">

                                                        {producto.stockMinimo}

                                                    </td>


                                                    <td className="py-3 text-center">

                                                        <span
                                                            className={
                                                                `badge rounded-pill ${
                                                                    producto.estado === 'Disponible'
                                                                        ? 'bg-success'
                                                                        : producto.estado === 'Stock bajo'
                                                                            ? 'bg-warning text-dark'
                                                                            : 'bg-danger'
                                                                }`
                                                            }
                                                        >

                                                            {producto.estado}

                                                        </span>

                                                    </td>


                                                    <td className="py-3 text-center">

                                                        <button
                                                            className="btn btn-sm btn-outline-secondary rounded-3"
                                                            onClick={
                                                                () =>
                                                                    handleAbrirModal(
                                                                        producto
                                                                    )
                                                            }
                                                        >
                                                            Actualizar stock
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </section>

            </main>


            {/* MODAL */}

            {showModal && productoSeleccionado && (

                <>

                    <div
                        className="modal-backdrop fade show"
                        style={{
                            zIndex: 1040
                        }}
                    />


                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        style={{
                            zIndex: 1050,
                            backgroundColor:
                                'rgba(0,0,0,0.5)'
                        }}
                    >

                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content border-0 shadow rounded-4">


                                <div className="modal-header border-bottom-0 pb-0">

                                    <h5 className="modal-title">

                                        Actualizar stock

                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={
                                            handleCerrarModal
                                        }
                                    />

                                </div>


                                <div className="modal-body">

                                    <div className="bg-light rounded-3 p-3 mb-4">

                                        <h4 className="h6">

                                            {
                                                productoSeleccionado.nombre
                                            }

                                        </h4>

                                        <p className="text-secondary small mb-1">

                                            {
                                                productoSeleccionado.codigo
                                            }

                                        </p>

                                        <p className="small mb-1">

                                            Stock actual:{' '}

                                            <strong>
                                                {
                                                    productoSeleccionado.stockActual
                                                }
                                            </strong>

                                        </p>

                                        <p className="small mb-0">

                                            Stock mínimo:{' '}

                                            <strong>
                                                {
                                                    productoSeleccionado.stockMinimo
                                                }
                                            </strong>

                                        </p>

                                    </div>


                                    <label
                                        htmlFor="nuevo-stock"
                                        className="form-label"
                                    >
                                        Nuevo stock
                                    </label>

                                    <input
                                        id="nuevo-stock"
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        value={nuevoStock}
                                        onChange={
                                            e =>
                                                setNuevoStock(
                                                    e.target.value
                                                )
                                        }
                                    />

                                </div>


                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={
                                            handleCerrarModal
                                        }
                                    >
                                        Cancelar
                                    </button>


                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        disabled={
                                            guardando
                                        }
                                        onClick={
                                            handleGuardarStock
                                        }
                                    >

                                        {
                                            guardando
                                                ? 'Guardando...'
                                                : 'Actualizar'
                                        }

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </>

            )}

        </div>
    );
};

export default Inventario;