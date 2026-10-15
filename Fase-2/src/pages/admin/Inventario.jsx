import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import '../../components/styles.css'
import '../../components/tienda.css'

export const Inventario = () => {
    // 1. Obtenemos los productos y la función para editar desde el contexto
    const { productos, editarProducto } = useContext(AppContext);

    // 2. Estados para los filtros
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('todos');

    // 3. Estados para controlar el Modal nativo de React
    const [showModal, setShowModal] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [nuevoStock, setNuevoStock] = useState(0);

    // --- DERIVACIÓN DE DATOS (Filtros en tiempo real) ---

    // Alertas superiores
    const productosSinStock = productos.filter(p => p.estado === 'Sin stock');
    const productosStockBajo = productos.filter(p => p.estado === 'Stock bajo');

    // Tabla principal
    const productosFiltrados = productos.filter(p => {
        const coincideTxt = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.codigo.toLowerCase().includes(busqueda.toLowerCase());
        const coincideEst = filtroEstado === 'todos' || p.estado === filtroEstado;
        return coincideTxt && coincideEst;
    });

    // --- FUNCIONES DEL MODAL ---

    const handleAbrirModal = (prod) => {
        setProductoSeleccionado(prod);
        setNuevoStock(prod.stockActual);
        setShowModal(true); // Muestra el modal
    };

    const handleCerrarModal = () => {
        setShowModal(false); // Oculta el modal
        setProductoSeleccionado(null);
    };

    const handleGuardarStock = () => {
        if (productoSeleccionado) {
            const stockVal = Number(nuevoStock);

            // Recalculamos el estado automáticamente
            let nuevoEstado = 'Disponible';
            if (stockVal <= 0) {
                nuevoEstado = 'Sin stock';
            } else if (stockVal <= Number(productoSeleccionado.stockMinimo)) {
                nuevoEstado = 'Stock bajo';
            }

            // Actualizamos en la base de datos global
            editarProducto(productoSeleccionado.id, {
                stockActual: stockVal,
                estado: nuevoEstado
            });

            handleCerrarModal(); // Cerramos el modal tras guardar
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">
                <section className="container mt-5">
                    <h1 className="mb-1" style={{ color: '#1E293B' }}>Inventario</h1>
                    <h3 className="fs-6 mb-4">Gestión de stock de productos</h3>

                    <div className="row justify-content-center g-4">
                        {/* Tarjeta 1: Sin Stock */}
                        <div className="col-md-6 col-lg-5">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ border: '1px solid #fecdd3' }}>
                                <div className="card-header d-flex justify-content-between align-items-center py-3 border-bottom" style={{ backgroundColor: '#fff1f2' }}>
                                    <h3 className="h6 m-0 fw-medium" style={{ color: '#f43f5e' }}>Sin stock</h3>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {productosSinStock.length === 0 ? (
                                        <li className="list-group-item text-muted py-3">No hay productos sin stock.</li>
                                    ) : (
                                        productosSinStock.map(p => (
                                            <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                                <div>
                                                    <span className="d-block text-dark fw-medium">{p.nombre}</span>
                                                    <small className="text-secondary">Stock: {p.stockActual} / Mín: {p.stockMinimo}</small>
                                                </div>
                                                <button className="btn btn-sm btn-outline-secondary rounded-3" onClick={() => handleAbrirModal(p)}>Actualizar</button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Tarjeta 2: Stock Bajo */}
                        <div className="col-md-6 col-lg-5">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ border: '1px solid #fef08a' }}>
                                <div className="card-header d-flex justify-content-between align-items-center py-3 border-bottom" style={{ backgroundColor: '#fefce8' }}>
                                    <h3 className="h6 m-0 fw-medium" style={{ color: '#d97706' }}>Stock Bajo</h3>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {productosStockBajo.length === 0 ? (
                                        <li className="list-group-item text-muted py-3">No hay productos con stock bajo.</li>
                                    ) : (
                                        productosStockBajo.map(p => (
                                            <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                                <div>
                                                    <span className="d-block text-dark fw-medium">{p.nombre}</span>
                                                    <small className="text-secondary">Stock: {p.stockActual} / Mín: {p.stockMinimo}</small>
                                                </div>
                                                <button className="btn btn-sm btn-outline-secondary rounded-3" onClick={() => handleAbrirModal(p)}>Actualizar</button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

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
                                        onChange={(e) => setBusqueda(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <select
                                    className="form-select rounded-3 shadow-none text-secondary"
                                    value={filtroEstado}
                                    onChange={(e) => setFiltroEstado(e.target.value)}
                                >
                                    <option value="todos">Todos los estados</option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="Stock bajo">Stock bajo</option>
                                    <option value="Sin stock">Sin stock</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <div className="table-responsive bg-white rounded-3 shadow-sm border" style={{ borderColor: 'var(--color-header)' }}>
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light text-secondary" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                                    <tr>
                                        <th className="py-3 px-4 fw-medium border-bottom-0">CÓDIGO</th>
                                        <th className="py-3 fw-medium border-bottom-0">PRODUCTO</th>
                                        <th className="py-3 text-center fw-medium border-bottom-0">STOCK ACTUAL</th>
                                        <th className="py-3 text-center fw-medium border-bottom-0">STOCK MÍNIMO</th>
                                        <th className="py-3 text-center fw-medium border-bottom-0">ESTADO</th>
                                        <th className="py-3 text-center fw-medium border-bottom-0">ACCIÓN</th>
                                    </tr>
                                </thead>

                                <tbody className="border-top-0">
                                    {productosFiltrados.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4 text-muted">No se encontraron productos en el inventario.</td>
                                        </tr>
                                    ) : (
                                        productosFiltrados.map((prod) => (
                                            <tr key={prod.id}>
                                                <td className="py-3 px-4 text-secondary font-monospace">{prod.codigo}</td>
                                                <td className="py-3 text-dark">{prod.nombre}</td>
                                                <td className="py-3 text-center">{prod.stockActual}</td>
                                                <td className="py-3 text-center text-secondary">{prod.stockMinimo}</td>
                                                <td className="py-3 text-center">
                                                    <span className={`badge rounded-pill ${prod.estado === 'Disponible' ? 'bg-success' : prod.estado === 'Stock bajo' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                                                        {prod.estado}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-center">
                                                    <button className="btn btn-sm btn-outline-secondary rounded-3" onClick={() => handleAbrirModal(prod)}>
                                                        Actualizar stock
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- MODAL REACTIVO --- */}
            {showModal && productoSeleccionado && (
                <>
                    {/* Fondo oscuro transparente */}
                    <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>

                    {/* Ventana del modal */}
                    <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow rounded-4">

                                <div className="modal-header border-bottom-0 pb-0">
                                    <h5 className="modal-title text-dark fw-medium">Actualizar stock</h5>
                                    <button type="button" className="btn-close shadow-none" onClick={handleCerrarModal}></button>
                                </div>

                                <div className="modal-body pt-3">
                                    <div className="bg-light rounded-3 p-3 mb-4" style={{ border: '1px solid #f8fafc' }}>
                                        <h4 className="h6 text-dark mb-0 fw-normal">{productoSeleccionado.nombre}</h4>
                                        <p className="text-secondary font-monospace small mb-2">{productoSeleccionado.codigo}</p>
                                        <p className="text-secondary small mb-0">Stock actual: <span className="text-dark fw-medium">{productoSeleccionado.stockActual}</span></p>
                                        <p className="text-secondary small mb-0">Stock mínimo: <span className="text-dark fw-medium">{productoSeleccionado.stockMinimo}</span></p>
                                    </div>

                                    <label htmlFor="modal-input-stock" className="form-label fw-medium text-dark">Nuevo stock</label>
                                    <input
                                        type="number"
                                        className="form-control shadow-none rounded-3"
                                        id="modal-input-stock"
                                        min="0"
                                        value={nuevoStock}
                                        onChange={(e) => setNuevoStock(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleGuardarStock()} // Guarda al presionar Enter
                                    />
                                </div>

                                <div className="modal-footer border-top-0 pt-0">
                                    <div className="row w-100 g-2 m-0">
                                        <div className="col-6 p-0 pe-1">
                                            <button type="button" className="btn btn-outline-secondary w-100 rounded-3 fw-medium" onClick={handleCerrarModal}>Cancelar</button>
                                        </div>
                                        <div className="col-6 p-0 ps-1">
                                            <button type="button" className="btn w-100 rounded-3 fw-medium text-white shadow-sm" style={{ backgroundColor: '#d97706' }} onClick={handleGuardarStock}>Actualizar</button>
                                        </div>
                                    </div>
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