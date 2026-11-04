import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import '../../components/styles.css'
import '../../components/tienda.css'


export const GestionPedidos = () => {
    // 1. Obtenemos los pedidos desde el contexto
    const { pedidos } = useContext(AppContext);

    // 2. Estados para los filtros
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('todos');

    // 3. Estados para el Modal de Detalle
    const [showModal, setShowModal] = useState(false);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    // --- DERIVACIÓN DE DATOS (Filtro en tiempo real) ---
    const pedidosFiltrados = pedidos.filter(pedido => {
        const coincideTxt = pedido.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
            pedido.cliente.toLowerCase().includes(busqueda.toLowerCase());
        const coincideEst = filtroEstado === 'todos' || pedido.estado === filtroEstado;
        return coincideTxt && coincideEst;
    });

    // --- FUNCIONES DEL MODAL ---
    const handleAbrirModal = (pedido) => {
        setPedidoSeleccionado(pedido);
        setShowModal(true);
    };

    const handleCerrarModal = () => {
        setShowModal(false);
        setPedidoSeleccionado(null);
    };

    // Helper para dar color a los estados de los pedidos
    const getColorEstado = (estado) => {
        switch (estado) {
            case 'Pendiente': return 'bg-warning text-dark';
            case 'Confirmado': return 'bg-primary text-white';
            case 'Preparando': return 'bg-info text-dark';
            case 'Listo para retiro': return 'bg-success text-white';
            case 'En despacho': return 'bg-info text-dark';
            case 'Entregado': return 'bg-secondary text-white';
            default: return 'bg-secondary text-white';
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            
            {/* --- CONTENIDO PRINCIPAL --- */}
            <main className="flex-grow-1">
                <section>
                    <h1 className="mx-2 my-2 fs-2 container mt-4">Gestión de pedidos</h1>

                    <div className="container my-5">
                        {/* Barra de Búsqueda y Filtros */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-12 col-lg-6">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0 rounded-start-3 text-secondary">
                                        <i className="bi bi-search"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0 rounded-end-3 shadow-none"
                                        placeholder="Buscar por número o cliente..."
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
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Confirmado">Confirmado</option>
                                    <option value="Preparando">Preparando</option>
                                    <option value="Listo para retiro">Listo para retiro</option>
                                    <option value="En despacho">En despacho</option>
                                    <option value="Entregado">Entregado</option>
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
                                        <th className="py-3 px-4 fw-medium border-bottom-0">N.°</th>
                                        <th className="py-3 fw-medium border-bottom-0">CLIENTE</th>
                                        <th className="py-3 fw-medium border-bottom-0">FECHA</th>
                                        <th className="py-3 fw-medium border-bottom-0">TOTAL</th>
                                        <th className="py-3 text-center fw-medium border-bottom-0">ENTREGA</th>
                                        <th className="py-3 text-center fw-medium border-bottom-0">ESTADO</th>
                                        <th className="py-3 text-center fw-medium border-bottom-0">ACCIÓN</th>
                                    </tr>
                                </thead>

                                <tbody className="border-top-0">
                                    {pedidosFiltrados.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4 text-muted">No se encontraron pedidos.</td>
                                        </tr>
                                    ) : (
                                        pedidosFiltrados.map((pedido) => (
                                            <tr key={pedido.id}>
                                                <td className="py-3 px-4 text-secondary font-monospace">{pedido.numero}</td>
                                                <td className="py-3 text-dark fw-medium">{pedido.cliente}</td>
                                                <td className="py-3 text-secondary">{pedido.fecha}</td>
                                                <td className="py-3" style={{ color: '#d97706', fontWeight: 500 }}>
                                                    ${pedido.total.toLocaleString('es-CL')}
                                                </td>
                                                <td className="py-3 text-center text-secondary">{pedido.entrega || '-'}</td>
                                                <td className="py-3 text-center">
                                                    <span className={`badge rounded-pill ${getColorEstado(pedido.estado)}`}>
                                                        {pedido.estado}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-center">
                                                    <button className="btn btn-sm btn-outline-primary rounded-3" onClick={() => handleAbrirModal(pedido)}>
                                                        Ver detalle
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

            {/* --- MODAL DETALLE DEL PEDIDO --- */}
            {showModal && pedidoSeleccionado && (
                <>
                    <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
                    <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow rounded-4">

                                <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
                                    <h5 className="modal-title text-dark fw-medium fs-5">
                                        Pedido <span className="text-secondary">{pedidoSeleccionado.numero}</span>
                                    </h5>
                                    <button type="button" className="btn-close shadow-none" onClick={handleCerrarModal}></button>
                                </div>

                                <div className="modal-body p-4">
                                    <div className="row mb-4">
                                        <div className="col-6">
                                            <small className="text-secondary fw-medium d-block mb-1">Cliente</small>
                                            <div className="text-dark">{pedidoSeleccionado.cliente}</div>
                                        </div>
                                        <div className="col-6">
                                            <small className="text-secondary fw-medium d-block mb-1">Estado</small>
                                            <span className={`badge rounded-pill px-3 py-2 fw-normal ${getColorEstado(pedidoSeleccionado.estado)}`}>
                                                {pedidoSeleccionado.estado}
                                            </span>
                                        </div>
                                    </div>

                                    <hr className="text-secondary opacity-25" />

                                    <small className="text-secondary fw-medium d-block mb-3">Productos</small>

                                    <ul className="list-unstyled mb-0 text-dark">
                                        {pedidoSeleccionado.productos && pedidoSeleccionado.productos.length > 0 ? (
                                            pedidoSeleccionado.productos.map((prod, index) => (
                                                <li key={index} className="d-flex justify-content-between mb-2 pb-2 border-bottom text-dark">
                                                    {/* Mostramos el nombre del producto */}
                                                    <span>{prod.nombre || prod}</span>

                                                    {/* Intentamos leer la cantidad con distintos nombres comunes, o mostramos 1 por defecto */}
                                                    <span className="text-secondary">
                                                        Cant: {prod.cantidad || prod.cant || prod.qty || 1}
                                                    </span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-muted fst-italic">Detalle de productos no disponible.</li>
                                        )}

                                        {/* Restauramos el Total en la parte inferior */}
                                        <li className="d-flex justify-content-between mt-3 pt-2">
                                            <strong className="text-dark">Total:</strong>
                                            <strong style={{ color: '#d97706' }}>
                                                ${pedidoSeleccionado.total ? pedidoSeleccionado.total.toLocaleString('es-CL') : '0'}
                                            </strong>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default GestionPedidos;