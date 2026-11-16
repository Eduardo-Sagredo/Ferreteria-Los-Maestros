package cl.duoc.ferreteria.backend.dto;

import cl.duoc.ferreteria.backend.model.Pedido;

import java.time.LocalDateTime;
import java.util.List;

public record PedidoResponse(
        Long id,
        String cliente,
        LocalDateTime fechaPedido,
        String estado,
        Integer total,
        List<DetalleResponse> detalles
) {

    public static PedidoResponse desde(Pedido pedido) {

        List<DetalleResponse> detalles = pedido.getDetalles()
                .stream()
                .map(detalle -> new DetalleResponse(
                        detalle.getProducto().getId(),
                        detalle.getProducto().getNombre(),
                        detalle.getCantidad(),
                        detalle.getPrecioUnitario(),
                        detalle.getSubtotal()
                ))
                .toList();

        String cliente = pedido.getUsuario().getNombre()
                + " " + pedido.getUsuario().getApellidos();

        return new PedidoResponse(
                pedido.getId(),
                cliente,
                pedido.getFechaPedido(),
                pedido.getEstado(),
                pedido.getTotal(),
                detalles
        );
    }

    public record DetalleResponse(
            Long productoId,
            String nombre,
            Integer cantidad,
            Integer precioUnitario,
            Integer subtotal
    ) {}
}