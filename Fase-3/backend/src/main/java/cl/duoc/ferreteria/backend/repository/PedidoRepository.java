package cl.duoc.ferreteria.backend.repository;

import cl.duoc.ferreteria.backend.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, UUID> {

    List<Pedido> findAllByOrderByFechaDesc();
}
