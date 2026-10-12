import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 1. Importas el Proveedor del Contexto Global (Tus datos)
import { AppProvider } from './context/AppContext';

// 2. Importas los componentes del Administrador
import { AdminDashboard } from './components/admin/AdminDashboard';
import { GestionProductos } from './components/admin/GestionProductos';

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

          <Route path="/" element={<InicioPublico />} />

          <Route path="/admin/productos" element={<GestionProductos />} />

          <Route path="/admin" element={<AdminDashboard />} />


        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;