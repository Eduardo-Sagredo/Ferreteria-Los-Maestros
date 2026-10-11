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

  // Aquí irán tus funciones de tienda.js (agregarAlCarrito, actualizarStock, etc)
  const actualizarStockProducto = (id, nuevoStock) => {
    setProductos(prev => prev.map(p => 
      p.id === id ? { ...p, stockActual: nuevoStock } : p
    ));
  };

  return (
    <AppContext.Provider value={{ productos, setProductos, pedidos, setPedidos, actualizarStockProducto }}>
      {children}
    </AppContext.Provider>
  );
};