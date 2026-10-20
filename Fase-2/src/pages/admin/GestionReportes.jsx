import { useMemo } from 'react';
import MockDB from '../../services/MockDB.js';
import '../../components/styles.css'
import '../../components/tienda.css'


export const GestionReportes = () => {
    const pedidos = MockDB.getTabla('pedidos');
    const usuarios = MockDB.getTabla('usuarios');

    // --- CÁLCULOS DINÁMICOS ---
    const estadisticas = useMemo(() => {
        const listaPedidos = pedidos || [];
        const listaUsuarios = usuarios || [];

        const totalVentas = listaPedidos.reduce((acc, pedido) => acc + (pedido.total || 0), 0);

        const pedidosCompletados = listaPedidos.filter(p =>
            p.estado === 'Entregado' || p.estado === 'Listo para retiro'
        ).length;

        const ticketPromedio = listaPedidos.length > 0 ? totalVentas / listaPedidos.length : 0;

        const clientesActivos = listaUsuarios.filter(u =>
            u.rol === 'Cliente' && u.estado === 'Activo'
        ).length;

        const conteoClientes = {};
        listaPedidos.forEach(p => {
            if (p.cliente) {
                conteoClientes[p.cliente] = (conteoClientes[p.cliente] || 0) + 1;
            }
        });

        const topClientes = Object.entries(conteoClientes)
            .map(([nombre, compras]) => ({ nombre, compras }))
            .sort((a, b) => b.compras - a.compras)
            .slice(0, 5);

        const conteoProductos = {};
        listaPedidos.forEach(pedido => {
            if (pedido.productos && Array.isArray(pedido.productos)) {
                pedido.productos.forEach(prod => {
                    const nombre = prod.nombre || prod;
                    const cantidad = Number(prod.cantidad || prod.cant || prod.qty || 1);
                    conteoProductos[nombre] = (conteoProductos[nombre] || 0) + cantidad;
                });
            }
        });

        const topProductos = Object.entries(conteoProductos)
            .map(([nombre, unidades]) => ({ nombre, unidades }))
            .sort((a, b) => b.unidades - a.unidades)
            .slice(0, 5);

        return {
            totalVentas,
            pedidosCompletados,
            ticketPromedio,
            clientesActivos,
            topClientes,
            topProductos
        };
    }, [pedidos, usuarios]);

    // Función para formatear dinero
    const formatearDinero = (monto) => {
        return Math.round(monto).toLocaleString('es-CL');
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="container my-5 flex-grow-1">
                <div className="mt-2 mx-2">
                    <h1>Reportes</h1>
                    <h3 className="fs-6 text-secondary">Datos estadísticos</h3>
                </div>

                <section className="container mt-5">
                    <div className="row justify-content-center g-4">

                        {/* Tarjeta 1: Clientes más frecuentes */}
                        <div className="col-md-6 col-lg-5">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ border: '1px solid #e2e8f0 !important' }}>
                                <div className="card-header d-flex justify-content-between align-items-center py-3 border-bottom" style={{ backgroundColor: '#fefce8' }}>
                                    <div>
                                        <h3 className="fs-6 m-0 fw-bold" style={{ color: '#d97706' }}>
                                            Clientes más frecuentes
                                        </h3>
                                        <small className="text-secondary" style={{ fontFamily: 'var(--fuente-para-textos-pequenos)' }}>
                                            Ranking por cantidad de compras
                                        </small>
                                    </div>
                                    <i className="bi bi-people fs-4" style={{ color: '#d97706', opacity: 0.8 }}></i>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {estadisticas.topClientes.length === 0 ? (
                                        <li className="list-group-item py-4 text-center text-muted">No hay datos suficientes.</li>
                                    ) : (
                                        estadisticas.topClientes.map((cliente, idx) => (
                                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                                <span className="fw-medium text-dark">{cliente.nombre}</span>
                                                <span className="badge rounded-pill bg-light text-dark border">
                                                    {cliente.compras} {cliente.compras === 1 ? 'compra' : 'compras'}
                                                </span>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Tarjeta 2: Productos más vendidos */}
                        <div className="col-md-6 col-lg-5">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ border: '1px solid #e2e8f0 !important' }}>
                                <div className="card-header d-flex justify-content-between align-items-center py-3 border-bottom" style={{ backgroundColor: '#f8fafc' }}>
                                    <div>
                                        <h3 className="fs-6 m-0 fw-bold text-dark">
                                            Productos más vendidos
                                        </h3>
                                        <small className="text-secondary" style={{ fontFamily: 'var(--fuente-para-textos-pequenos)' }}>
                                            Ranking por unidades vendidas
                                        </small>
                                    </div>
                                    <i className="bi bi-box-seam fs-4 text-secondary" style={{ opacity: 0.8 }}></i>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {estadisticas.topProductos.length === 0 ? (
                                        <li className="list-group-item py-4 text-center text-muted">No hay datos suficientes.</li>
                                    ) : (
                                        estadisticas.topProductos.map((producto, idx) => (
                                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                                <span className="fw-medium text-dark">{producto.nombre}</span>
                                                <span className="badge rounded-pill bg-light text-dark border">
                                                    {producto.unidades} unid.
                                                </span>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>

                <section className="mt-5">
                    {/* Tarjeta de Resumen de Rendimiento */}
                    <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ border: '1px solid #e2e8f0 !important' }}>
                        <div className="card-header bg-white py-3 border-bottom-0 rounded-top-4">
                            <h2 className="h6 m-0 fw-normal text-dark" style={{ fontSize: '1.1rem' }}>Resumen de rendimiento</h2>
                        </div>

                        <div className="card-body p-0">
                            <div className="row g-0 border-top text-center" style={{ borderColor: '#e2e8f0 !important' }}>

                                <div className="col-6 col-md-3 py-4 border-end" style={{ borderColor: '#e2e8f0 !important' }}>
                                    <div className="fs-2 mb-1" style={{ color: '#d97706', fontWeight: 400 }}>
                                        ${formatearDinero(estadisticas.totalVentas)}
                                    </div>
                                    <div className="text-secondary small">Total ventas (mes)</div>
                                </div>

                                <div className="col-6 col-md-3 py-4 border-end" style={{ borderColor: '#e2e8f0 !important' }}>
                                    <div className="fs-2 mb-1" style={{ color: '#d97706', fontWeight: 400 }}>
                                        {estadisticas.pedidosCompletados}
                                    </div>
                                    <div className="text-secondary small">Pedidos completados</div>
                                </div>

                                <div className="col-6 col-md-3 py-4 border-end" style={{ borderColor: '#e2e8f0 !important' }}>
                                    <div className="fs-2 mb-1" style={{ color: '#d97706', fontWeight: 400 }}>
                                        ${formatearDinero(estadisticas.ticketPromedio)}
                                    </div>
                                    <div className="text-secondary small">Ticket promedio</div>
                                </div>

                                <div className="col-6 col-md-3 py-4">
                                    <div className="fs-2 mb-1" style={{ color: '#d97706', fontWeight: 400 }}>
                                        {estadisticas.clientesActivos}
                                    </div>
                                    <div className="text-secondary small">Clientes activos</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default GestionReportes;