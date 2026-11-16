package cl.duoc.ferreteria.backend.service;

import cl.duoc.ferreteria.backend.dto.ProductoRequest;
import cl.duoc.ferreteria.backend.dto.ProductoResponse;
import cl.duoc.ferreteria.backend.model.Producto;
import cl.duoc.ferreteria.backend.repository.ProductoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Transactional(readOnly = true)
    public List<ProductoResponse> listarProductos() {

        return productoRepository.findAll()
                .stream()
                .map(this::convertirResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProductoResponse buscarPorId(Long id) {

        Producto producto = buscarProducto(id);

        return convertirResponse(producto);
    }

    @Transactional
    public ProductoResponse crearProducto(
            ProductoRequest request) {

        if (productoRepository.existsByCodigo(
                request.getCodigo())) {

            throw new RuntimeException(
                    "Ya existe un producto con el código: "
                            + request.getCodigo()
            );
        }

        Producto producto = new Producto();

        asignarDatos(producto, request);

        Producto productoGuardado =
                productoRepository.save(producto);

        return convertirResponse(productoGuardado);
    }

    @Transactional
    public ProductoResponse actualizarProducto(
            Long id,
            ProductoRequest request) {

        Producto producto = buscarProducto(id);

        productoRepository
                .findByCodigo(request.getCodigo())
                .filter(existente ->
                        !existente.getId().equals(id)
                )
                .ifPresent(existente -> {

                    throw new RuntimeException(
                            "Ya existe un producto con el código: "
                                    + request.getCodigo()
                    );
                });

        asignarDatos(producto, request);

        Producto productoActualizado =
                productoRepository.save(producto);

        return convertirResponse(productoActualizado);
    }

    @Transactional
    public void eliminarProducto(Long id) {

        Producto producto = buscarProducto(id);

        productoRepository.delete(producto);
    }

    private Producto buscarProducto(Long id) {

        return productoRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Producto no encontrado"
                        )
                );
    }

    private void asignarDatos(
            Producto producto,
            ProductoRequest request) {

        producto.setCodigo(request.getCodigo());
        producto.setNombre(request.getNombre());
        producto.setCategoria(request.getCategoria());
        producto.setPrecio(request.getPrecio());
        producto.setStockActual(
                request.getStockActual()
        );
        producto.setStockMinimo(
                request.getStockMinimo()
        );
        producto.setImagen(request.getImagen());
        producto.setDescripcion(
                request.getDescripcion()
        );

        producto.setEstado(
                calcularEstado(
                        request.getStockActual(),
                        request.getStockMinimo()
                )
        );
    }

    private String calcularEstado(
            Integer stockActual,
            Integer stockMinimo) {

        if (stockActual == 0) {
            return "Sin stock";
        }

        if (stockActual <= stockMinimo) {
            return "Stock bajo";
        }

        return "Disponible";
    }

    private ProductoResponse convertirResponse(
            Producto producto) {

        return new ProductoResponse(
                producto.getId(),
                producto.getCodigo(),
                producto.getNombre(),
                producto.getCategoria(),
                producto.getPrecio(),
                producto.getStockActual(),
                producto.getStockMinimo(),
                producto.getEstado(),
                producto.getImagen(),
                producto.getDescripcion()
        );
    }
}