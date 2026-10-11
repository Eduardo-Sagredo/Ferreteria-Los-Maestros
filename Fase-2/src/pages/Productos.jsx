import { useEffect, useState } from 'react'

import ProductoCard from '../components/ProductoCard.jsx'
import MockDB from '../services/MockDB.js'

function Productos() {

  const [productos, setProductos] = useState([])

  useEffect(() => {

    const productosGuardados =
      MockDB.getTabla('productos')

    setProductos(productosGuardados)

  }, [])

  return (
    <main className="py-5">

      <div className="container">

        <h1 className="text-center mb-2">
          Catálogo de Productos
        </h1>

        <p className="text-center text-muted mb-5">
          Encuentra los productos que necesitas
          para tus proyectos.
        </p>

        <div className="row g-4">

          {productos.map((producto) => (

            <div
              className="col-12 col-md-6 col-lg-4"
              key={producto.id}
            >

              <ProductoCard
                producto={producto}
              />

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}

export default Productos