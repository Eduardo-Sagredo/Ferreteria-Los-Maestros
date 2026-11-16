package cl.duoc.ferreteria.backend.controller;

import cl.duoc.ferreteria.backend.dto.CrearPedidoRequest;
import cl.duoc.ferreteria.backend.dto.PedidoResponse;
import cl.duoc.ferreteria.backend.model.Pedido;
import cl.duoc.ferreteria.backend.service.PedidoService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pedidos")
@RequiredArgsConstructor

// Documentacion Swagger
@Tag(
        name = "Pedidos",
        description = "API REST para gestionar compras y pedidos de la ferreteria"
)
@SecurityRequirement(name = "bearerAuth")

public class PedidoController {

    private final PedidoService pedidoService;

    // 1. CREAR PEDIDO

    @Operation(
            summary = "Registrar una compra",
            description = "Registra un pedido, calcula el total y descuenta el stock disponible."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Pedido creado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos invalidos"),
            @ApiResponse(responseCode = "401", description = "Usuario no autenticado"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado"),
            @ApiResponse(responseCode = "404", description = "Producto no encontrado"),
            @ApiResponse(responseCode = "409", description = "Stock insuficiente")
    })
    @PostMapping
    public ResponseEntity<PedidoCreadoResponse> crearPedido(
            @Valid @RequestBody CrearPedidoRequest solicitud,
            Authentication authentication) {

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Debes iniciar sesion para comprar"
            );
        }

        Pedido pedido = pedidoService.crearPedido(
                solicitud,
                authentication.getName()
        );

        PedidoCreadoResponse respuesta = new PedidoCreadoResponse(
                pedido.getId(),
                pedido.getEstado(),
                pedido.getTotal(),
                pedido.getFechaPedido()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(respuesta);
    }

    // 2. LISTAR PEDIDOS

    @Operation(
            summary = "Listar todos los pedidos",
            description = "Obtiene los pedidos registrados junto con sus detalles."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Pedidos obtenidos correctamente"),
            @ApiResponse(responseCode = "401", description = "Usuario no autenticado"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    @GetMapping
    public ResponseEntity<List<PedidoResponse>> listarPedidos() {

        List<PedidoResponse> pedidos = pedidoService.listarPedidos();

        return ResponseEntity.ok(pedidos);
    }

    // 3. BUSCAR PEDIDO POR ID

    @Operation(
            summary = "Consultar pedido por ID",
            description = "Obtiene la informacion y los productos de un pedido especifico."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Pedido encontrado"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado"),
            @ApiResponse(responseCode = "404", description = "Pedido no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponse> obtenerPedido(
            @PathVariable Long id) {

        PedidoResponse pedido = pedidoService.obtenerPedido(id);

        return ResponseEntity.ok(pedido);
    }

    // 4. CAMBIAR ESTADO DEL PEDIDO

    @Operation(
            summary = "Cambiar estado de un pedido",
            description = "Permite actualizar el estado del pedido. Si se cancela, restaura el stock."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Estado actualizado correctamente"),
            @ApiResponse(responseCode = "400", description = "Estado invalido"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado"),
            @ApiResponse(responseCode = "404", description = "Pedido no encontrado"),
            @ApiResponse(responseCode = "409", description = "Cambio de estado no permitido")
    })
    @PatchMapping("/{id}/estado")
    public ResponseEntity<PedidoResponse> cambiarEstado(
            @PathVariable Long id,
            @Valid @RequestBody CambiarEstadoRequest solicitud) {

        PedidoResponse pedido = pedidoService.cambiarEstado(
                id,
                solicitud.estado()
        );

        return ResponseEntity.ok(pedido);
    }

    // 5. RESPUESTA AL CREAR UN PEDIDO

    public record PedidoCreadoResponse(
            Long id,
            String estado,
            Integer total,
            LocalDateTime fechaPedido
    ) {}

    // 6. SOLICITUD PARA CAMBIAR ESTADO

    public record CambiarEstadoRequest(
            @NotBlank(message = "El estado es obligatorio")
            String estado
    ) {}
}