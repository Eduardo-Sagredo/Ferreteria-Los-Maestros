package cl.duoc.ferreteria.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "PEDIDOS")
@Getter
@Setter
@NoArgsConstructor
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIO_ID", nullable = false)
    private Usuario usuario;

    @Column(name = "FECHA_PEDIDO", nullable = false)
    private LocalDateTime fechaPedido;

    @Column(name = "ESTADO", nullable = false)
    private String estado;

    @Column(name = "TOTAL", nullable = false)
    private Integer total;

    @OneToMany(
        mappedBy = "pedido",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<DetallePedido> detalles = new ArrayList<>();

    @PrePersist
    public void antesDeGuardar() {
        if (fechaPedido == null) {
            fechaPedido = LocalDateTime.now();
        }
    }
}