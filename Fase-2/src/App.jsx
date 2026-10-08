import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SobreNosotros } from './components/SobreNosotros';

// Componente temporal con botón hacia /nosotros
const Inicio = () => (
  <div className="container mt-5 text-center">
    <h1>Bienvenido a la página principal</h1>
    <Link to="/nosotros" className="btn btn-primary mt-3">
      Ir a Sobre Nosotros
    </Link>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Cuando la URL sea "/", muestra el Inicio */}
        <Route path="/" element={<Inicio />} />
        
        {/* Cuando la URL sea "/nosotros", muestra SobreNosotros */}
        <Route path="/nosotros" element={<SobreNosotros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;