package cl.duoc.ferreteria.backend.service;

import cl.duoc.ferreteria.backend.dto.RegistroRequestDTO;
import cl.duoc.ferreteria.backend.dto.UsuarioResponseDTO;
import cl.duoc.ferreteria.backend.enums.RolEnum;
import cl.duoc.ferreteria.backend.mapper.UserMapper;
import cl.duoc.ferreteria.backend.model.Rol;
import cl.duoc.ferreteria.backend.model.Usuario;
import cl.duoc.ferreteria.backend.repository.rolRepository;
import cl.duoc.ferreteria.backend.repository.userRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioService implements UserDetailsService{

    private final userRepository userRepository;
    private final rolRepository rolRepository;
    private final UserMapper usuarioMapper;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Usuario usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con correo: " + correo));

        List<SimpleGrantedAuthority> authorities = usuario.getRoles().stream()
                .map(rol -> new SimpleGrantedAuthority(rol.getNombre().name()))
                .collect(Collectors.toList());

        return new User(
                usuario.getCorreo(),
                usuario.getContrasena(),
                authorities
        );
    }

    // Método para listar todos los usuarios
    public List<UsuarioResponseDTO> obtenerTodos() {
        return userRepository.findAll().stream()
                .map(usuarioMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    //Obtener usuario por id
    public UsuarioResponseDTO obtenerPorId(UUID id) {
        Usuario usuario = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return usuarioMapper.toResponseDTO(usuario);
    }

    //Editar usuario
    public UsuarioResponseDTO actualizar(UUID id, RegistroRequestDTO dto) {
        Usuario usuario = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (dto.getRut() != null && !dto.getRut().isBlank()){
            usuario.setRut(dto.getRut());
        }
        usuario.setNombre(dto.getNombre());
        usuario.setApellidos(dto.getApellidos());
        usuario.setCorreo(dto.getCorreo());

        if (dto.getContrasena() != null && !dto.getContrasena().isBlank()) {
            usuario.setContrasena(passwordEncoder.encode(dto.getContrasena()));
        }

        if (dto.getEstado() != null) {
            usuario.setEstado(dto.getEstado() ? "ACTIVO" : "INACTIVO");
        }

        if (dto.getRol() != null && !dto.getRol().isBlank()) {
            String nombreRolStr = dto.getRol().startsWith("ROLE_")
                    ? dto.getRol()
                    : "ROLE_" + dto.getRol().toUpperCase();

            RolEnum rolEnum = RolEnum.valueOf(nombreRolStr);

            Rol rolEntidad = rolRepository.findByNombre(rolEnum)
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado: " + nombreRolStr));

            Set<Rol> roles = new HashSet<>();
            roles.add(rolEntidad);
            usuario.setRoles(roles);
        }

        Usuario actualizado = userRepository.save(usuario);
        return usuarioMapper.toResponseDTO(actualizado);

    }

    //Eliminar usuario
    public void eliminar(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        userRepository.deleteById(id);
    }

}
