package cl.duoc.ferreteria.backend.mapper;

import cl.duoc.ferreteria.backend.dto.RegistroRequestDTO;
import cl.duoc.ferreteria.backend.dto.UsuarioResponseDTO;
import cl.duoc.ferreteria.backend.model.Rol;
import cl.duoc.ferreteria.backend.model.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UsuarioResponseDTO toResponseDTO(Usuario usuario);

    Usuario toEntity(RegistroRequestDTO dto);

    default String mapRol(Rol rol) {
        if (rol == null) {
            return null;
        }
        return rol.getNombre().name();
    }
}
