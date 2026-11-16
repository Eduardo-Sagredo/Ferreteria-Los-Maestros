import { useEffect, useState } from 'react'
import { listarPedidos, cambiarEstado } from '../../api/pedidoService.js'

import '../../components/styles.css'
import '../../components/tienda.css'

export const GestionPedidos = () => {

  // 1. ESTADOS DEL COMPONENTE

  const [pedidos, setPedidos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null)
  const [nuevoEstado, setNuevoEstado] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [errorModal, setErrorModal] = useState('')
  const [mensajeModal, setMensajeModal] = useState('')

  // 2. CARGAR PEDIDOS DESDE SPRING BOOT

  useEffect(() => {
    async function cargarPedidos() {
      try {
        setCargando(true)
        setError('')

        const datos = await listarPedidos()
        setPedidos(datos)

      } catch (err) {
        console.error('Error al cargar pedidos:', err)
        setError('No fue posible cargar los pedidos desde el servidor.')

      } finally {
        setCargando(false)
      }
    }

    cargarPedidos()
  }, [])

  // 3. FILTRAR PEDIDOS

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const numero = String(pedido.id)
    const cliente = pedido.cliente || ''

    const coincideTexto =
      numero.includes(busqueda.toLowerCase()) ||
      cliente.toLowerCase().includes(busqueda.toLowerCase())

    const coincideEstado =
      filtroEstado === 'todos' ||
      pedido.estado === filtroEstado

    return coincideTexto && coincideEstado
  })

  // 4. FUNCIONES DEL MODAL

  function handleAbrirModal(pedido) {
    setPedidoSeleccionado(pedido)
    setNuevoEstado('')
    setErrorModal('')
    setMensajeModal('')
    setShowModal(true)
  }

  function handleCerrarModal() {
    if (guardando) return

    setShowModal(false)
    setPedidoSeleccionado(null)
  }

  // 5. MOSTRAR ESTADOS

  function mostrarEstado(estado) {
    const nombres = {
      PENDIENTE: 'Pendiente',
      EN_PREPARACION: 'En preparación',
      ENTREGADO: 'Entregado',
      CANCELADO: 'Cancelado'
    }

    return nombres[estado] || estado
  }

  function getColorEstado(estado) {
    switch (estado) {
      case 'PENDIENTE':
        return 'bg-warning text-dark'

      case 'EN_PREPARACION':
        return 'bg-info text-dark'

      case 'ENTREGADO':
        return 'bg-success text-white'

      case 'CANCELADO':
        return 'bg-danger text-white'

      default:
        return 'bg-secondary text-white'
    }
  }

  // 6. FORMATEAR FECHA

  function formatearFecha(fecha) {
    if (!fecha) return '-'

    const fechaConvertida = new Date(fecha)

    if (Number.isNaN(fechaConvertida.getTime())) {
      return fecha
    }

    return fechaConvertida.toLocaleString('es-CL')
  }

  // 7. ESTADOS PERMITIDOS

  function obtenerEstadosDisponibles(estado) {
    if (estado === 'PENDIENTE') {
      return ['EN_PREPARACION', 'CANCELADO']
    }

    if (estado === 'EN_PREPARACION') {
      return ['ENTREGADO', 'CANCELADO']
    }

    return []
  }

  // 8. CAMBIAR ESTADO MEDIANTE API REST

  async function actualizarEstado() {
    if (!pedidoSeleccionado || !nuevoEstado) {
      setErrorModal('Selecciona un estado.')
      return
    }

    try {
      setGuardando(true)
      setErrorModal('')
      setMensajeModal('')

      const actualizado = await cambiarEstado(
        pedidoSeleccionado.id,
        nuevoEstado
      )

      setPedidos((anteriores) =>
        anteriores.map((pedido) =>
          pedido.id === actualizado.id ? actualizado : pedido
        )
      )

      setPedidoSeleccionado(actualizado)
      setNuevoEstado('')
      setMensajeModal('Estado actualizado correctamente.')

    } catch (err) {
      console.error('Error al actualizar pedido:', err)

      setErrorModal(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'No fue posible actualizar el estado. Verifica tus permisos.'
      )

    } finally {
      setGuardando(false)
    }
  }

  const estadosDisponibles = pedidoSeleccionado
    ? obtenerEstadosDisponibles(pedidoSeleccionado.estado)
    : []

  // 9. INTERFAZ DE GESTIÓN DE PEDIDOS

  return (
    <div className="d-flex flex-column min-vh-100">

      <main className="flex-grow-1">

        <section>
          <h1 className="mx-2 my-2 fs-2 container mt-4">
            Gestión de pedidos
          </h1>

          <div className="container my-5">

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

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
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="EN_PREPARACION">En preparación</option>
                  <option value="ENTREGADO">Entregado</option>
                  <option value="CANCELADO">Cancelado</option>
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
                    <th className="py-3 px-4">N.°</th>
                    <th className="py-3">CLIENTE</th>
                    <th className="py-3">FECHA</th>
                    <th className="py-3">TOTAL</th>
                    <th className="py-3 text-center">ENTREGA</th>
                    <th className="py-3 text-center">ESTADO</th>
                    <th className="py-3 text-center">ACCIÓN</th>
                  </tr>
                </thead>

                <tbody>

                  {cargando ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        Cargando pedidos...
                      </td>
                    </tr>
                  ) : pedidosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        No se encontraron pedidos.
                      </td>
                    </tr>
                  ) : (
                    pedidosFiltrados.map((pedido) => (
                      <tr key={pedido.id}>

                        <td className="py-3 px-4 text-secondary font-monospace">
                          #{pedido.id}
                        </td>

                        <td className="py-3 text-dark fw-medium">
                          {pedido.cliente}
                        </td>

                        <td className="py-3 text-secondary">
                          {formatearFecha(pedido.fechaPedido)}
                        </td>

                        <td className="py-3" style={{ color: '#d97706' }}>
                          ${Number(pedido.total).toLocaleString('es-CL')}
                        </td>

                        <td className="py-3 text-center text-secondary">
                          -
                        </td>

                        <td className="py-3 text-center">
                          <span className={`badge rounded-pill ${getColorEstado(pedido.estado)}`}>
                            {mostrarEstado(pedido.estado)}
                          </span>
                        </td>

                        <td className="py-3 text-center">
                          <button
                            className="btn btn-sm btn-outline-primary rounded-3"
                            onClick={() => handleAbrirModal(pedido)}
                          >
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

      {/* 10. MODAL DE DETALLE DEL PEDIDO */}

      {showModal && pedidoSeleccionado && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1040 }}
          ></div>

          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            tabIndex="-1"
            style={{
              zIndex: 1050,
              backgroundColor: 'rgba(0,0,0,0.5)'
            }}
          >

            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow rounded-4">

                <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
                  <h5 className="modal-title text-dark fw-medium fs-5">
                    Pedido #{pedidoSeleccionado.id}
                  </h5>

                  <button
                    type="button"
                    className="btn-close shadow-none"
                    onClick={handleCerrarModal}
                  ></button>
                </div>

                <div className="modal-body p-4">

                  <div className="row mb-4">

                    <div className="col-6">
                      <small className="text-secondary fw-medium d-block mb-1">
                        Cliente
                      </small>

                      <div className="text-dark">
                        {pedidoSeleccionado.cliente}
                      </div>
                    </div>

                    <div className="col-6">
                      <small className="text-secondary fw-medium d-block mb-1">
                        Estado
                      </small>

                      <span className={`badge rounded-pill px-3 py-2 ${getColorEstado(pedidoSeleccionado.estado)}`}>
                        {mostrarEstado(pedidoSeleccionado.estado)}
                      </span>
                    </div>

                  </div>

                  <hr className="text-secondary opacity-25" />

                  <small className="text-secondary fw-medium d-block mb-3">
                    Productos
                  </small>

                  <ul className="list-unstyled mb-0 text-dark">

                    {pedidoSeleccionado.detalles?.length > 0 ? (
                      pedidoSeleccionado.detalles.map((detalle, index) => (
                        <li
                          key={detalle.productoId ?? index}
                          className="d-flex justify-content-between mb-2 pb-2 border-bottom"
                        >
                          <span>{detalle.nombre}</span>

                          <span className="text-secondary">
                            Cant: {detalle.cantidad}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="text-muted fst-italic">
                        Detalle de productos no disponible.
                      </li>
                    )}

                    <li className="d-flex justify-content-between mt-3 pt-2">
                      <strong>Total:</strong>

                      <strong style={{ color: '#d97706' }}>
                        ${Number(pedidoSeleccionado.total).toLocaleString('es-CL')}
                      </strong>
                    </li>

                  </ul>

                  {/* 11. ACTUALIZACIÓN DEL ESTADO */}

                  {estadosDisponibles.length > 0 && (
                    <div className="mt-4">

                      <hr />

                      <h6 className="mb-3">
                        Cambiar estado del pedido
                      </h6>

                      <select
                        className="form-select mb-3"
                        value={nuevoEstado}
                        onChange={(e) => setNuevoEstado(e.target.value)}
                      >
                        <option value="">
                          Selecciona un estado
                        </option>

                        {estadosDisponibles.map((estado) => (
                          <option key={estado} value={estado}>
                            {mostrarEstado(estado)}
                          </option>
                        ))}
                      </select>

                      <button
                        className="btn btn-primary w-100"
                        onClick={actualizarEstado}
                        disabled={guardando || !nuevoEstado}
                      >
                        {guardando ? 'Guardando...' : 'Guardar estado'}
                      </button>

                    </div>
                  )}

                  {errorModal && (
                    <div className="alert alert-danger mt-3 mb-0">
                      {errorModal}
                    </div>
                  )}

                  {mensajeModal && (
                    <div className="alert alert-success mt-3 mb-0">
                      {mensajeModal}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default GestionPedidos