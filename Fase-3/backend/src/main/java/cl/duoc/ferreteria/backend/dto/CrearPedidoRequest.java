package cl.duoc.ferreteria.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record CrearPedidoRequest(

    @NotEmpty(message = "El pedido debe contener productos")
    List<@Valid Item> productos

) {
    public record Item(

        @NotNull(message = "El producto es obligatorio")
        Long productoId,

        @NotNull(message = "La cantidad es obligatoria")
        @Min(value = 1, message = "La cantidad debe ser mayor a cero")
        Integer cantidad

    ) {}
}