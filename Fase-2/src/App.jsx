import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Carrito from './pages/Carrito.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/productos"
          element={<Productos />}
        />

        <Route
          path="/producto/:id"
          element={<DetalleProducto />}
        />

        <Route
          path="/carrito"
          element={<Carrito />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App