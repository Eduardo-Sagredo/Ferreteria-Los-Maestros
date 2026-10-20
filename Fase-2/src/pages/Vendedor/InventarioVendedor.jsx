import { useState, useMemo } from 'react';
import MockDB from '../../services/MockDB.js';
import '../../components/styles.css'
import '../../components/tienda.css'

export const InventarioVendedor = () => {
    const [productos, setProductos] = useState(() => MockDB.getTabla('productos'));

    // --- ESTADOS ---
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('todos');

    const [productoModal, setProductoModal] = useState(null);
    const [nuevoStockInput, setNuevoStockInput] = useState('');

    // --- LÓGICA DE FILTRADO Y ALERTAS ---
    const { sinStock, stockBajo } = useMemo(() => {
        const sin = [];
        const bajo = [];
        productos.forEach(p => {
            if (p.stockActual === 0) {
                sin.push(p);
            } else if (p.stockActual <= p.stockMinimo) {
                bajo.push(p);
            }
        });
        return { sinStock: sin, stockBajo: bajo };
    }, [productos]);

    const productosFiltrados = productos.filter(prod => {
        const coincideTxt = prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            prod.codigo.toLowerCase().includes(busqueda.toLowerCase());

        let coincideEst = true;
        if (filtroEstado === 'Disponible') coincideEst = prod.stockActual > prod.stockMinimo;
        else if (filtroEstado === 'Stock bajo') coincideEst = prod.stockActual > 0 && prod.stockActual <= prod.stockMinimo;
        else if (filtroEstado === 'Sin stock') coincideEst = prod.stockActual === 0;

        return coincideTxt && coincideEst;
    });

    // --- ACCIONES DEL MODAL ---
    const abrirModal = (producto) => {
        setProductoModal(producto);
        setNuevoStockInput(producto.stockActual);
    };

    const cerrarModal = () => {
        setProductoModal(null);
        setNuevoStockInput('');
    };

    const handleActualizarStock = () => {
        const nuevoValor = parseInt(nuevoStockInput);
        if (isNaN(nuevoValor) || nuevoValor < 0) {
            alert('Por favor, ingresa un número válido mayor o igual a 0.');
            return;
        }
        const resultado = MockDB.actualizarStockProducto(productoModal.id, nuevoValor);
        if (!resultado.exito) {
            alert(resultado.mensaje);
            return;
        }
        setProductos(MockDB.getTabla('productos'));
        cerrarModal();
        alert('Stock actualizado correctamente.');
    };

    // --- HELPERS VISUALES ESTILO ORIGINAL ---
    const getBadgeEstado = (actual, minimo) => {
        if (actual === 0) {
            return (
                <span className="badge rounded-pill" style={{ backgroundColor: '#fca5a5', color: '#7f1d1d', fontWeight: '500', padding: '0.4rem 0.8rem' }}>
                    Sin stock
                </span>
            );
        }
        if (actual <= minimo) {
            return (
                <span className="badge rounded-pill" style={{ backgroundColor: '#fde047', color: '#713f12', fontWeight: '500', padding: '0.4rem 0.8rem' }}>
                    Stock bajo
                </span>
            );
        }
        return (
            <span className="badge rounded-pill" style={{ backgroundColor: '#86efac', color: '#14532d', fontWeight: '500', padding: '0.4rem 0.8rem' }}>
                Disponible
            </span>
        );
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">
                <section className="container mt-5">
                    <h1 className="mb-1" style={{ color: '#1E293B' }}>Modulo de vendedor</h1>
                    <h3 className="fs-6 mb-4">Inventario</h3>

                    <div className="row justify-content-center g-4">
                        {/* Tarjeta 1: Sin Stock */}
                        <div className="col-md-6 col-lg-5">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ border: '1px solid #fecdd3 !important' }}>
                                <div className="card-header py-3 border-bottom" style={{ backgroundColor: '#fff1f2' }}>
                                    <h3 className="h6 m-0 fw-normal" style={{ color: '#e11d48' }}>Sin stock</h3>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {sinStock.length === 0 ? (
                                        <li className="list-group-item text-muted text-center py-4">No hay productos sin stock.</li>
                                    ) : (
                                        sinStock.map(p => (
                                            <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                                <div>
                                                    <div className="fw-medium text-dark">{p.nombre}</div>
                                                    <div className="text-secondary small mt-1">Stock: {p.stockActual} / Mín: {p.stockMinimo}</div>
                                                </div>
                                                <button className="btn btn-sm text-secondary px-3" style={{ border: '1px solid #cbd5e1', borderRadius: '6px' }} onClick={() => abrirModal(p)}>
                                                    Actualizar
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Tarjeta 2: Stock Bajo */}
                        <div className="col-md-6 col-lg-5">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ border: '1px solid #fef08a !important' }}>
                                <div className="card-header py-3 border-bottom" style={{ backgroundColor: '#fefce8' }}>
                                    <h3 className="h6 m-0 fw-normal" style={{ color: '#d97706' }}>Stock Bajo</h3>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {stockBajo.length === 0 ? (
                                        <li className="list-group-item text-muted text-center py-4">No hay productos con stock bajo.</li>
                                    ) : (
                                        stockBajo.map(p => (
                                            <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                                <div>
                                                    <div className="fw-medium text-dark">{p.nombre}</div>
                                                    <div className="text-secondary small mt-1">Stock: {p.stockActual} / Mín: {p.stockMinimo}</div>
                                                </div>
                                                <button className="btn btn-sm text-secondary px-3" style={{ border: '1px solid #cbd5e1', borderRadius: '6px' }} onClick={() => abrirModal(p)}>
                                                    Actualizar
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container my-5">
                    {/* Buscador y Filtros */}
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

                    {/* Tabla de Inventario */}
                    <div className="table-responsive bg-white rounded-3 shadow-sm border" style={{ borderColor: 'var(--color-header) !important' }}>
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light text-dark" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                                <tr>
                                    <th className="py-3 px-4 fw-medium border-bottom-0">CÓDIGO</th>
                                    <th className="py-3 fw-medium border-bottom-0">PRODUCTO</th>
                                    <th className="py-3 fw-medium text-center border-bottom-0">STOCK ACTUAL</th>
                                    <th className="py-3 fw-medium text-center border-bottom-0">STOCK MÍNIMO</th>
                                    <th className="py-3 fw-medium text-center border-bottom-0">ESTADO</th>
                                    <th className="py-3 fw-medium text-center border-bottom-0">ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody className="border-top-0">
                                {productosFiltrados.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">No se encontraron productos.</td>
                                    </tr>
                                ) : (
                                    productosFiltrados.map((prod) => (
                                        <tr key={prod.id}>
                                            <td className="py-3 px-4 text-secondary">{prod.codigo}</td>
                                            <td className="py-3 text-dark">{prod.nombre}</td>
                                            <td className="py-3 text-dark text-center">{prod.stockActual}</td>
                                            <td className="py-3 text-secondary text-center">{prod.stockMinimo}</td>
                                            <td className="py-3 text-center">
                                                {getBadgeEstado(prod.stockActual, prod.stockMinimo)}
                                            </td>
                                            <td className="py-3 text-center">
                                                <button className="btn btn-sm text-secondary px-3" style={{ border: '1px solid #cbd5e1', borderRadius: '6px' }} onClick={() => abrirModal(prod)}>
                                                    Actualizar stock
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            {/* MODAL ACTUALIZAR STOCK */}
            {productoModal && (
                <>
                    <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
                    <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow rounded-4">

                                <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
                                    <h5 className="modal-title text-dark fw-medium fs-5">Actualizar stock</h5>
                                    <button type="button" className="btn-close shadow-none" onClick={cerrarModal}></button>
                                </div>

                                <div className="modal-body p-4 pt-3">
                                    <div className="bg-light rounded-3 p-3 mb-4" style={{ border: '1px solid #f8fafc' }}>
                                        <h4 className="h6 text-dark mb-0 fw-normal">{productoModal.nombre}</h4>
                                        <p className="text-secondary font-monospace small mb-2">{productoModal.codigo}</p>
                                        <p className="text-secondary small mb-0">Stock actual: <span className="text-dark fw-medium">{productoModal.stockActual}</span></p>
                                        <p className="text-secondary small mb-0">Stock mínimo: <span className="text-dark fw-medium">{productoModal.stockMinimo}</span></p>
                                    </div>

                                    <label className="form-label fw-medium text-dark">Nuevo stock</label>
                                    <input
                                        type="number"
                                        className="form-control shadow-none rounded-3"
                                        min="0"
                                        value={nuevoStockInput}
                                        onChange={(e) => setNuevoStockInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleActualizarStock()}
                                    />
                                </div>

                                <div className="modal-footer border-top-0 pt-0 px-4 pb-4">
                                    <div className="row w-100 g-2 m-0">
                                        <div className="col-6 p-0 pe-1">
                                            <button type="button" className="btn btn-outline-secondary w-100 rounded-3 fw-medium" onClick={cerrarModal}>Cancelar</button>
                                        </div>
                                        <div className="col-6 p-0 ps-1">
                                            <button type="button" className="btn w-100 rounded-3 fw-medium text-white shadow-sm" style={{ backgroundColor: '#d97706' }} onClick={handleActualizarStock}>
                                                Actualizar
                                            </button>
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

export default InventarioVendedor;