package cl.duoc.ferreteria.backend.mapper;

import cl.duoc.ferreteria.backend.dto.RegistroRequestDTO;
import cl.duoc.ferreteria.backend.dto.UsuarioResponseDTO;
import cl.duoc.ferreteria.backend.model.Usuario;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserMapper {

    public UsuarioResponseDTO toResponseDTO(Usuario usuario) {

        if (usuario == null) {
            return null;
        }

        List<String> roles = usuario.getRoles() == null
                ? List.of()
                : usuario.getRoles()
                        .stream()
                        .map(rol -> rol.getNombre().name())
                        .toList();

        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getRut(),
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getCorreo(),
                usuario.getEstado(),
                roles
        );
    }

    public Usuario toEntity(RegistroRequestDTO dto) {

        if (dto == null) {
            return null;
        }

        Usuario usuario = new Usuario();

        usuario.setRut(dto.getRut());
        usuario.setNombre(dto.getNombre());
        usuario.setApellidos(dto.getApellidos());
        usuario.setCorreo(dto.getCorreo());
        usuario.setContrasena(dto.getContrasena());

        if (dto.getEstado() != null) {
            usuario.setEstado(
                    dto.getEstado()
                            ? "ACTIVO"
                            : "INACTIVO"
            );
        }

        return usuario;
    }
}