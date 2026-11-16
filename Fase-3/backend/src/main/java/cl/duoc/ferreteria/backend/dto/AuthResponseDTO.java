package cl.duoc.ferreteria.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDTO {
    private String token;
    private String type = "Bearer";
    private UUID id;
    private String rut;
    private String nombre;
    private String apellidos;
    private String correo;
    private String estado;
    private List<String> roles;

    public AuthResponseDTO(String token, UUID id, String rut, String nombre, String apellidos, String correo, String estado, List<String> roles) {
        this.token = token;
        this.type = "Bearer";
        this.id = id;
        this.rut = rut;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.estado = estado;
        this.roles = roles;
    }
}
