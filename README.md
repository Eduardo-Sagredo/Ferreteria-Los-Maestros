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

## Fase 3 — Integración FullStack con Spring Boot, Oracle y Seguridad JWT

En esta etapa, la aplicación desarrollada en React se conecta con un backend en Spring Boot y una base de datos Oracle. Se reemplaza parte de la información simulada de la fase anterior por servicios API REST, incorporando autenticación JWT y operaciones de gestión de productos, usuarios y pedidos.

---

## Tecnologías Utilizadas

- **Frontend**: React 19, Vite 8, React Router DOM 7, Bootstrap 5 y CSS3.
- **Backend**: Java 21, Spring Boot, Maven, Spring Web y Spring Data JPA.
- **Base de Datos**: Oracle Database, Hibernate y Flyway para las migraciones.
- **Comunicación**: Axios, API REST y respuestas en formato JSON.
- **Seguridad**: Spring Security, tokens JWT, roles de usuario y cifrado BCrypt.
- **Documentación API**: Swagger UI y OpenAPI.
- **Pruebas**: Jasmine y Karma en frontend; JUnit en backend.
- **Control de Versiones y Despliegue**: GitHub, Vercel y AWS EC2.

---

## Arquitectura e Integración

La aplicación utiliza una arquitectura separada en tres capas:

1. **Frontend (React)**: Presenta las vistas, formularios, catálogo, carrito y opciones según la sesión del usuario.
2. **Backend (Spring Boot)**: Expone endpoints REST, procesa solicitudes y aplica la lógica de negocio.
3. **Base de Datos (Oracle)**: Almacena la información de productos, usuarios, roles y pedidos mediante JPA.

La comunicación se realiza desde React hacia Spring Boot mediante Axios. Las operaciones protegidas envían el token JWT en la cabecera `Authorization`.

---

## Manejo del Estado y Persistencia

- Los productos, usuarios y pedidos se consultan o registran mediante los servicios REST del backend, según el módulo.
- El carrito conserva temporalmente sus artículos en el navegador y consulta el stock disponible al realizar la compra.
- El inicio de sesión almacena el token y la información del usuario para mantener la sesión al recargar la página.
- El proyecto conserva `AppContext` y `MockDB` para funciones locales; algunas vistas administrativas y reportes todavía utilizan datos simulados.

---

## Características Principales

- **Catálogo y Detalle de Productos**: Consulta desde la API de productos, precios, categorías y existencias disponibles en Oracle.
- **Carrito y Pedidos**: Permite agregar productos, modificar cantidades, calcular totales y enviar pedidos al backend para registrar la compra y descontar stock.
- **Inicio de Sesión y Registro**: Validación de credenciales y registro de usuarios mediante endpoints de autenticación.
- **Autenticación JWT**: Generación de token al iniciar sesión e incorporación del token en las peticiones protegidas.
- **Gestión de Productos**: Operaciones de creación, consulta, actualización y eliminación mediante API REST.
- **Gestión de Usuarios**: Consulta, edición y eliminación de cuentas desde el módulo de administración, conectado al backend.
- **Documentación de Endpoints**: Consulta y prueba de los servicios disponibles mediante Swagger UI.

### Módulos de Administración e Inventario

- Panel de administrador con accesos a productos, usuarios, inventario, pedidos y reportes.
- Gestión del catálogo y de los niveles de stock mediante operaciones del backend.
- Vista de vendedor para consultar inventario y revisar disponibilidad de artículos.
- Interfaz de reportes e indicadores, con componentes que aún conservan información local simulada.

---

## Perfiles de Usuario

1. **Administrador**: Accede a las pantallas de gestión de productos, usuarios, pedidos, inventario y reportes.
2. **Vendedor / Empleado**: Accede a la vista de inventario y a las funciones de productos habilitadas en su interfaz.
3. **Cliente**: Puede consultar el catálogo, agregar productos al carrito, registrarse, iniciar sesión y realizar pedidos.

El frontend utiliza rutas protegidas para mostrar vistas según el rol; el backend incorpora Spring Security para gestionar la autenticación y autorización de las solicitudes.

---

## Estructura del Sitio

| **Página o sección** | **Propósito** |
| -------------------- | ------------- |
| **/** | Página principal con productos destacados y categorías. |
| **/productos** y **/producto/:id** | Catálogo y detalle de productos consultados desde la API. |
| **/carrito** | Resumen de compra, cantidades y registro del pedido. |
| **/login** y **/registro** | Inicio de sesión y registro de clientes. |
| **/mis-pedidos** | Consulta de pedidos asociados a la sesión del cliente. |
| **/admin** | Panel principal de administración. |
| **/admin/gestionProductos** | Consulta y mantenimiento de productos. |
| **/admin/gestionUsuarios** | Administración de cuentas de usuario. |
| **/admin/gestionPedidos** | Revisión y consulta de pedidos. |
| **/admin/gestionReportes** | Vista de estadísticas y reportes. |
| **/vendedor** | Consulta de inventario para el personal de venta. |

---

## Servicios API REST

| **Módulo** | **Endpoints principales** | **Funcionalidad** |
| ---------- | ------------------------- | ----------------- |
| **Autenticación** | `POST /api/auth/login`, `POST /api/auth/register` | Iniciar sesión y registrar clientes. |
| **Productos** | `GET`, `POST`, `PUT`, `DELETE` en `/api/productos` | Consultar y administrar el catálogo. |
| **Usuarios** | `GET`, `POST`, `PUT`, `DELETE` en `/api/usuarios` | Consultar y administrar usuarios. |
| **Pedidos** | `GET`, `POST` en `/api/pedidos`, `GET /api/pedidos/mis-pedidos` | Registrar y consultar pedidos. |

El backend incluye documentación interactiva en **Swagger UI** (`/swagger-ui/index.html`).

---

## Pruebas y Verificación

La Fase 3 conserva las pruebas frontend con **Jasmine y Karma** e incluye pruebas de backend con **JUnit**. Se incorporan además endpoints documentados para realizar verificaciones manuales de integración mediante Swagger.

La ejecución integrada requiere configurar la conexión a Oracle y las variables de entorno del backend. Las pruebas unitarias existentes no sustituyen las verificaciones de seguridad, integración y funcionamiento completo.

---

## Equipo de Desarrollo

- Daniel Pinto
- Benjamín Catalán
- Eduardo Sagredo
