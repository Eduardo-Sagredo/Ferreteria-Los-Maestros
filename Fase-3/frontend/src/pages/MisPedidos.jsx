function MisPedidos() {

  const pedidos = [
    {
      numero: '1001',
      fecha: '12/10/2026',
      estado: 'En preparación',
      tipoEntrega: 'Despacho a domicilio',
      direccion: 'Av. Libertad 1234, Viña del Mar',
      productos: [
        'Taladro inalámbrico',
        'Martillo'
      ],
      total: '$72.980'
    },
    {
      numero: '1002',
      fecha: '05/10/2026',
      estado: 'En despacho',
      tipoEntrega: 'Despacho a domicilio',
      direccion: 'Av. Libertad 1234, Viña del Mar',
      productos: [
        'Caja de tornillos',
        'Destornillador'
      ],
      total: '$24.990'
    },
    {
      numero: '1003',
      fecha: '28/09/2026',
      estado: 'Entregado',
      tipoEntrega: 'Retiro en tienda',
      direccion: 'No aplica',
      productos: [
        'Pintura blanca 1 galón',
        'Brocha'
      ],
      total: '$34.990'
    }
  ]


  const obtenerClaseEstado = (estado) => {

    if (estado === 'En preparación') {
      return 'bg-warning text-dark'
    }

    if (estado === 'En despacho') {
      return 'bg-primary'
    }

    if (estado === 'Entregado') {
      return 'bg-success'
    }

    return 'bg-secondary'
  }


  return (

    <main className="container my-5 flex-grow-1">

      <div className="text-center mb-5">

        <h2>
          Mis Pedidos
        </h2>

        <p className="text-muted">
          Revisa el estado de tus pedidos recientes.
        </p>

      </div>


      <div className="row g-4">

        {pedidos.map((pedido) => (

          <div
            className="col-12 col-md-6 col-lg-4"
            key={pedido.numero}
          >

            <div className="card shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <h5 className="card-title mb-0">
                    Pedido #{pedido.numero}
                  </h5>

                  <span
                    className={`badge ${obtenerClaseEstado(
                      pedido.estado
                    )}`}
                  >
                    {pedido.estado}
                  </span>

                </div>


                <p className="mb-2">

                  <strong>Fecha:</strong>{' '}
                  {pedido.fecha}

                </p>


                <p className="mb-2">

                  <strong>Tipo de entrega:</strong>{' '}
                  {pedido.tipoEntrega}

                </p>


                <p className="mb-3">

                  <strong>Dirección:</strong>{' '}
                  {pedido.direccion}

                </p>


                <h6>
                  Productos
                </h6>

                <ul className="mb-3">

                  {pedido.productos.map((producto) => (

                    <li key={producto}>
                      {producto}
                    </li>

                  ))}

                </ul>


                <hr />


                <div className="d-flex justify-content-between">

                  <strong>Total</strong>

                  <strong>
                    {pedido.total}
                  </strong>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>

  )
}

export default MisPedidos