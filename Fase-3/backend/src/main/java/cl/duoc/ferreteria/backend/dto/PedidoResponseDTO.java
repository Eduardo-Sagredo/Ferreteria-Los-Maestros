package cl.duoc.ferreteria.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PedidoResponseDTO {
    private UUID id;
    private String numeroPedido;
    private String cliente;
    private String fecha;
    private Integer total;
    private String entrega;
    private String estado;
    private List<ProductoDetalleDTO> productos;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductoDetalleDTO {
        private String nombre;
        private Integer cantidad;
    }
}
