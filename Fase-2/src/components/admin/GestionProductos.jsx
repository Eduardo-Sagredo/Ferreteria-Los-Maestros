import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import '../styles.css'
import '../tienda.css'
import logoImg from '../../assets/logo.png'



export const GestionProductos = () => {
    const { productos, eliminarProducto } = useContext(AppContext);
    const navigate = useNavigate(); // Hook para redireccionar a otras páginas

    // 2. Creamos Estados (useState) para controlar los filtros
    const [busqueda, setBusqueda] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('todas');
    const [filtroEstado, setFiltroEstado] = useState('todos');

    // 3. Lógica de filtrado en tiempo real (reemplaza a aplicarFiltrosProd)
    const productosFiltrados = productos.filter(p => {
        const coincideTxt = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.codigo.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCat = filtroCategoria === 'todas' || p.categoria === filtroCategoria;
        const coincideEst = filtroEstado === 'todos' || p.estado === filtroEstado;

        return coincideTxt && coincideCat && coincideEst;
    });

    // 4. Funciones de acción (reemplazan a window.eliminarProducto y window.editarProducto)
    const handleEliminar = (id) => {
        if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
            eliminarProducto(id); // Borra del estado global automáticamente
        }
    };

    const handleEditar = (id) => {
        // Redirige a la página de agregar pero con el ID en la URL
        navigate(`/admin/agregar-producto?edit=${id}`);
    };



    return (
        <>

            <header>
                <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container">
                        <Link className="navbar-brand" to="../index.html">
                            <img src={logoImg} alt="Logo Ferretería Los Maestros" className="logo-img" />
                            <span className="texto-ferreteria">Ferretería</span>
                            <span className="texto-maestros">Los Maestros</span>
                        </Link>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="principal.html">
                                    <i className="bi bi-house-door-fill"></i>
                                    Inicio
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="admin/productos">
                                    <i className="bi bi-box-seam"></i>
                                    Productos
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="inventario.html">
                                    <i className="bi bi-card-checklist"></i>
                                    Inventario
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="gestion-pedidos.html">
                                    <i className="bi bi-receipt"></i>
                                    Pedidos
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="gestion-usuarios.html">
                                    <i className="bi bi-person"></i>
                                    Usuarios
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="gestion-reportes.html">
                                    <i className="bi bi-file-bar-graph"></i>
                                    Reportes
                                </Link>
                            </li>
                        </ul>

                    </div>
                </nav>

            </header>

            <main className="flex-grow-1">

                <section>
                    <div className="d-flex justify-content-between mx-2 my-2">
                        <h1 className="fs-2">Gestión de productos</h1>
                        <Link to="agregar-producto.html" className="btn d-inline-flex align-items-center" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-header)' }} >
                            + Agregar Producto
                        </Link>
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
                                    <input type="text" id="buscador-productos"
                                        className="form-control border-start-0 rounded-end-3 shadow-none" 
                                        placeholder="Buscar..." 
                                        value={busqueda}onChange={(e) => setBusqueda(e.target.value)} />
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <select id="filtro-categoria" className="form-select rounded-3 shadow-none text-secondary" 
                                value={filtroCategoria}
                                onChange={(e) => setFiltroCategoria(e.target.value)}>
                                    <option value="todas" selected>Todas las categorías</option>
                                    <option value="herramientas">Herramientas</option>
                                    <option value="electricidad">Eléctricas</option>
                                    <option value="construccion">Construcción</option>
                                    <option value="gasfiteria">Gásfitería</option>
                                </select>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <select id="filtro-estado" className="form-select rounded-3 shadow-none text-secondary"
                                value={filtroEstado}
                                onChange={(e) => setFiltroEstado(e.target.value)}>
                                    <option value="todos" selected>Todos los estados</option>
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
                        <div className="table-responsive bg-white rounded-3 shadow-sm border" style={{ borderColor: 'var(--color-header)' }} >
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light text-secondary" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }} >
                                    <tr>
                                        <th className="py-3 px-4 fw-medium border-bottom-0">CÓDIGO</th>
                                        <th className="py-3 fw-medium border-bottom-0">PRODUCTO</th>
                                        <th className="py-3 fw-medium border-bottom-0">CATEGORÍA</th>
                                        <th className="py-3 fw-medium border-bottom-0">PRECIO</th>
                                        <th className="py-3 text-center fw-medium border-bottom-0">STOCK</th>
                                        <th className="py-3 text-center fw-medium border-bottom-0">MÍN.</th>
                                        <th className="py-3 text-center fw-medium border-bottom-0">ESTADO</th>
                                        <th className="py-3 text-center fw-medium border-bottom-0">ACCIONES</th>
                                    </tr>
                                </thead>

                                <tbody className="border-top-0">
                                    {productosFiltrados.map((prod) => (
                                        <tr key={prod.id}>
                                            <td className="py-3 px-4">{prod.codigo}</td>
                                            <td className="py-3 fw-medium">{prod.nombre}</td>
                                            <td className="py-3">{prod.categoria}</td>
                                            <td className="py-3">${prod.precio.toLocaleString('es-CL')}</td>
                                            <td className="py-3 text-center">{prod.stockActual}</td>
                                            <td className="py-3 text-center">{prod.stockMinimo}</td>
                                            <td className="py-3 text-center">
                                                <span className={`badge ${prod.estado === 'Disponible' ? 'bg-success' : prod.estado === 'Stock bajo' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                                                    {prod.estado}
                                                </span>
                                            </td>
                                            <td className="py-3 text-center">
                                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(prod.id)}>
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(prod.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </section>


            </main>

            <footer className="footer-tienda mt-5">
                <div className="container text-center">
                    <p className="mb-0">&copy; 2026 Ferretería Los Maestros. Todos los derechos reservados.</p>
                </div>
            </footer>

        </>
    );
};