package cl.duoc.ferreteria.backend.repository;

import cl.duoc.ferreteria.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface userRepository extends JpaRepository<Usuario, UUID> {

    //Buscar usuario por su correo
    Optional<Usuario> findByCorreo(String correo);

    //Validar si un correo existe en la bd
    Boolean existsByCorreo(String correo);


}
