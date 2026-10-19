import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import '../../components/styles.css'
import '../../components/tienda.css'

export const AgregarProducto = () => {
    const { productos, agregarProducto, editarProducto } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('edit');
    const isEditing = Boolean(editId);

    // 1. Estado para manejar el error del código duplicado
    const [errorCodigo, setErrorCodigo] = useState('');

    const [formData, setFormData] = useState({
        codigo: 'PROD-', // 2. Iniciamos por defecto con el prefijo
        nombre: '',
        categoria: 'construccion',
        precio: 0,
        stockActual: 0,
        stockMinimo: 0,
        descripcion: '',
        imagen: ''
    });

    useEffect(() => {
        if (isEditing) {
            const productoExistente = productos.find(p => p.id === parseInt(editId));
            if (productoExistente) {
                setFormData({
                    codigo: productoExistente.codigo || 'PROD-',
                    nombre: productoExistente.nombre || '',
                    categoria: productoExistente.categoria || 'construccion',
                    precio: productoExistente.precio || 0,
                    stockActual: productoExistente.stockActual || 0,
                    stockMinimo: productoExistente.stockMinimo || 0,
                    descripcion: productoExistente.descripcion || '',
                    imagen: productoExistente.imagen || ''
                });
            }
        }
    }, [isEditing, editId, productos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // 3. Lógica estricta de bloqueo para el Código (Solo al agregar)
        if (name === 'codigo' && !isEditing) {
            let val = value.toUpperCase(); // Forzar mayúsculas
            
            // Impedir que el usuario borre el prefijo "PROD-"
            if (!val.startsWith('PROD-')) {
                val = 'PROD-';
            }
            
            // Extraer lo que escribió después de "PROD-" y eliminar caracteres especiales/espacios
            const sufijo = val.substring(5).replace(/[^A-Z0-9]/g, '');
            val = 'PROD-' + sufijo;

            setFormData(prev => ({ ...prev, [name]: val }));
            setErrorCodigo(''); // Limpia el error apenas el usuario empieza a corregir
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 4. Validación: Verificar que exista un código y que no esté duplicado
        if (!isEditing) {
            if (formData.codigo === 'PROD-') {
                setErrorCodigo('Debes ingresar números o letras después de PROD-');
                return;
            }

            // Busca si algún producto en la base de datos ya tiene ese mismo código
            const codigoExiste = productos.some(p => p.codigo === formData.codigo);
            if (codigoExiste) {
                setErrorCodigo(`El código ${formData.codigo} ya está registrado. Ingresa uno distinto.`);
                return; // Bloquea la creación deteniendo la función
            }
        }

        let nuevoEstado = 'Disponible';
        if (Number(formData.stockActual) <= 0) {
            nuevoEstado = 'Sin stock';
        } else if (Number(formData.stockActual) <= Number(formData.stockMinimo)) {
            nuevoEstado = 'Stock bajo';
        }

        const productoFinal = {
            ...formData,
            precio: Number(formData.precio),
            stockActual: Number(formData.stockActual),
            stockMinimo: Number(formData.stockMinimo),
            estado: nuevoEstado
        };

        if (isEditing) {
            editarProducto(parseInt(editId), productoFinal);
        } else {
            agregarProducto(productoFinal);
        }

        navigate('/admin/gestionProductos');
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            
            <main className="flex-grow-1">
                <section>
                    <div className="card my-5 border-0 shadow-sm rounded-4 p-4 mx-auto" style={{ border: '1px solid #e2e8f0', maxWidth: '800px' }}>
                        
                        <h2 className="h4 mb-4 text-dark fw-bold">
                            {isEditing ? 'Editar Producto' : 'Agregar Producto'}
                        </h2>
            
                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label htmlFor="codigo" className="form-label fw-medium text-dark">Código *</label>
                                    <input 
                                        type="text" 
                                        name="codigo"
                                        // Si está editando, ponemos readonly y pintamos el fondo grisáceo
                                        className={`form-control shadow-none ${isEditing ? 'bg-light text-muted' : ''}`} 
                                        required 
                                        readOnly={isEditing} 
                                        value={formData.codigo} 
                                        onChange={handleChange} 
                                    />
                                    {/* Muestra alerta si hay error con el código */}
                                    {errorCodigo && <div className="text-danger mt-1" style={{ fontSize: '0.85rem' }}>{errorCodigo}</div>}
                                </div>
                    
                                <div className="col-md-6">
                                    <label htmlFor="nombre" className="form-label fw-medium text-dark">Nombre *</label>
                                    <input type="text" className="form-control shadow-none" name="nombre" required 
                                           value={formData.nombre} onChange={handleChange} />
                                </div>
                    
                                <div className="col-md-6">
                                    <label htmlFor="categoria" className="form-label fw-medium text-dark">Categoría *</label>
                                    <select className="form-select shadow-none" name="categoria" required 
                                            value={formData.categoria} onChange={handleChange}>
                                        <option value="construccion">Construcción</option>
                                        <option value="herramientas">Herramientas</option>
                                        <option value="electricidad">Electricidad</option>
                                        <option value="pinturas">Pinturas</option>
                                        <option value="gasfiteria">Gásfitería</option>
                                    </select>
                                </div>
                    
                                <div className="col-md-6">
                                    <label htmlFor="precio" className="form-label fw-medium text-dark">Precio *</label>
                                    <input type="number" className="form-control shadow-none" name="precio" min="0" required 
                                           value={formData.precio} onChange={handleChange} />
                                </div>
                    
                                <div className="col-md-6">
                                    <label htmlFor="stockActual" className="form-label fw-medium text-dark">Stock *</label>
                                    <input type="number" className="form-control shadow-none" name="stockActual" min="0" required 
                                           value={formData.stockActual} onChange={handleChange} />
                                </div>
                    
                                <div className="col-md-6">
                                    <label htmlFor="stockMinimo" className="form-label fw-medium text-dark">Stock mínimo *</label>
                                    <input type="number" className="form-control shadow-none" name="stockMinimo" min="0" required 
                                           value={formData.stockMinimo} onChange={handleChange} />
                                </div>
                    
                                <div className="col-12">
                                    <label htmlFor="descripcion" className="form-label fw-medium text-dark">Descripción</label>
                                    <textarea className="form-control shadow-none" name="descripcion" rows="3" 
                                              value={formData.descripcion} onChange={handleChange}></textarea>
                                </div>
                    
                                <div className="col-12">
                                    <label htmlFor="imagen" className="form-label fw-medium text-dark">URL de imagen (Opcional)</label>
                                    {/* 5. Le quitamos el atributo 'required' a la imagen */}
                                    <input type="text" className="form-control shadow-none" name="imagen" placeholder="https://..." 
                                           value={formData.imagen} onChange={handleChange} />
                                </div>
                    
                                <div className="col-12 mt-5">
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <button type="button" className="btn btn-outline-secondary w-100 py-2 rounded-3 fw-medium" onClick={() => navigate('/admin/gestionProductos')}>
                                                Cancelar
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button type="submit" className="btn w-100 py-2 rounded-3 fw-medium text-white shadow-sm" style={{ backgroundColor: '#d97706' }}>
                                                {isEditing ? 'Guardar cambios' : 'Guardar producto'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AgregarProducto;