import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import api from '../api/axiosConfig.js'

function MisPedidos() {
    const [pedidos, setPedidos] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const cargarMisPedidos = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                setPedidos([])
                setCargando(false)
                return
            }

            try {
                const {data} = await api.get('/pedidos/mis-pedidos')
                setPedidos(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error('Error al obtener mis pedidos:', error)
                setPedidos([])
            } finally {
                setCargando(false)
            }
        }

        cargarMisPedidos()
    }, [])

    const obtenerClaseEstado = (estado) => {
        switch (estado) {
            case 'Pendiente':
            case 'Preparando':
            case 'En preparación':
                return 'bg-warning text-dark'
            case 'En despacho':
                return 'bg-primary'
            case 'Listo para retiro':
            case 'Entregado':
                return 'bg-success'
            default:
                return 'bg-secondary'
        }
    }

    return (
        <main className="container my-5 flex-grow-1">
            <div className="text-center mb-5">
                <h2>Mis Pedidos</h2>
                <p className="text-muted">
                    Revisa el estado de tus pedidos recientes.
                </p>
            </div>

            {!cargando && pedidos.length === 0 && (
                <div className="carrito-vacio text-center py-5">
                    <i className="bi bi-bag-x fs-1 text-secondary"></i>
                    <h3 className="h5 mt-3 mb-4">
                        Todavía no tienes pedidos, revisa nuestros productos aquí
                    </h3>
                    <Link to="/productos" className="btn btn-warning px-4">
                        Ver productos
                    </Link>
                </div>
            )}

            {!cargando && pedidos.length > 0 && (
                <div className="row g-4">
                    {pedidos.map((pedido) => {
                        const numero = pedido.numeroPedido ?? pedido.numero
                        const tipoEntrega = pedido.entrega ?? pedido.tipoEntrega ?? 'Retiro'
                        const direccion =
                            pedido.direccion ??
                            (tipoEntrega === 'Retiro' ? 'Retiro en tienda' : 'No aplica')

                        return (
                            <div
                                className="col-12 col-md-6 col-lg-4"
                                key={pedido.id ?? numero}
                            >
                                <div className="card shadow-sm h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="card-title mb-0">
                                                Pedido #{numero}
                                            </h5>

                                            <span
                                                className={`badge ${obtenerClaseEstado(pedido.estado)}`}
                                            >
                        {pedido.estado}
                      </span>
                                        </div>

                                        <p className="mb-2">
                                            <strong>Fecha:</strong> {pedido.fecha}
                                        </p>

                                        <p className="mb-2">
                                            <strong>Tipo de entrega:</strong> {tipoEntrega}
                                        </p>

                                        <p className="mb-3">
                                            <strong>Dirección:</strong> {direccion}
                                        </p>

                                        <h6>Productos</h6>

                                        <ul className="mb-3">
                                            {(pedido.productos ?? []).map((producto, index) => (
                                                <li key={index}>
                                                    {typeof producto === 'string'
                                                        ? producto
                                                        : `${producto.nombre} (x${producto.cantidad})`}
                                                </li>
                                            ))}
                                        </ul>

                                        <hr/>

                                        <div className="d-flex justify-content-between">
                                            <strong>Total</strong>
                                            <strong>
                                                ${Number(pedido.total ?? 0).toLocaleString('es-CL')}
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </main>
    )
}

export default MisPedidos