# Ferretería Los Maestros


Ferretería Los Maestros es una aplicación web desarrollada para un negocio familiar. El proyecto busca solucionar problemas actuales del negocio, como las consultas de stock por teléfono, inventarios desactualizados en planillas Excel y la gestión manual de cuentas corrientes.

Esta primera versión corresponde a la etapa de Desarrollo Frontend del curso DSY1104-Desarrollo FullStack II.

---

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

## Equipo de Desarrollo

Proyecto desarrollado para la evaluación parcial N.º 1 por el siguiente equipo de trabajo:

* **Daniel Pinto**
* **Eduardo Sagredo**
* **Benjamin Catalan**
