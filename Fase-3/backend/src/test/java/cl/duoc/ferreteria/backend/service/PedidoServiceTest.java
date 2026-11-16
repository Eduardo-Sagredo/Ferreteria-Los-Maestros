package cl.duoc.ferreteria.backend.service;

import cl.duoc.ferreteria.backend.dto.CrearPedidoRequest;
import cl.duoc.ferreteria.backend.dto.PedidoResponse;

import cl.duoc.ferreteria.backend.model.DetallePedido;
import cl.duoc.ferreteria.backend.model.Pedido;
import cl.duoc.ferreteria.backend.model.Producto;
import cl.duoc.ferreteria.backend.model.Usuario;

import cl.duoc.ferreteria.backend.repository.PedidoRepository;
import cl.duoc.ferreteria.backend.repository.ProductoRepository;
import cl.duoc.ferreteria.backend.repository.userRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PedidoServiceTest {

    // 1. SIMULAR LOS REPOSITORIOS

    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private ProductoRepository productoRepository;

    @Mock
    private userRepository usuarioRepository;

    @Mock
    private Producto producto;

    @Mock
    private Usuario usuario;

    @InjectMocks
    private PedidoService pedidoService;

    private static final String CORREO = "cliente@correo.cl";


    // 2. PREPARAR USUARIO DE PRUEBA

    @BeforeEach
    void configurarUsuario() {

        lenient()
                .when(usuarioRepository.findByCorreo(CORREO))
                .thenReturn(Optional.of(usuario));
    }


    // 3. CREAR PEDIDO CORRECTAMENTE

    @Test
    void debeCrearPedidoCorrectamente() {

        when(productoRepository.findByIdParaCompra(1L))
                .thenReturn(Optional.of(producto));

        when(producto.getStockActual()).thenReturn(5);
        when(producto.getStockMinimo()).thenReturn(2);
        when(producto.getPrecio()).thenReturn(12500);

        when(pedidoRepository.save(any(Pedido.class)))
                .thenAnswer(invocacion ->
                        invocacion.getArgument(0)
                );

        CrearPedidoRequest solicitud = new CrearPedidoRequest(
                List.of(
                        new CrearPedidoRequest.Item(1L, 2)
                )
        );

        Pedido pedido = pedidoService.crearPedido(
                solicitud,
                CORREO
        );

        assertNotNull(pedido);

        assertEquals(
                "PENDIENTE",
                pedido.getEstado()
        );

        assertEquals(
                25000,
                pedido.getTotal()
        );

        assertEquals(
                1,
                pedido.getDetalles().size()
        );

        assertEquals(
                2,
                pedido.getDetalles().get(0).getCantidad()
        );

        assertEquals(
                12500,
                pedido.getDetalles().get(0).getPrecioUnitario()
        );

        assertEquals(
                25000,
                pedido.getDetalles().get(0).getSubtotal()
        );

        verify(pedidoRepository, times(1))
                .save(any(Pedido.class));
    }


    // 4. DESCONTAR STOCK AL REALIZAR COMPRA

    @Test
    void debeDescontarStockCorrectamente() {

        when(productoRepository.findByIdParaCompra(1L))
                .thenReturn(Optional.of(producto));

        when(producto.getStockActual()).thenReturn(5);
        when(producto.getStockMinimo()).thenReturn(2);
        when(producto.getPrecio()).thenReturn(10000);

        when(pedidoRepository.save(any(Pedido.class)))
                .thenAnswer(invocacion ->
                        invocacion.getArgument(0)
                );

        CrearPedidoRequest solicitud = new CrearPedidoRequest(
                List.of(
                        new CrearPedidoRequest.Item(1L, 2)
                )
        );

        Pedido pedido = pedidoService.crearPedido(
                solicitud,
                CORREO
        );

        assertEquals(
                20000,
                pedido.getTotal()
        );

        verify(producto).setStockActual(3);

        verify(producto).setEstado("Disponible");

        verify(pedidoRepository)
                .save(any(Pedido.class));
    }


    // 5. RECHAZAR PEDIDO SIN STOCK SUFICIENTE

    @Test
    void debeRechazarPedidoSinStock() {

        when(productoRepository.findByIdParaCompra(1L))
                .thenReturn(Optional.of(producto));

        when(producto.getStockActual()).thenReturn(1);

        when(producto.getNombre()).thenReturn("Martillo");

        CrearPedidoRequest solicitud = new CrearPedidoRequest(
                List.of(
                        new CrearPedidoRequest.Item(1L, 3)
                )
        );

        ResponseStatusException excepcion = assertThrows(
                ResponseStatusException.class,
                () -> pedidoService.crearPedido(
                        solicitud,
                        CORREO
                )
        );

        assertEquals(
                HttpStatus.CONFLICT,
                excepcion.getStatusCode()
        );

        verify(pedidoRepository, never())
                .save(any(Pedido.class));

        verify(producto, never())
                .setStockActual(anyInt());
    }


    // 6. CAMBIAR ESTADO DE PENDIENTE A EN PREPARACIÓN

    @Test
    void debeCambiarEstadoAPreparacion() {

        Pedido pedido = new Pedido();

        pedido.setEstado("PENDIENTE");
        pedido.setUsuario(usuario);

        when(usuario.getNombre())
                .thenReturn("Cliente");

        when(usuario.getApellidos())
                .thenReturn("Prueba");

        when(pedidoRepository.findByIdParaActualizar(10L))
                .thenReturn(Optional.of(pedido));

        PedidoResponse respuesta = pedidoService.cambiarEstado(
                10L,
                "EN_PREPARACION"
        );

        assertNotNull(respuesta);

        assertEquals(
                "EN_PREPARACION",
                respuesta.estado()
        );

        assertEquals(
                "EN_PREPARACION",
                pedido.getEstado()
        );

        verify(pedidoRepository).save(pedido);
    }


    // 7. RECHAZAR CAMBIOS DE ESTADO NO PERMITIDOS

    @Test
    void debeRechazarCambioDeEstadoInvalido() {

        Pedido pedido = new Pedido();

        pedido.setEstado("PENDIENTE");

        when(pedidoRepository.findByIdParaActualizar(10L))
                .thenReturn(Optional.of(pedido));

        ResponseStatusException excepcion = assertThrows(
                ResponseStatusException.class,
                () -> pedidoService.cambiarEstado(
                        10L,
                        "ENTREGADO"
                )
        );

        assertEquals(
                HttpStatus.CONFLICT,
                excepcion.getStatusCode()
        );

        assertEquals(
                "PENDIENTE",
                pedido.getEstado()
        );

        verify(pedidoRepository, never())
                .save(any(Pedido.class));
    }


    // 8. CANCELAR PEDIDO Y RECUPERAR STOCK

    @Test
    void debeRestaurarStockAlCancelarPedido() {

        // PREPARAR PEDIDO

        Pedido pedido = new Pedido();

        pedido.setEstado("PENDIENTE");
        pedido.setUsuario(usuario);
        pedido.setTotal(20000);

        when(usuario.getNombre())
                .thenReturn("Cliente");

        when(usuario.getApellidos())
                .thenReturn("Prueba");


        // PREPARAR PRODUCTO

        when(producto.getId())
                .thenReturn(1L);

        when(producto.getNombre())
                .thenReturn("Martillo");

        when(producto.getStockActual())
                .thenReturn(3);

        when(producto.getStockMinimo())
                .thenReturn(2);


        // PREPARAR DETALLE DEL PEDIDO

        DetallePedido detalle = new DetallePedido();

        detalle.setPedido(pedido);

        detalle.setProducto(producto);

        detalle.setCantidad(2);

        detalle.setPrecioUnitario(10000);

        detalle.setSubtotal(20000);

        pedido.getDetalles().add(detalle);


        // SIMULAR REPOSITORIOS

        when(pedidoRepository.findByIdParaActualizar(10L))
                .thenReturn(Optional.of(pedido));

        when(productoRepository.findByIdParaCompra(1L))
                .thenReturn(Optional.of(producto));


        // CANCELAR PEDIDO

        PedidoResponse respuesta = pedidoService.cambiarEstado(
                10L,
                "CANCELADO"
        );


        // VERIFICAR ESTADO DEL PEDIDO

        assertNotNull(respuesta);

        assertEquals(
                "CANCELADO",
                respuesta.estado()
        );

        assertEquals(
                "CANCELADO",
                pedido.getEstado()
        );


        // VERIFICAR RECUPERACIÓN DEL STOCK

        verify(producto).setStockActual(5);

        verify(producto).setEstado("Disponible");


        // VERIFICAR QUE SE GUARDE EL PEDIDO

        verify(pedidoRepository).save(pedido);

    }

}