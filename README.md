# Ferretería Los Maestros


Ferretería Los Maestros es una aplicación web desarrollada para un negocio familiar. El proyecto busca solucionar problemas actuales del negocio, como las consultas de stock por teléfono, inventarios desactualizados en planillas Excel y la gestión manual de cuentas corrientes.

---

## Fase 1 HTML + CSS + JavaScript

## Tecnologías Utilizadas

* **HTML5**: Utilizado para construir la estructura y el contenido de las páginas de forma semántica.
* **CSS3**: Empleado para desarrollar el aspecto visual mediante una hoja de estilos externa, garantizando un diseño responsive adaptable a celulares, tabletas y computadores.
* **JavaScript**: Integrado para agregar comportamiento e interacción, como la validación de formularios, el manejo del carrito de compras y la simulación de estados de pedidos e inventario.
* **Git y GitHub**: Herramientas utilizadas para registrar los cambios en el código, mantener el repositorio remoto y facilitar el trabajo colaborativo del equipo.

---

## Características Principales

* El sistema actual opera como una representación de interfaz sin conexión real a una base de datos ni backend, por lo que utiliza datos simulados mediante JavaScript.
* La plataforma incluye un catálogo de productos que muestra imágenes, precios y disponibilidad de stock.
* El sistema integra un carrito de compras funcional que permite calcular subtotales y el total de los productos seleccionados.
* La interfaz permite representar el proceso de realización de un pedido, ofreciendo alternativas de retiro en tienda o despacho a domicilio con solicitud de dirección.
* Los formularios de inicio de sesión, registro y solicitud de dirección cuentan con validaciones estrictas y mensajes de error personalizados mediante JavaScript.
* La aplicación incluye secciones para que los clientes frecuentes revisen su historial de compras y el saldo pendiente de sus cuentas corrientes.
* El sistema provee una vista de inventario con alertas visuales que indican cuando un producto alcanza un nivel de bajo stock.

---

## Perfiles de Usuario

1. **Administrador**: Es el nivel de mayor acceso, con interfaces desarrolladas para representar la gestión de usuarios y la asignación de roles.
2. **Vendedor / Empleado**: Corresponde al personal de la ferretería, quienes pueden visualizar el inventario, revisar pedidos y representar cambios en el estado de los despachos y stock, sin acceso a la administración de usuarios.
3. **Contratista / Cliente registrado**: Son los clientes frecuentes que pueden consultar productos, utilizar el carrito, representar pedidos, visualizar su historial de compras y revisar el saldo de su cuenta corriente.

---

## Estructura del Sitio

| Página o sección | Propósito |
| :--- | :--- |
| **Inicio** | Presentar la ferretería y permitir acceder a las demás secciones. |
| **Catálogo** | Mostrar productos, imágenes, precio y disponibilidad. |
| **Carrito** | Mostrar productos seleccionados, cantidades, subtotales y total. |
| **Inicio de sesión** | Representar el acceso de usuarios y validar campos. |
| **Registro** | Permitir completar y validar los datos de un nuevo cliente. |
| **Mis pedidos** | Mostrar pedidos simulados y sus estados. |
| **Historial** | Mostrar compras anteriores del cliente. |
| **Cuenta corriente** | Mostrar información y saldo pendiente. |
| **Inventario** | Mostrar productos y stock al Vendedor/Empleado. |
| **Administración** | Representar la gestión de usuarios del sistema. |
| **Ubicación** | Mostrar la ubicación y la zona de cobertura de despacho. |
| **Información / Multimedia** | Incorporar contenido informativo y el video embebido solicitado. |

---

## Fase 2 — Aplicación SPA en React + Vite con Pruebas Unitarias 

En esta etapa el proyecto migró a una arquitectura de Single Page Application (SPA) moderna, modularizada e impulsada por componentes reutilizables, estado centralizado y testing unitario.

---

## Tecnologías Utilizadas

* **Framework**: React 19
* **Build Tool**: 	Vite 8
* **Enrutamiento**:	React Router DOM 7
* **Estilos & UI**:	Bootstrap 5, Bootstrap Icons y CSS3
* **Gestión de Estado**: AppContext, MockDB, useState, useContext
* **Testing**: 	Jasmine, Karma, React Testing Library, ChromeHeadless
* **Control de Versiones**: Git y GitHub

---

## Manejo del Estado y Persistencia 

Uso de useState, useEffect, useContext (AppContext) y MockDB para la persistencia simulada de productos, carrito, usuarios, pedidos y sesión activa en localStorage.

---

## Testing Unitario

Suite de 30 pruebas unitarias creadas con Jasmine, Karma, React Testing Library y ChromeHeadless.

---

##Gestión Ampliada 

