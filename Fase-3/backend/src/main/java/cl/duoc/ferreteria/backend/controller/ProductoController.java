package cl.duoc.ferreteria.backend.controller;

import cl.duoc.ferreteria.backend.dto.ProductoRequest;
import cl.duoc.ferreteria.backend.dto.ProductoResponse;
import cl.duoc.ferreteria.backend.service.ProductoService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@Tag(
    name = "Productos",
    description = "Operaciones para la gestión de productos"
)
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    @Operation(
        summary = "Listar productos",
        description = "Obtiene todos los productos registrados"
    )
    public ResponseEntity<List<ProductoResponse>> listarProductos() {

        return ResponseEntity.ok(
                productoService.listarProductos()
        );
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Buscar producto",
        description = "Obtiene un producto según su ID"
    )
    public ResponseEntity<ProductoResponse> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productoService.buscarPorId(id)
        );
    }

    @PostMapping
    @Operation(
        summary = "Crear producto",
        description = "Registra un nuevo producto"
    )
    public ResponseEntity<ProductoResponse> crearProducto(
            @Valid @RequestBody ProductoRequest request) {

        ProductoResponse producto =
                productoService.crearProducto(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(producto);
    }

    @PutMapping("/{id}")
    @Operation(
        summary = "Actualizar producto",
        description = "Actualiza los datos de un producto existente"
    )
    public ResponseEntity<ProductoResponse> actualizarProducto(
            @PathVariable Long id,
            @Valid @RequestBody ProductoRequest request) {

        return ResponseEntity.ok(
                productoService.actualizarProducto(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    @Operation(
        summary = "Eliminar producto",
        description = "Elimina un producto según su ID"
    )
    public ResponseEntity<Void> eliminarProducto(
            @PathVariable Long id) {

        productoService.eliminarProducto(id);

        return ResponseEntity.noContent().build();
    }
}