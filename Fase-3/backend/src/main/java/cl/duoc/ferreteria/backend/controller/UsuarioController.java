package cl.duoc.ferreteria.backend.controller;

import cl.duoc.ferreteria.backend.dto.RegistroRequestDTO;
import cl.duoc.ferreteria.backend.dto.UsuarioResponseDTO;
import cl.duoc.ferreteria.backend.service.AuthService;
import cl.duoc.ferreteria.backend.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
@Tag(name = "Usuarios", description = "Endpoints para administracion y consultas de usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final AuthService authService;


    //Traer todos los usuarios
    @Operation(summary = "Obtener todos los usuarios")
    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.obtenerTodos());
    }

    //Traer un usuario por su id
    @Operation(summary = "Buscar un usuario por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> obtenerUsuarioPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(usuarioService.obtenerPorId(id));
    }

    //Crear un nuevo usuario
    @Operation(summary = "Registrar un nuevo usuario")
    @PostMapping
    public ResponseEntity<String> crearUsuario(@RequestBody RegistroRequestDTO dto) {
        String mensaje = authService.registrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(mensaje);
    }

    //Editar un usuario
    @Operation(summary = "Editar un usuario ya existente")
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> actualizarUsuario(@PathVariable UUID id, @RequestBody RegistroRequestDTO dto) {
        return ResponseEntity.ok(usuarioService.actualizar(id, dto));
    }

    //Borrar un usuario
    @Operation(summary = "Eliminar un usuario")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable UUID id) {
        usuarioService.eliminar(id);
        return ResponseEntity.ok("Usuario eliminado correctamente");
    }

}
