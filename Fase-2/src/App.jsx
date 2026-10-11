import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 1. Importas el Proveedor del Contexto Global (Tus datos)
import { AppProvider } from './context/AppContext';

// 2. Importas los componentes del Administrador
import { AdminDashboard } from './components/admin/AdminDashboard';

// Componente temporal para el inicio público
const InicioPublico = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>Bienvenido a Ferretería Los Maestros</h1>
      <p className="mb-4">Esta es la vista pública de la tienda.</p>
      
      {/* Botón simple que te lleva al Dashboard del Admin */}
      <Link to="/admin" className="btn btn-primary btn-lg">
        <i className="bi bi-speedometer2 me-2"></i>
        Ir al Panel de Administrador
      </Link>
    </div>
  );
};

function App() {
  return (
    /* AppProvider envuelve todo para que el Admin y el Cliente compartan la misma "Base de Datos" */
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* RUTA PÚBLICA (El inicio temporal con el botón) */}
          <Route path="/" element={<AdminDashboard />} />

          {/* MÓDULO ADMINISTRADOR (Rutas Anidadas) */}
          <Route path="/admin" element={<AdminDashboard />}>
            {/* El "index" significa que al entrar a "/admin" se mostrará este componente por defecto */}
            <Route index element={<AdminDashboard />} />
            
            {/* Aquí irás agregando las demás rutas del admin a medida que las migres */}
            {/* <Route path="productos" element={<GestionProductos />} /> */}
            {/* <Route path="inventario" element={<GestionInventario />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;