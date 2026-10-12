import { createContext, useState, useEffect } from 'react';
import { productosIniciales, pedidosIniciales } from '../services/mockdb';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Inicializamos el estado intentando leer de localStorage, si no hay, usamos mockdb
  const [productos, setProductos] = useState(() => {
    const guardado = localStorage.getItem('db_productos_react');
    return guardado ? JSON.parse(guardado) : productosIniciales;
  });

  const [pedidos, setPedidos] = useState(() => {
    const guardado = localStorage.getItem('db_pedidos_react');
    return guardado ? JSON.parse(guardado) : pedidosIniciales;
  });

  // Efecto para autoguardar en localStorage cada vez que un admin edite un producto
  useEffect(() => {
    localStorage.setItem('db_productos_react', JSON.stringify(productos));
  }, [productos]);

  // --- FUNCIONES CRUD PARA PRODUCTOS ---

  const actualizarStockProducto = (id, nuevoStock) => {
    setProductos(prev => prev.map(p => 
      p.id === id ? { ...p, stockActual: nuevoStock } : p
    ));
  };

  const eliminarProducto = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  const agregarProducto = (nuevoProducto) => {
    // Generamos un ID temporal con Date.now() para simular una base de datos real
    setProductos(prev => [...prev, { ...nuevoProducto, id: Date.now() }]);
  };

  const editarProducto = (id, datosActualizados) => {
    setProductos(prev => prev.map(p => 
      p.id === id ? { ...p, ...datosActualizados } : p
    ));
  };

  return (
    <AppContext.Provider value={{ 
      productos, 
      setProductos, 
      pedidos, 
      setPedidos, 
      actualizarStockProducto,
      eliminarProducto,
      agregarProducto,
      editarProducto
    }}>
      {children}
    </AppContext.Provider>
  );
};