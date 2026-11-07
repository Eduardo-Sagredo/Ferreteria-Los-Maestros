package cl.duoc.ferreteria.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistroRequestDTO {

    private String rut;
    private String nombre;
    private String apellidos;
    private String correo;
    private String contrasena;

}
