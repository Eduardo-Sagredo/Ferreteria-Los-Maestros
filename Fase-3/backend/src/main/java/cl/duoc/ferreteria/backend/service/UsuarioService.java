package cl.duoc.ferreteria.backend.service;

import cl.duoc.ferreteria.backend.dto.RegistroRequestDTO;
import cl.duoc.ferreteria.backend.dto.UsuarioResponseDTO;
import cl.duoc.ferreteria.backend.mapper.UserMapper;
import cl.duoc.ferreteria.backend.model.Usuario;
import cl.duoc.ferreteria.backend.repository.userRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioService implements UserDetailsService{

    private final userRepository userRepository;
    private final UserMapper usuarioMapper;

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

        usuario.setRut(dto.getRut());
        usuario.setNombre(dto.getNombre());
        usuario.setApellidos(dto.getApellidos());
        usuario.setCorreo(dto.getCorreo());

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
