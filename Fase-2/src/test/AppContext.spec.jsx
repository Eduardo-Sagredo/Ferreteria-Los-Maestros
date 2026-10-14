import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider, AppContext } from '../../src/context/AppContext';

// --- COMPONENTE DE PRUEBA ---
// Este componente simula ser parte de tu aplicación para poder acceder 
// a los estados y funciones del AppContext dentro de los tests.
const TestConsumer = () => {
    const {
        productos, agregarProducto, eliminarProducto, actualizarStockProducto,
        usuarios, agregarUsuario, eliminarUsuario,
        pedidos, agregarPedido, actualizarEstadoPedido
    } = useContext(AppContext);

    return (
        <div>
            {/* Lectura de estados */}
            <span data-testid="total-productos">{productos ? productos.length : 0}</span>
            <span data-testid="stock-primer-producto">{productos && productos.length > 0 ? productos[0].stockActual : 0}</span>
            <span data-testid="total-usuarios">{usuarios ? usuarios.length : 0}</span>
            <span data-testid="total-pedidos">{pedidos ? pedidos.length : 0}</span>
            <span data-testid="estado-primer-pedido">{pedidos && pedidos.length > 0 ? pedidos[0].estado : ''}</span>

            {/* Acciones de Productos */}
            <button data-testid="btn-add-prod" onClick={() => agregarProducto({ id: 999, codigo: 'TEST-01', nombre: 'Clavo', stockActual: 10, stockMinimo: 5 })}>Add Prod</button>
            <button data-testid="btn-update-stock" onClick={() => actualizarStockProducto(productos[0].id, 50)}>Update Stock</button>
            <button data-testid="btn-del-prod" onClick={() => eliminarProducto(productos[0].id)}>Del Prod</button>

            {/* Acciones de Usuarios */}
            <button data-testid="btn-add-user" onClick={() => agregarUsuario({ id: 999, nombre: 'Juan Perez', correo: 'juan@test.com', rol: 'Cliente' })}>Add User</button>
            <button data-testid="btn-del-user" onClick={() => eliminarUsuario(usuarios[0].id)}>Del User</button>

            {/* Acciones de Pedidos */}
            <button data-testid="btn-add-order" onClick={() => agregarPedido({ id: 999, cliente: 'Juan Perez', total: 15000, estado: 'Pendiente' })}>Add Order</button>
            <button data-testid="btn-update-order" onClick={() => actualizarEstadoPedido(pedidos[0].id, 'Entregado')}>Update Order</button>
        </div>
    );
};

