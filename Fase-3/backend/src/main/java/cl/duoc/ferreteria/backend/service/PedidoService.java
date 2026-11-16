package cl.duoc.ferreteria.backend.service;

import cl.duoc.ferreteria.backend.dto.PedidoRequestDTO;
import cl.duoc.ferreteria.backend.dto.PedidoResponseDTO;
import cl.duoc.ferreteria.backend.mapper.PedidoMapper;
import cl.duoc.ferreteria.backend.model.DetallePedido;
import cl.duoc.ferreteria.backend.model.Pedido;
import cl.duoc.ferreteria.backend.model.Producto;
import cl.duoc.ferreteria.backend.repository.PedidoRepository;
import cl.duoc.ferreteria.backend.repository.ProductoRepository;
import cl.duoc.ferreteria.backend.repository.userRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;
    private final userRepository userRepository;
    private final PedidoMapper pedidoMapper;

    public PedidoResponseDTO crearPedido(PedidoRequestDTO dto){
        if (dto.getItems() == null || dto.getItems().isEmpty()) {
            throw new RuntimeException("El carrito está vacío.");
        }

        Pedido pedido = new Pedido();
        long correlativo = pedidoRepository.count() + 1;
        pedido.setNumeroPedido(String.format("PED-%05d", correlativo));
        pedido.setClienteNombre(resolverNombreCliente(dto.getClienteNombre()));
        pedido.setFecha(LocalDateTime.now());
        pedido.setEntrega((dto.getEntrega() != null && !dto.getEntrega().isBlank()) ? dto.getEntrega() : "Retiro");
        pedido.setEstado("Pendiente");
        pedido.setMetodoPago(dto.getMetodoPago());

        int totalCalculado = 0;
        List<DetallePedido> detalles = new ArrayList<>();

        for (PedidoRequestDTO.ItemPedidoDTO item : dto.getItems()) {
            Producto producto = productoRepository.findById(item.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + item.getProductoId()));

            if (producto.getStockActual() < item.getCantidad()) {
                throw new RuntimeException("Stock insuficiente para: " + producto.getNombre());
            }

            producto.setStockActual(producto.getStockActual() - item.getCantidad());
            productoRepository.save(producto);

            DetallePedido detalle = new DetallePedido();
            detalle.setPedido(pedido);
            detalle.setProducto(producto);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            detalles.add(detalle);
            totalCalculado += producto.getPrecio() * item.getCantidad();
        }

        pedido.setTotal(totalCalculado);
        pedido.setDetalles(detalles);

        Pedido guardado = pedidoRepository.save(pedido);
        return pedidoMapper.toResponseDTO(guardado);
    }

    private String resolverNombreCliente(String nombreEnviado) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
            return userRepository.findByCorreo(auth.getName())
                    .map(u -> (u.getNombre() + " " + u.getApellidos()).trim())
                    .orElse(auth.getName());
        }
        if (nombreEnviado != null && !nombreEnviado.isBlank()) {
            return nombreEnviado.trim();
        }
        return "Cliente Invitado";
    }

    public List<PedidoResponseDTO> obtenerTodos() {
        return pedidoRepository.findAllByOrderByFechaDesc().stream()
                .map(pedidoMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<PedidoResponseDTO> obtenerMisPedidos() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            return List.of();
        }

        String nombreCliente = userRepository.findByCorreo(auth.getName())
                .map(u -> (u.getNombre() + " " + u.getApellidos()).trim())
                .orElse(auth.getName());

        return pedidoRepository.findByClienteNombreIgnoreCaseOrderByFechaDesc(nombreCliente).stream()
                .map(pedidoMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}