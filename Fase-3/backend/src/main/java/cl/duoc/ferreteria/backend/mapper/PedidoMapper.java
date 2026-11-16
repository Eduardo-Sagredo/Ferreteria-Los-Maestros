package cl.duoc.ferreteria.backend.mapper;

import cl.duoc.ferreteria.backend.dto.PedidoRequestDTO;
import cl.duoc.ferreteria.backend.dto.PedidoResponseDTO;
import cl.duoc.ferreteria.backend.dto.UsuarioResponseDTO;
import cl.duoc.ferreteria.backend.model.DetallePedido;
import cl.duoc.ferreteria.backend.model.Pedido;
import cl.duoc.ferreteria.backend.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PedidoMapper {

    @Mapping(source = "clienteNombre", target = "cliente")
    @Mapping(source = "fecha", target = "fecha", dateFormat = "dd/MM/yyyy")
    @Mapping(source = "detalles", target = "productos")
    PedidoResponseDTO toResponseDTO(Pedido pedido);

    Pedido toEntity(PedidoRequestDTO dto);

    @Mapping(source = "producto.nombre", target = "nombre")
    PedidoResponseDTO.ProductoDetalleDTO toProductoDetalleDTO(DetallePedido detalle);
}