// --- SUITE DE TESTS CON JASMINE ---
describe('Pruebas Unitarias del AppContext (Ferretería Los Maestros)', () => {

    // Antes de cada test, limpiamos el localStorage para que los tests sean independientes
    beforeEach(() => {
        localStorage.clear();
    });

    // TEST 1
    it('1. Debe inicializar el contexto cargando los datos iniciales (mockdb)', () => {
        render(<AppProvider><TestConsumer /></AppProvider>);

        // Verifica que los arreglos no estén vacíos al iniciar
        const totalProductos = parseInt(screen.getByTestId('total-productos').textContent);
        const totalUsuarios = parseInt(screen.getByTestId('total-usuarios').textContent);

        expect(totalProductos).toBeGreaterThan(0);
        expect(totalUsuarios).toBeGreaterThan(0);
    });

    // TEST 2
    it('2. Debe agregar un nuevo producto correctamente al estado', () => {
        render(<AppProvider><TestConsumer /></AppProvider>);
        const totalInicial = parseInt(screen.getByTestId('total-productos').textContent);

        fireEvent.click(screen.getByTestId('btn-add-prod'));

        const totalFinal = parseInt(screen.getByTestId('total-productos').textContent);
        expect(totalFinal).toEqual(totalInicial + 1);
    });

    // TEST 3
    it('3. Debe eliminar un producto existente del estado', () => {
        render(<AppProvider><TestConsumer /></AppProvider>);
        const totalInicial = parseInt(screen.getByTestId('total-productos').textContent);

        fireEvent.click(screen.getByTestId('btn-del-prod'));

        const totalFinal = parseInt(screen.getByTestId('total-productos').textContent);
        expect(totalFinal).toEqual(totalInicial - 1);
    });

    // TEST 4
    it('4. Debe actualizar el stock actual de un producto', () => {
        render(<AppProvider><TestConsumer /></AppProvider>);

        fireEvent.click(screen.getByTestId('btn-update-stock'));

        const stockActualizado = screen.getByTestId('stock-primer-producto').textContent;
        expect(stockActualizado).toEqual('50');
    });

    // TEST 5
    it('5. Debe agregar un nuevo usuario correctamente', () => {
        render(<AppProvider><TestConsumer /></AppProvider>);
        const totalInicial = parseInt(screen.getByTestId('total-usuarios').textContent);

        fireEvent.click(screen.getByTestId('btn-add-user'));

        const totalFinal = parseInt(screen.getByTestId('total-usuarios').textContent);
        expect(totalFinal).toEqual(totalInicial + 1);
    });

    // TEST 6
    it('6. Debe eliminar un usuario del sistema', () => {
        render(<AppProvider><TestConsumer /></AppProvider>);
        const totalInicial = parseInt(screen.getByTestId('total-usuarios').textContent);

        fireEvent.click(screen.getByTestId('btn-del-user'));

        const totalFinal = parseInt(screen.getByTestId('total-usuarios').textContent);
        expect(totalFinal).toEqual(totalInicial - 1);
    });

    it('7. Debe persistir la eliminación de un producto en localStorage', () => {
        render(<AppProvider><TestConsumer /></AppProvider>);

        // Leemos cuántos productos hay en el storage al iniciar
        const dbInicial = JSON.parse(localStorage.getItem('db_productos_react'));

        // Simulamos eliminar un producto usando el botón que ya existe
        fireEvent.click(screen.getByTestId('btn-del-prod'));

        // Verificamos que el arreglo en localStorage ahora tiene 1 elemento menos
        const dbFinal = JSON.parse(localStorage.getItem('db_productos_react'));
        expect(dbFinal.length).toEqual(dbInicial.length - 1);
    });

    // TEST 8
    it('8. Debe persistir la actualización de stock en localStorage', () => {
        render(<AppProvider><TestConsumer /></AppProvider>);

        // Simulamos actualizar el stock del producto usando el botón existente
        fireEvent.click(screen.getByTestId('btn-update-stock'));

        // Verificamos que en el localStorage el stock del producto se guardó como 50
        const dbFinal = JSON.parse(localStorage.getItem('db_productos_react'));
        expect(dbFinal[0].stockActual).toEqual(50);
    });

    // TEST 9
    it('9. Debe persistir los datos de los productos en localStorage', () => {
        render(<AppProvider><TestConsumer /></AppProvider>);

        // Hacemos un cambio en el estado
        fireEvent.click(screen.getByTestId('btn-add-prod'));

        // Verificamos que el autoguardado en localStorage funcionó con la clave correcta
        const dbProductos = JSON.parse(localStorage.getItem('db_productos_react'));
        expect(dbProductos).not.toBeNull();
        expect(dbProductos.length).toBeGreaterThan(0);
    });

    // TEST 10
    it('10. Debe persistir los datos de los usuarios en localStorage', () => {
        render(<AppProvider><TestConsumer /></AppProvider>);

        // Hacemos un cambio en el estado
        fireEvent.click(screen.getByTestId('btn-add-user'));

        // Verificamos el autoguardado de usuarios
        const dbUsuarios = JSON.parse(localStorage.getItem('db_usuarios_react'));
        expect(dbUsuarios).not.toBeNull();
        expect(dbUsuarios.length).toBeGreaterThan(0);
    });
});