Incorporación de tableros de control (Dashboard), CRUD simulado de productos y usuarios, filtros dinámicos, gestión de pedidos y reportes administrativos con indicadores de venta.

---

## Características Principales

* Catálogo Dinámico y Detalle: Búsqueda en tiempo real por nombre o código, filtrado por categorías, vista detallada del producto y control de stock antes de agregar al carrito.

* Carrito de Compras y Control de Stock: Cálculo automático de subtotales y totales. Impide agregar o acumular cantidades que superen el stock disponible y descuenta el inventario al simular compras con débito o crédito.

* Formularios con Validaciones Estrictas: Registro de clientes, inicio de sesión y formulario de contacto con validación de RUT (sin puntos ni guion), formato/dominio de correo y longitud de contraseña (4 a 10 caracteres).

* Vistas Personalizadas según Sesión: Opciones de seguimiento (Mis pedidos, Historial y Cuenta corriente) visibles en el menú del cliente cuando existe una sesión simulada activa.

### Módulo de Administración e Inventario:

* Dashboard con métricas clave, indicadores de ventas, ticket promedio y clientes activos.

* Operaciones CRUD completas para productos y usuarios.

* Alertas visuales de inventario (Disponible, Stock bajo y Sin stock).

* Consulta y filtrado de pedidos y clientes.

* Verificación de cobertura geográfica de despacho para La Serena y zonas aledañas.

* Módulo de Vendedor: Vista simplificada orientada a la consulta rápida de catálogo y actualización de stock.

---

## Perfiles de Usuario

1. **Administrador**: Es el nivel de mayor acceso, con interfaces desarrolladas para representar la gestión de usuarios y la asignación de roles.
2. **Vendedor / Empleado**: Corresponde al personal de la ferretería, quienes pueden visualizar el inventario, revisar pedidos y representar cambios en el estado de los despachos y stock, sin acceso a la administración de usuarios.
3. **Contratista / Cliente registrado**: Son los clientes frecuentes que pueden consultar productos, utilizar el carrito, representar pedidos, visualizar su historial de compras y revisar el saldo de su cuenta corriente.

---

## Estructura del Sitio

| Página o sección | Propósito |
| :--- | :--- |
| **/** | Página principal (Home). |
| **/productos** | Catálogo general con buscador y filtros. |
| **/productos/:id** | Detalle del producto seleccionado. |
| **/carrito** | Carrito de compras y Checkout simulado. |
| **/sobreNosotros** | Información institucional y video embebido. |
| **/ubicacion** | Mapa de ubicación y verificación de cobertura. |
| **/contacto** | Formulario de contacto validado. |
| **/registro** | Formulario de registro de cliente. |
| **/login** | Formulario de inicio de sesión. |
| **/mis-pedidos** | Estado de pedidos del cliente en sesión. |
| **/historial** | Historial de compras anteriores. 
| **/cuenta-corriente** | Consulta de saldo pendiente y movimientos. |
| **/admin** | Dashboard del Administrador. |
| **/admin/gestionProductos** | Listado y administración de productos. |
| **/admin/agregarProducto** | Formulario para agregar/editar producto. |
| **/admin/inventario** | Control de stock y alertas administrativas. |
| **/admin/gestionPedidos** | Consulta y filtro de pedidos.
| **/admin/gestionUsuarios** | Listado y CRUD de usuarios. |
| **/admin/formUsuario** | Formulario para agregar/editar usuarios. |
| **/admin/gestionReportes** | Reportes de ventas, ticket promedio e indicadores. |
| **/vendedor** | Inventario para personal de venta. |
| **/vendedor/productos** | Inventario para personal de venta. |

---

## Suite de Pruebas Unitarias

El proyecto incluye 30 casos de prueba unitarios ejecutados de forma automatizada con Karma y ChromeHeadless:

* Módulo Tienda y Carrito (10 pruebas - Daniel Pinto): Valida lectura de catálogo, alta/modificación/eliminación de ítems en carrito, persistencia local, restricciones de límite de stock y descuento de inventario tras compras con débito o crédito.

* Módulo Acceso, Formularios y Cliente (10 pruebas - Benjamín Catalán): Valida inicio de sesión, credenciales incorrectas, registro de usuario, control de correo duplicado/dominios autorizados, formulario de contacto y renderizado de vistas del cliente (Mis Pedidos, Historial y Cuenta Corriente).

* Módulo Administrador e Inventario (10 pruebas - Eduardo Sagredo): Valida CRUD de productos, control de código único, cálculo automático de estados de stock (Disponible, Stock bajo, Sin stock), alta de usuarios con roles (Vendedor / Administrador), filtrado de pedidos y comprobación de zonas de cobertura.

---

## Equipo de Desarrollo

* Daniel Pinto
* Benjamín Catalán
* Eduardo Sagredo
