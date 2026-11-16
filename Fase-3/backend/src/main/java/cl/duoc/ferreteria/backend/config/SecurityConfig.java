package cl.duoc.ferreteria.backend.config;

import cl.duoc.ferreteria.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)

                .cors(Customizer.withDefaults())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // ========================================
                        // LOGIN Y REGISTRO - ACCESO PUBLICO
                        // ========================================
                        .requestMatchers(
                                "/api/auth/**",
                                "/error"
                        ).permitAll()

                        // ========================================
                        // SWAGGER - ACCESO PUBLICO
                        // ========================================
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        // ========================================
                        // PRODUCTOS - LECTURA PUBLICA
                        // ========================================
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/productos/**"
                        ).permitAll()

                        // ========================================
                        // PRODUCTOS - CREAR
                        // ========================================
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/productos/**"
                        ).hasAnyAuthority(
                                "ROLE_ADMIN",
                                "ROLE_VENDEDOR"
                        )

                        // ========================================
                        // PRODUCTOS - ACTUALIZAR
                        // ========================================
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/productos/**"
                        ).hasAnyAuthority(
                                "ROLE_ADMIN",
                                "ROLE_VENDEDOR"
                        )

                        // ========================================
                        // PRODUCTOS - ELIMINAR
                        // ========================================
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/productos/**"
                        ).hasAnyAuthority(
                                "ROLE_ADMIN",
                                "ROLE_VENDEDOR"
                        )

                        // ========================================
                        // PEDIDOS - REGISTRAR COMPRAS
                        // Cliente y administrador
                        // ========================================
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/pedidos"
                        ).hasAnyAuthority(
                                "ROLE_CLIENTE",
                                "ROLE_ADMIN"
                        )

                        // ========================================
                        // PEDIDOS - CONSULTAR
                        // Administrador y vendedor
                        // ========================================
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/pedidos",
                                "/api/v1/pedidos/**"
                        ).hasAnyAuthority(
                                "ROLE_ADMIN",
                                "ROLE_VENDEDOR"
                        )

                        // ========================================
                        // PEDIDOS - CAMBIAR ESTADOS
                        // Solo administrador
                        // ========================================
                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/v1/pedidos/**"
                        ).hasAuthority(
                                "ROLE_ADMIN"
                        )

                        // ========================================
                        // PEDIDOS - ACTUALIZAR
                        // Solo administrador
                        // ========================================
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/pedidos/**"
                        ).hasAuthority(
                                "ROLE_ADMIN"
                        )

                        // ========================================
                        // PEDIDOS - ELIMINAR
                        // Solo administrador
                        // ========================================
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/pedidos/**"
                        ).hasAuthority(
                                "ROLE_ADMIN"
                        )

                        // ========================================
                        // PEDIDOS - BLOQUEAR OTROS ACCESOS
                        // ========================================
                        .requestMatchers(
                                "/api/v1/pedidos",
                                "/api/v1/pedidos/**",
                                "/api/pedidos/**"
                        ).denyAll()

                        // ========================================
                        // OTRAS RUTAS - REQUIEREN LOGIN
                        // ========================================
                        .anyRequest().authenticated()
                );

        // Filtro de autenticacion JWT
        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }

    // ========================================
    // ENCRIPTACION DE CONTRASENAS
    // ========================================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ========================================
    // ADMINISTRADOR DE AUTENTICACION
    // ========================================
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationProvider authenticationProvider) {

        return new ProviderManager(
                authenticationProvider
        );
    }

    // ========================================
    // PROVEEDOR DE AUTENTICACION
    // ========================================
    @Bean
    public AuthenticationProvider authenticationProvider(
            UsuarioService usuarioService) {

        DaoAuthenticationProvider authProvider =
                new DaoAuthenticationProvider(
                        usuarioService
                );

        authProvider.setPasswordEncoder(
                passwordEncoder()
        );

        return authProvider;
    }
}