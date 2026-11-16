import { AppProvider } from './context/AppContext.jsx';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import RutaProtegida from "./components/RutaProtegida.jsx";

import CuentaCorriente from './pages/CuentaCorriente.jsx'
import Historial from './pages/Historial.jsx'
import MisPedidos from './pages/MisPedidos.jsx'
import Contacto from './pages/Contacto.jsx'
import Registro from './pages/Registro.jsx'
import InicioSesion from './pages/InicioSesion.jsx'

import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Carrito from './pages/Carrito.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import SobreNosotros from './pages/SobreNosotros.jsx'
import Ubicacion from './pages/Ubicacion.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import GestionProductos from './pages/admin/GestionProductos.jsx';
import AgregarProducto from './pages/admin/AgregarProducto.jsx';
import Inventario from './pages/admin/Inventario.jsx';
import GestionPedidos from './pages/admin/GestionPedidos.jsx';
import GestionUsuarios from './pages/admin/GestionUsuarios.jsx';
import FormUsuario from './pages/admin/FormUsuario.jsx';
import GestionReportes from './pages/admin/GestionReportes.jsx';
import InventarioVendedor from './pages/Vendedor/InventarioVendedor.jsx';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>

        <div className="d-flex flex-column min-vh-100">

          <Navbar />

          <Routes>

            {/* --- RUTAS PUBLICAS PARA CLIENTE --- */}

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

            <Route
              path="/sobreNosotros"
              element={<SobreNosotros />}
            />

            <Route
              path="/ubicacion"
              element={<Ubicacion />}
            />

            <Route
              path="/contacto"
              element={<Contacto />}
            />

            <Route
              path="/registro"
              element={<Registro />}
            />

            <Route
              path="/login"
              element={<InicioSesion />}
            />

            {/* --- RUTAS PRIVADAS CLIENTE --- */}

            <Route element={<RutaProtegida rolesPermitidos={['ROLE_CLIENTE', 'ROLE_VENDEDOR', 'ROLE_ADMIN']} />}>

            <Route
                path="/cuenta-corriente"
                element={<CuentaCorriente />}
            />

            <Route
                path="/historial"
                element={<Historial />}
            />

            <Route
                path="/mis-pedidos"
                element={<MisPedidos />}
            />

            </Route>

            {/* --- RUTAS PRIVADAS ADMINISTRADOR --- */}

            <Route element={<RutaProtegida rolesPermitidos={['ROLE_ADMIN']} />}>

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/gestionProductos"
              element={<GestionProductos />}
            />

            <Route
              path="/admin/agregarProducto"
              element={<AgregarProducto />}
            />

            <Route
              path="/admin/inventario"
              element={<Inventario />}
            />

            <Route
              path="/admin/gestionPedidos"
              element={<GestionPedidos />}
            />

            <Route
              path="/admin/gestionUsuarios"
              element={<GestionUsuarios />}
            />

            <Route
              path="/admin/formUsuario"
              element={<FormUsuario />}
            />

            <Route
              path="/admin/gestionReportes"
              element={<GestionReportes />}
            />

            </Route>

            {/* --- RUTAS PRIVADAS VENDEDOR --- */}

            <Route element={<RutaProtegida rolesPermitidos={['ROLE_VENDEDOR', 'ROLE_ADMIN']} />}>

            <Route
              path="/vendedor"
              element={<InventarioVendedor />}
            />

            <Route
              path="/vendedor/productos"
              element={<GestionProductos />}
            />

            </Route>

            {/* --- RUTA POR DEFECTO --- */}

            <Route path="*" element={<Navigate to="/" replace />} />



          </Routes>

          <Footer />

        </div>

      </BrowserRouter>
    </AppProvider>
  )
}

export default App