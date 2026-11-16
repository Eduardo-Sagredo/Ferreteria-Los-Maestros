import { createContext, useState, useEffect } from 'react';
// Asegúrate de tener exportado usuariosIniciales en tu mockdb, o si no, 
// el código de abajo tiene un respaldo por si acaso no existe.
import {
  productosIniciales,
  pedidosIniciales,
  usuariosIniciales
} from '../services/datosIniciales.js'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- INICIALIZACIÓN DE ESTADOS ---
  const [productos, setProductos] = useState(() => {
    const guardado = localStorage.getItem('db_productos_react');
    return guardado ? JSON.parse(guardado) : productosIniciales;
  });

  const [pedidos, setPedidos] = useState(() => {
    const guardado = localStorage.getItem('db_pedidos_react');
    return guardado ? JSON.parse(guardado) : pedidosIniciales;
  });

  // NUEVO: Estado de usuarios
  const [usuarios, setUsuarios] = useState(() => {
    const guardado = localStorage.getItem('db_usuarios_react');
    // Si tienes usuariosIniciales en mockdb los usa, sino usa un arreglo vacío de respaldo
    return guardado ? JSON.parse(guardado) : (usuariosIniciales || []);
  });

  // --- EFECTOS DE AUTOGUARDADO ---
  useEffect(() => {
    localStorage.setItem('db_productos_react', JSON.stringify(productos));
  }, [productos]);

  // NUEVO: Autoguardado para usuarios
  useEffect(() => {
    localStorage.setItem('db_usuarios_react', JSON.stringify(usuarios));
  }, [usuarios]);


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
    setProductos(prev => [...prev, { ...nuevoProducto, id: Date.now() }]);
  };

  const editarProducto = (id, datosActualizados) => {
    setProductos(prev => prev.map(p =>
      p.id === id ? { ...p, ...datosActualizados } : p
    ));
  };


  // --- FUNCIONES CRUD PARA USUARIOS (NUEVO) ---
  const eliminarUsuario = (id) => {
    setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios(prev => [...prev, { ...nuevoUsuario, id: Date.now() }]);
  };

  const editarUsuario = (id, datosActualizados) => {
    setUsuarios(prev => prev.map(u =>
      u.id === id ? { ...u, ...datosActualizados } : u
    ));
  };

  return (
    <AppContext.Provider value={{
      // Exportamos lo de productos
      productos,
      setProductos,
      actualizarStockProducto,
      eliminarProducto,
      agregarProducto,
      editarProducto,

      // Exportamos lo de pedidos
      pedidos,
      setPedidos,

      // Exportamos lo de usuarios (NUEVO)
      usuarios,
      setUsuarios,
      eliminarUsuario,
      agregarUsuario,
      editarUsuario
    }}>
      {children}
    </AppContext.Provider>
  );
};