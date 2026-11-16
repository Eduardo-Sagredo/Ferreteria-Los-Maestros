package cl.duoc.ferreteria.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioResponseDTO {

    private UUID id;
    private String rut;
    private String nombre;
    private String apellidos;
    private String correo;
    private String estado;
    private List<String> roles;
}
