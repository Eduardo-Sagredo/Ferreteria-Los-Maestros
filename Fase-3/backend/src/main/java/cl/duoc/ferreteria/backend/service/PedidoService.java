package cl.duoc.ferreteria.backend.service;

import cl.duoc.ferreteria.backend.dto.CrearPedidoRequest;
import cl.duoc.ferreteria.backend.dto.PedidoResponse;
import cl.duoc.ferreteria.backend.model.DetallePedido;
import cl.duoc.ferreteria.backend.model.Pedido;
import cl.duoc.ferreteria.backend.model.Producto;
import cl.duoc.ferreteria.backend.model.Usuario;
import cl.duoc.ferreteria.backend.repository.PedidoRepository;
import cl.duoc.ferreteria.backend.repository.ProductoRepository;
import cl.duoc.ferreteria.backend.repository.userRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;
import java.util.Comparator;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;
    private final userRepository usuarioRepository;

    // 1. CREAR PEDIDO Y DESCONTAR STOCK

    @Transactional
    public Pedido crearPedido(CrearPedidoRequest solicitud, String correo) {

        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Usuario no encontrado"
                ));

        if (solicitud == null || solicitud.productos() == null
                || solicitud.productos().isEmpty()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El pedido debe contener productos"
            );
        }

        Pedido pedido = new Pedido();

        pedido.setUsuario(usuario);
        pedido.setEstado("PENDIENTE");

        int total = 0;

        for (CrearPedidoRequest.Item item : solicitud.productos()) {

            if (item == null || item.productoId() == null
                    || item.cantidad() == null || item.cantidad() < 1) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Datos del producto invalidos"
                );
            }

            Producto producto = productoRepository
                    .findByIdParaCompra(item.productoId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Producto no encontrado"
                    ));

            int cantidad = item.cantidad();

            // Verificar disponibilidad
            if (producto.getStockActual() < cantidad) {

                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Stock insuficiente para: " + producto.getNombre()
                );
            }

            // Descontar stock
            int nuevoStock = producto.getStockActual() - cantidad;

            producto.setStockActual(nuevoStock);

            // Actualizar disponibilidad del producto
            if (nuevoStock == 0) {

                producto.setEstado("Sin stock");

            } else if (nuevoStock <= producto.getStockMinimo()) {

                producto.setEstado("Stock bajo");

            } else {

                producto.setEstado("Disponible");
            }

            // Calcular subtotal
            int subtotal = Math.multiplyExact(
                    producto.getPrecio(),
                    cantidad
            );

            // Crear detalle
            DetallePedido detalle = new DetallePedido();

            detalle.setPedido(pedido);
            detalle.setProducto(producto);
            detalle.setCantidad(cantidad);
            detalle.setPrecioUnitario(producto.getPrecio());
            detalle.setSubtotal(subtotal);

            pedido.getDetalles().add(detalle);

            // Acumular total
            total = Math.addExact(total, subtotal);
        }

        pedido.setTotal(total);

        return pedidoRepository.save(pedido);
    }

    // 2. LISTAR TODOS LOS PEDIDOS

    @Transactional(readOnly = true)
    public List<PedidoResponse> listarPedidos() {

        return pedidoRepository.findAll()
                .stream()
                .map(PedidoResponse::desde)
                .toList();
    }

    // 3. BUSCAR PEDIDO POR ID

    @Transactional(readOnly = true)
    public PedidoResponse obtenerPedido(Long id) {

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Pedido no encontrado"
                ));

        return PedidoResponse.desde(pedido);
    }

    // 4. CAMBIAR ESTADO DE UN PEDIDO

    @Transactional
    public PedidoResponse cambiarEstado(Long id, String nuevoEstado) {

        // Validar que se haya enviado un estado
        if (nuevoEstado == null || nuevoEstado.isBlank()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El estado es obligatorio"
            );
        }

        // Normalizar estado
        String estadoNormalizado = nuevoEstado
                .trim()
                .toUpperCase(Locale.ROOT);

        // Validar los estados permitidos
        if (!List.of(
                "PENDIENTE",
                "EN_PREPARACION",
                "ENTREGADO",
                "CANCELADO"
        ).contains(estadoNormalizado)) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Estado no valido"
            );
        }

        // Buscar y bloquear el pedido
        Pedido pedido = pedidoRepository.findByIdParaActualizar(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Pedido no encontrado"
                ));

        String estadoActual = pedido.getEstado();

        // Evitar repetir un cambio
        if (estadoActual.equals(estadoNormalizado)) {

            return PedidoResponse.desde(pedido);
        }

        // Comprobar si se permite el cambio
        boolean cambioPermitido = switch (estadoActual) {

            case "PENDIENTE" ->
                    estadoNormalizado.equals("EN_PREPARACION")
                    || estadoNormalizado.equals("CANCELADO");

            case "EN_PREPARACION" ->
                    estadoNormalizado.equals("ENTREGADO")
                    || estadoNormalizado.equals("CANCELADO");

            default -> false;
        };

        if (!cambioPermitido) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "No se permite cambiar el estado del pedido"
            );
        }

        // 5. DEVOLVER STOCK SI SE CANCELA

        if (estadoNormalizado.equals("CANCELADO")) {

            var detallesOrdenados = pedido.getDetalles()
                    .stream()
                    .sorted(Comparator.comparing(
                            detalle -> detalle.getProducto().getId()
                    ))
                    .toList();

            for (DetallePedido detalle : detallesOrdenados) {

                Producto producto = productoRepository
                        .findByIdParaCompra(
                                detalle.getProducto().getId()
                        )
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Producto no encontrado"
                        ));

                // Restaurar unidades
                int stockRestaurado = Math.addExact(
                        producto.getStockActual(),
                        detalle.getCantidad()
                );

                producto.setStockActual(stockRestaurado);

                // Actualizar estado del inventario
                if (stockRestaurado == 0) {

                    producto.setEstado("Sin stock");

                } else if (stockRestaurado <= producto.getStockMinimo()) {

                    producto.setEstado("Stock bajo");

                } else {

                    producto.setEstado("Disponible");
                }
            }
        }

        // 6. GUARDAR NUEVO ESTADO

        pedido.setEstado(estadoNormalizado);

        pedidoRepository.save(pedido);

        return PedidoResponse.desde(pedido);
    }
}