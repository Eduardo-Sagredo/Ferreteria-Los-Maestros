function Historial() {

  const compras = [
    {
      fecha: '08/09/2026',
      pedido: '#1003',
      productos: '2 brochas, 1 galón de pintura',
      total: '$32.990',
      estado: 'Entregado'
    },
    {
      fecha: '02/09/2026',
      pedido: '#0998',
      productos: '1 serrucho, 1 cinta métrica',
      total: '$18.500',
      estado: 'Entregado'
    },
    {
      fecha: '28/08/2026',
      pedido: '#0985',
      productos: '3 sacos de cemento, 1 pala',
      total: '$64.990',
      estado: 'Entregado'
    },
    {
      fecha: '20/08/2026',
      pedido: '#0972',
      productos: '1 taladro, 1 juego de brocas',
      total: '$89.990',
      estado: 'Entregado'
    }
  ]

  return (

    <main className="container my-5 flex-grow-1">

      <div className="text-center mb-4">

        <h2>
          Historial de Compras
        </h2>

        <p className="text-muted">
          Revisa tus compras anteriores.
        </p>

      </div>


      <div className="card shadow-sm">

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-striped table-hover align-middle">

              <thead className="table-dark">

                <tr>
                  <th>Fecha</th>
                  <th>Pedido</th>
                  <th>Productos</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>

              </thead>


              <tbody>

                {compras.map((compra) => (

                  <tr key={compra.pedido}>

                    <td>
                      {compra.fecha}
                    </td>

                    <td>
                      {compra.pedido}
                    </td>

                    <td>
                      {compra.productos}
                    </td>

                    <td>
                      {compra.total}
                    </td>

                    <td>

                      <span className="badge bg-success">
                        {compra.estado}
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

export default Historial