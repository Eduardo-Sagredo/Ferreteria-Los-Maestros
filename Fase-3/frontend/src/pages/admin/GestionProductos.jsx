import {
    useEffect,
    useLayoutEffect,
    useState
} from 'react';

import {
    Link,
    useNavigate
} from 'react-router-dom';

import productoService from '../../api/productoService.js';

import '../../components/styles.css';
import '../../components/tienda.css';

export const GestionProductos = () => {

    const navigate = useNavigate();

    const [productos, setProductos] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);

    const [mensaje, setMensaje] =
        useState('');

    const [mensajeError, setMensajeError] =
        useState(false);

    const [busqueda, setBusqueda] =
        useState('');

    const [filtroCategoria, setFiltroCategoria] =
        useState('todas');

    const [filtroEstado, setFiltroEstado] =
        useState('todos');


    useLayoutEffect(() => {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });

    }, []);


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
                'Error al obtener productos:',
                error
            );

            setMensaje(
                'No fue posible cargar los productos.'
            );

            setMensajeError(true);

        } finally {

            setCargando(false);

        }
    }


    async function handleEliminar(id) {

        const confirmar =
            window.confirm(
                '¿Seguro que deseas eliminar este producto?'
            );

        if (!confirmar) {
            return;
        }

        try {

            await productoService.eliminar(id);

            setProductos(
                productosActuales =>
                    productosActuales.filter(
                        producto =>
                            producto.id !== id
                    )
            );

            setMensaje(
                'Producto eliminado correctamente.'
            );

            setMensajeError(false);

        } catch (error) {

            console.error(
                'Error al eliminar producto:',
                error
            );

            setMensaje(
                'No fue posible eliminar el producto.'
            );

            setMensajeError(true);
        }
    }


    function handleEditar(id) {

        navigate(
            `/admin/agregarProducto?edit=${id}`
        );
    }


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

            const coincideCategoria =
                filtroCategoria === 'todas' ||
                producto.categoria ===
                    filtroCategoria;

            const coincideEstado =
                filtroEstado === 'todos' ||
                producto.estado ===
                    filtroEstado;

            return (
                coincideTexto &&
                coincideCategoria &&
                coincideEstado
            );
        });


    return (
        <>

            <main className="flex-grow-1">

                <section>

                    <div className="d-flex justify-content-between mx-2 my-2">

                        <h1 className="fs-2">
                            Gestión de productos
                        </h1>

                        <Link
                            to="/admin/agregarProducto"
                            className="btn d-inline-flex align-items-center"
                            style={{
                                backgroundColor:
                                    'var(--color-accent)',
                                color:
                                    'var(--color-header)'
                            }}
                        >
                            + Agregar Producto
                        </Link>

                    </div>

                </section>


                {mensaje !== '' && (

                    <div className="container mt-3">

                        <div
                            className={
                                mensajeError
                                    ? 'alert alert-danger'
                                    : 'alert alert-success'
                            }
                        >
                            {mensaje}
                        </div>

                    </div>

                )}


                <section>

                    <div className="container my-5">

                        <div className="row g-3 mb-4">

                            <div className="col-md-12 col-lg-6">

                                <div className="input-group">

                                    <span className="input-group-text bg-white border-end-0 rounded-start-3 text-secondary">

                                        <i className="bi bi-search"></i>

                                    </span>

                                    <input
                                        type="text"
                                        className="form-control border-start-0 rounded-end-3 shadow-none"
                                        placeholder="Buscar..."
                                        value={busqueda}
                                        onChange={
                                            (e) =>
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
                                    value={filtroCategoria}
                                    onChange={
                                        (e) =>
                                            setFiltroCategoria(
                                                e.target.value
                                            )
                                    }
                                >

                                    <option value="todas">
                                        Todas las categorías
                                    </option>

                                    <option value="herramientas">
                                        Herramientas
                                    </option>

                                    <option value="electricidad">
                                        Electricidad
                                    </option>

                                    <option value="construccion">
                                        Construcción
                                    </option>

                                    <option value="pinturas">
                                        Pinturas
                                    </option>

                                    <option value="gasfiteria">
                                        Gásfitería
                                    </option>

                                </select>

                            </div>


                            <div className="col-md-6 col-lg-3">

                                <select
                                    className="form-select rounded-3 shadow-none text-secondary"
                                    value={filtroEstado}
                                    onChange={
                                        (e) =>
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

                                        <th className="py-3">
                                            CATEGORÍA
                                        </th>

                                        <th className="py-3">
                                            PRECIO
                                        </th>

                                        <th className="py-3 text-center">
                                            STOCK
                                        </th>

                                        <th className="py-3 text-center">
                                            MÍN.
                                        </th>

                                        <th className="py-3 text-center">
                                            ESTADO
                                        </th>

                                        <th className="py-3 text-center">
                                            ACCIONES
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {cargando ? (

                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="text-center py-4"
                                            >
                                                Cargando productos...
                                            </td>

                                        </tr>

                                    ) : productosFiltrados.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="text-center py-4 text-muted"
                                            >
                                                No se encontraron productos.
                                            </td>

                                        </tr>

                                    ) : (

                                        productosFiltrados.map(
                                            (producto) => (

                                                <tr key={producto.id}>

                                                    <td className="py-3 px-4 text-secondary font-monospace">

                                                        {producto.codigo}

                                                    </td>


                                                    <td className="py-3 text-dark">

                                                        {producto.nombre}

                                                    </td>


                                                    <td className="py-3 text-secondary">

                                                        {producto.categoria
                                                            ? producto.categoria
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                              producto.categoria
                                                                .slice(1)
                                                            : '-'}

                                                    </td>


                                                    <td
                                                        className="py-3"
                                                        style={{
                                                            color: '#d97706',
                                                            fontWeight: 500
                                                        }}
                                                    >

                                                        $
                                                        {producto.precio
                                                            .toLocaleString(
                                                                'es-CL'
                                                            )}

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
                                                                    producto.estado ===
                                                                    'Disponible'
                                                                        ? 'bg-success'
                                                                        : producto.estado ===
                                                                          'Stock bajo'
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
                                                            className="btn btn-sm btn-outline-primary me-2"
                                                            onClick={
                                                                () =>
                                                                    handleEditar(
                                                                        producto.id
                                                                    )
                                                            }
                                                        >

                                                            <i className="bi bi-pencil"></i>

                                                        </button>


                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={
                                                                () =>
                                                                    handleEliminar(
                                                                        producto.id
                                                                    )
                                                            }
                                                        >

                                                            <i className="bi bi-trash"></i>

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

        </>
    );
};

export default GestionProductos;