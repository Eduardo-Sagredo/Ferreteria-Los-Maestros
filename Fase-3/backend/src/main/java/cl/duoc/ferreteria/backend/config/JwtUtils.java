package cl.duoc.ferreteria.backend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // Clave secreta para firmar los tokens (mínimo 256 bits para HMAC-SHA256)
    @Value("${ferreteria.app.jwtSecret:FerreteriaLosMaestrosSecretKey2026ParaTokenJWTSuperSeguro123456}")
    private String jwtSecret;

    // Tiempo de expiración del token (24 horas en milisegundos)
    @Value("${ferreteria.app.jwtExpirationMs:86400000}")
    private int jwtExpirationMs;

    private Key getSigningKey() {
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Generar Token JWT a partir de la autenticación del usuario
    public String generarToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername()) // Guardamos el correo en el subject
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Extraer el correo (Subject) desde un Token JWT
    public String obtenerCorreoDelToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Validar si un Token JWT es auténtico y no ha expirado
    public boolean validarToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            System.err.println("Firma JWT inválida: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.err.println("El token JWT ha expirado: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.err.println("Token JWT no soportado: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.err.println("La cadena claims del JWT está vacía: " + e.getMessage());
        }
        return false;
    }


}
