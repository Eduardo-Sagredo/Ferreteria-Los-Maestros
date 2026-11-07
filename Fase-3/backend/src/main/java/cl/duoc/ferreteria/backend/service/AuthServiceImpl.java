package cl.duoc.ferreteria.backend.service;

import cl.duoc.ferreteria.backend.config.JwtUtils;
import cl.duoc.ferreteria.backend.dto.AuthResponseDTO;
import cl.duoc.ferreteria.backend.dto.LoginRequestDTO;
import cl.duoc.ferreteria.backend.dto.RegistroRequestDTO;
import cl.duoc.ferreteria.backend.enums.RolEnum;
import cl.duoc.ferreteria.backend.model.Rol;
import cl.duoc.ferreteria.backend.model.Usuario;
import cl.duoc.ferreteria.backend.repository.rolRepository;
import cl.duoc.ferreteria.backend.repository.userRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl {

    private final AuthenticationManager authenticationManager;
    private final userRepository userRepository;
    private final rolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;


    public AuthResponseDTO login(LoginRequestDTO loginDto) {
        // 1. Autenticar correo y contraseña con el AuthenticationManager
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getCorreo(), loginDto.getContrasena())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 2. Generar token JWT
        String token = jwtUtils.generarToken(authentication);

        // 3. Obtener datos del usuario autenticado para la respuesta
        Usuario usuario = userRepository.findByCorreo(loginDto.getCorreo())
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new AuthResponseDTO(
                token,
                usuario.getId(),
                usuario.getRut(),
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getCorreo(),
                usuario.getEstado(),
                roles
        );
    }


    public String registrar(RegistroRequestDTO registroDto) {
        // 1. Validar que el correo no esté duplicado
        if (userRepository.existsByCorreo(registroDto.getCorreo())) {
            throw new RuntimeException("Error: El correo ya está registrado.");
        }

        // 2. Asignar rol por defecto (ROLE_CLIENTE)
        Set<Rol> roles = new HashSet<>();
        Rol rolCliente = rolRepository.findByNombre(RolEnum.ROLE_CLIENTE)
                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
        roles.add(rolCliente);

        // 3. Crear nuevo usuario con contraseña encriptada (BCrypt)
        Usuario usuario = Usuario.builder()
                .nombre(registroDto.getNombre())
                .correo(registroDto.getCorreo())
                .contrasena(passwordEncoder.encode(registroDto.getContrasena()))
                .estado("Activo")
                .roles(roles)
                .build();

        userRepository.save(usuario);
        return "Usuario registrado con éxito.";
    }


}
