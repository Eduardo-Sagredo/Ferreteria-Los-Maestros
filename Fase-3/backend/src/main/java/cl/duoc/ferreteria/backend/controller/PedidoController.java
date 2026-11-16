package cl.duoc.ferreteria.backend.controller;

import cl.duoc.ferreteria.backend.dto.PedidoRequestDTO;
import cl.duoc.ferreteria.backend.dto.PedidoResponseDTO;
import cl.duoc.ferreteria.backend.service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
@Tag(name = "Pedidos", description = "Endpoints para administracion y consultas de pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    @Operation(summary = "Crear pedido")
    @PostMapping
    public ResponseEntity<PedidoResponseDTO> crearPedido(@RequestBody PedidoRequestDTO requestDTO){
        PedidoResponseDTO creado = pedidoService.crearPedido(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @Operation(summary = "Obtener todos los pedidos")
    @GetMapping
    public ResponseEntity<List<PedidoResponseDTO>> listarPedidos() {
        return ResponseEntity.ok(pedidoService.obtenerTodos());
    }

}
