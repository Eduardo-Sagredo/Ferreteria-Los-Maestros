package cl.duoc.ferreteria.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoResponse {

    private Long id;

    private String codigo;

    private String nombre;

    private String categoria;

    private Integer precio;

    private Integer stockActual;

    private Integer stockMinimo;

    private String estado;

    private String imagen;

    private String descripcion;
}