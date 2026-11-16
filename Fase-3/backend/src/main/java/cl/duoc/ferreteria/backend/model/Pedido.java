package cl.duoc.ferreteria.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PEDIDOS")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "NUMERO_PEDIDO", unique = true, nullable = false, length = 20)
    private String numeroPedido;

    @Column(name = "CLIENTE_NOMBRE", nullable = false, length = 150)
    private String clienteNombre;

    @Column(name = "FECHA", nullable = false)
    private LocalDateTime fecha;

    @Column(name = "TOTAL", nullable = false)
    private Integer total;

    @Column(name = "ENTREGA", nullable = false, length = 30)
    private String entrega;

    @Column(name = "ESTADO", nullable = false, length = 30)
    private String estado;

    @Column(name = "METODO_PAGO", length = 30)
    private String metodoPago;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallePedido> detalles = new ArrayList<>();
}
