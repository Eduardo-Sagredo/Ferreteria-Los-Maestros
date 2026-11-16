package cl.duoc.ferreteria.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class PedidoRequestDTO {
    private String clienteNombre;
    private String entrega;
    private String metodoPago;
    private List<ItemPedidoDTO> items;

    @Data
    public static class ItemPedidoDTO {
        private Long productoId;
        private Integer cantidad;
    }
}
