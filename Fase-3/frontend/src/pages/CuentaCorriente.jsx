function CuentaCorriente() {

  const cuenta = {
    cliente: 'Manuel Flores Rojas',
    estado: 'Activa',
    saldoPendiente: '$85.480',
    limiteCredito: '$300.000'
  }

  const movimientos = [
    {
      fecha: '12/10/2026',
      detalle: 'Compra pedido #1001',
      monto: '$72.980',
      estado: 'Pendiente'
    },
    {
      fecha: '05/10/2026',
      detalle: 'Compra pedido #1002',
      monto: '$12.500',
      estado: 'Pendiente'
    }
  ]


  return (

    <main className="container my-5 flex-grow-1">

      <div className="text-center mb-4">

        <h2>
          Cuenta Corriente
        </h2>

        <p className="text-muted">
          Revisa el estado y los movimientos de tu cuenta corriente.
        </p>

      </div>


      <div className="row g-4 mb-4">

        <div className="col-12 col-md-6">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5 className="card-title mb-3">
                Información de la cuenta
              </h5>

              <p>
                <strong>Cliente:</strong>{' '}
                {cuenta.cliente}
              </p>

              <p>
                <strong>Estado:</strong>{' '}

                <span className="badge bg-success">
                  {cuenta.estado}
                </span>
              </p>

              <p>
                <strong>Límite de crédito:</strong>{' '}
                {cuenta.limiteCredito}
              </p>

            </div>

          </div>

        </div>


        <div className="col-12 col-md-6">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5 className="card-title mb-3">
                Saldo pendiente
              </h5>

              <h2 className="mb-0">
                {cuenta.saldoPendiente}
              </h2>

            </div>

          </div>

        </div>

      </div>


      <div className="card shadow-sm">

        <div className="card-body">

          <h5 className="mb-3">
            Movimientos pendientes
          </h5>


          <div className="table-responsive">

            <table className="table table-striped align-middle">

              <thead className="table-dark">

                <tr>

                  <th>
                    Fecha
                  </th>

                  <th>
                    Detalle
                  </th>

                  <th>
                    Monto
                  </th>

                  <th>
                    Estado
                  </th>

                </tr>

              </thead>


              <tbody>

                {movimientos.map((movimiento, index) => (

                  <tr key={index}>

                    <td>
                      {movimiento.fecha}
                    </td>

                    <td>
                      {movimiento.detalle}
                    </td>

                    <td>
                      {movimiento.monto}
                    </td>

                    <td>

                      <span className="badge bg-warning text-dark">
                        {movimiento.estado}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>

  )
}

export default CuentaCorriente