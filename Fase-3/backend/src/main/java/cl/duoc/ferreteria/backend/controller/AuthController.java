package cl.duoc.ferreteria.backend.controller;

import cl.duoc.ferreteria.backend.dto.AuthResponseDTO;
import cl.duoc.ferreteria.backend.dto.LoginRequestDTO;
import cl.duoc.ferreteria.backend.dto.RegistroRequestDTO;
import cl.duoc.ferreteria.backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Login", description = "Endpoints para el registro y login de usuarios")
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "Logearse en la web")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginDTO) {
        try {
            AuthResponseDTO responseDTO = authService.login(loginDTO);
            return ResponseEntity.ok(responseDTO);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Credenciales incorrectas");
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error del servidor: " + e.getMessage());
        }
    }

    @Operation(summary = "Registrarse en la web")
    @PostMapping("/register")
    public ResponseEntity<String> registrar(@RequestBody RegistroRequestDTO registroRequestDTO){
        try {
            String mensaje = authService.registrar(registroRequestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(mensaje);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
