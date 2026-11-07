package cl.duoc.ferreteria.backend.config;

import cl.duoc.ferreteria.backend.service.UsuarioService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.flywaydb.core.internal.util.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UsuarioService usuarioService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            // 1. Extraer el token de la cabecera Authorization: Bearer <token>
            String jwt = parseJwt(request);

            // 2. Validar que el token exista y sea auténtico
            if (jwt != null && jwtUtils.validarToken(jwt)) {
                String correo = jwtUtils.obtenerCorreoDelToken(jwt);

                // 3. Cargar los detalles y roles del usuario desde la base de datos
                UserDetails userDetails = usuarioService.loadUserByUsername(correo);

                // 4. Crear el objeto de autenticación para Spring Security
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 5. Guardar el usuario autenticado en el contexto de la aplicación
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("No se pudo establecer la autenticación del usuario: {}", e);
        }

        // Continuar con la cadena de filtros de la solicitud
        filterChain.doFilter(request, response);
    }

    // Método auxiliar para extraer el Bearer Token del encabezado
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7); // Remueve los primeros 7 caracteres ("Bearer ")
        }

        return null;
    }
}
