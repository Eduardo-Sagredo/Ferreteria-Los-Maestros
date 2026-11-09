package cl.duoc.ferreteria.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoRequest {

    @NotBlank(message = "El código es obligatorio")
    @Size(
        max = 30,
        message = "El código no puede superar los 30 caracteres"
    )
    private String codigo;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(
        max = 150,
        message = "El nombre no puede superar los 150 caracteres"
    )
    private String nombre;

    @NotBlank(message = "La categoría es obligatoria")
    @Size(
        max = 50,
        message = "La categoría no puede superar los 50 caracteres"
    )
    private String categoria;

    @NotNull(message = "El precio es obligatorio")
    @Min(
        value = 0,
        message = "El precio no puede ser negativo"
    )
    private Integer precio;

    @NotNull(message = "El stock actual es obligatorio")
    @Min(
        value = 0,
        message = "El stock actual no puede ser negativo"
    )
    private Integer stockActual;

    @NotNull(message = "El stock mínimo es obligatorio")
    @Min(
        value = 0,
        message = "El stock mínimo no puede ser negativo"
    )
    private Integer stockMinimo;

    @Size(
        max = 500,
        message = "La URL de la imagen no puede superar los 500 caracteres"
    )
    private String imagen;

    @Size(
        max = 1000,
        message = "La descripción no puede superar los 1000 caracteres"
    )
    private String descripcion;
}