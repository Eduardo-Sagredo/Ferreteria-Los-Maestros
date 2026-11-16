package cl.duoc.ferreteria.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PRODUCTOS")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
        name = "CODIGO",
        nullable = false,
        unique = true,
        length = 30
    )
    private String codigo;

    @Column(
        name = "NOMBRE",
        nullable = false,
        length = 150
    )
    private String nombre;

    @Column(
        name = "CATEGORIA",
        nullable = false,
        length = 50
    )
    private String categoria;

    @Column(
        name = "PRECIO",
        nullable = false
    )
    private Integer precio;

    @Column(
        name = "STOCK_ACTUAL",
        nullable = false
    )
    private Integer stockActual;

    @Column(
        name = "STOCK_MINIMO",
        nullable = false
    )
    private Integer stockMinimo;

    @Column(
        name = "ESTADO",
        nullable = false,
        length = 30
    )
    private String estado;

    @Column(
        name = "IMAGEN",
        length = 500
    )
    private String imagen;

    @Column(
        name = "DESCRIPCION",
        length = 1000
    )
    private String descripcion;
}