package cl.duoc.ferreteria.backend.repository;

import cl.duoc.ferreteria.backend.model.Producto;

import jakarta.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductoRepository
        extends JpaRepository<Producto, Long> {

    boolean existsByCodigo(String codigo);

    Optional<Producto> findByCodigo(String codigo);

    // Busca y bloquea un producto mientras se procesa una compra
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Producto p WHERE p.id = :id")
    Optional<Producto> findByIdParaCompra(@Param("id") Long id);
}