package cl.duoc.ferreteria.backend.repository;

import cl.duoc.ferreteria.backend.enums.RolEnum;
import cl.duoc.ferreteria.backend.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface rolRepository extends JpaRepository<Rol, Long> {

    //Buscar un rol por su nombre Enum
    Optional<Rol> findByNombre(RolEnum nombre);
}
