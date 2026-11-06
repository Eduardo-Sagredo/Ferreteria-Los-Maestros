package cl.duoc.ferreteria.backend.repository;

import cl.duoc.ferreteria.backend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductoRepository
        extends JpaRepository<Producto, Long> {

    boolean existsByCodigo(String codigo);

    Optional<Producto> findByCodigo(String codigo);
}