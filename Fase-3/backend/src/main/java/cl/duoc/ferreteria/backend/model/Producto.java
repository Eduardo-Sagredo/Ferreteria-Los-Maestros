package cl.duoc.ferreteria.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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

    public Producto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Integer getPrecio() {
        return precio;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public Integer getStockActual() {
        return stockActual;
    }

    public void setStockActual(Integer stockActual) {
        this.stockActual = stockActual;
    }

    public Integer getStockMinimo() {
        return stockMinimo;
    }

    public void setStockMinimo(Integer stockMinimo) {
        this.stockMinimo = stockMinimo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}