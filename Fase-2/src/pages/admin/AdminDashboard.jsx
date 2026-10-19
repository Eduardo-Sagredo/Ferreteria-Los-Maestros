import { Link } from 'react-router-dom';
import MockDB from '../../services/MockDB.js';
import '../../components/styles.css'
import '../../components/tienda.css'


export const AdminDashboard = () => {
    const productos = MockDB.getTabla('productos');
    const pedidos = MockDB.getTabla('pedidos');
    const alertasInventario = productos.filter(p => p.stockActual <= p.stockMinimo);
    const pedidosRecientes = pedidos.slice(0, 4);



    return (
        <>
            <div className="d-flex flex-column min-vh-100">

                <main className='flex-grow-1'>
                    <section className="container mt-4">
                        <div className="d-flex justify-content-between align-items-center my-4">
                            <h1>
                                Panel de administrador
                            </h1>
                            <Link to="/" className="btn btn-outline-secondary rounded-3">
                                <i className="bi bi-arrow-left"></i> Volver a la tienda
                            </Link>
                        </div>

                        <div className="row g-4 justify-content-center">

                            <div className="col-12 col-sm-6 col-md-3">
                                <Link to="/admin/gestionProductos" className="text-decoration-none">
                                    <div className="card h-100 text-center border-0 shadow-sm rounded-4 py-4" style={{ border: '1px solid var(--color-border)' }}>
                                        <div className="card-body">
                                            <i className="bi bi-box-seam fs-1 mb-3 d-block" style={{ color: 'var(--color-primary)' }}></i>
                                            <h3 className="h6 text-dark m-0 fw-normal">Gestionar productos</h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-md-3">
                                <Link to="/admin/gestionUsuarios" className="text-decoration-none">
                                    <div className="card h-100 text-center border-0 shadow-sm rounded-4 py-4" style={{ border: '1px solid var(--color-border)' }}>
                                        <div className="card-body">
                                            <i className="bi bi-people-fill fs-1 mb-3 d-block" style={{ color: '#4f46e5' }}></i>
                                            <h3 className="h6 text-dark m-0 fw-normal">Gestionar usuarios</h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-md-3">
                                <Link to="/admin/gestionPedidos" className="text-decoration-none">
                                    <div className="card h-100 text-center border-0 shadow-sm rounded-4 py-4" style={{ border: '1px solid var(--color-border)' }}>
                                        <div className="card-body">
                                            <i className="bi bi-bag-check-fill fs-1 mb-3 d-block" style={{ color: '#0ea5e9' }}></i>
                                            <h3 className="h6 text-dark m-0 fw-normal">Ver pedidos</h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-12 col-sm-6 col-md-3">
                                <Link to="/admin/gestionReportes" className="text-decoration-none">
                                    <div className="card h-100 text-center border-0 shadow-sm rounded-4 py-4" style={{ border: '1px solid var(--color-border)' }}>
                                        <div className="card-body">
                                            <i className="bi bi-bar-chart-fill fs-1 mb-3 d-block" style={{ color: '#10b981' }}></i>
                                            <h3 className="h6 text-dark m-0 fw-normal">Ver reportes</h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </section>

                    <section className="container mt-5">

                        <div className="row justify-content-center g-4">

                            <div className="col-md-6 col-lg-5">
                                <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>

                                    <div className="card-header d-flex justify-content-between align-items-center py-3 border-bottom" style={{ backgroundColor: '#fefce8' }}>
                                        <h3 className="h6 m-0 fw-medium" style={{ color: '#b45309' }}>
                                            Alertas recientes de inventario
                                        </h3>
                                        <Link to="/admin/inventario" className="text-decoration-none" style={{ color: '#475569', fontSize: '0.9rem' }}>
                                            Ver todo →
                                        </Link>
                                    </div>

                                    <ul className="list-group list-group-flush">
                                        {alertasInventario.length === 0 ? (
                                            <li className="list-group-item text-muted py-3">Stock en óptimas condiciones.</li>
                                        ) : (
                                            alertasInventario.map(prod => (
                                                <li key={prod.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                                    <div>
                                                        <span className="d-block">{prod.nombre}</span>
                                                        <small className="text-muted">Stock: {prod.stockActual} / Mín: {prod.stockMinimo}</small>
                                                    </div>
                                                    <span className="badge rounded-pill" style={{ backgroundColor: '#fca5a5', color: '#991b1b', fontWeight: 'normal' }}>
                                                        {prod.estado}
                                                    </span>
                                                </li>
                                            ))
                                        )}
                                    </ul>

                                </div>
                            </div>

                            <div className="col-md-6 col-lg-5">
                                <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>

                                    <div className="card-header d-flex justify-content-between align-items-center py-3 border-bottom" style={{ backgroundColor: '#f8fafc' }}>
                                        <h3 className="h6 m-0 fw-medium" style={{ color: '#0f172a' }}>
                                            Pedidos recientes
                                        </h3>
                                        <Link to="/admin/gestionPedidos" className="text-decoration-none" style={{ color: '#475569', fontSize: '0.9rem' }}>
                                            Ver todos →
                                        </Link>
                                    </div>

                                    <ul className="list-group list-group-flush">
                                        {pedidosRecientes.length === 0 ? (
                                            <li className="list-group-item text-muted py-3">No hay pedidos recientes.</li>
                                        ) : (
                                            pedidosRecientes.map(pedido => (
                                                <li key={pedido.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                                    <div>
                                                        <span className="d-block">{pedido.numero} - {pedido.cliente}</span>
                                                        <small className="text-muted">{pedido.fecha} | ${pedido.total.toLocaleString('es-CL')}</small>
                                                    </div>
                                                    <span className="badge rounded-pill" style={{ backgroundColor: '#93c5fd', color: '#1e3a8a', fontWeight: 'normal' }}>
                                                        {pedido.estado}
                                                    </span>
                                                </li>
                                            ))
                                        )}
                                    </ul>

                                </div>
                            </div>

                        </div>
                    </section>
                </main>
            </div>

        </>

    );
};

export default AdminDashboard;