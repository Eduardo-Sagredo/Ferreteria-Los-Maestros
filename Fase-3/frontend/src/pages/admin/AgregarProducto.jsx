import { useEffect, useState } from 'react';
import {
    useNavigate,
    useSearchParams
} from 'react-router-dom';

import productoService from '../../api/productoService.js';

import '../../components/styles.css';
import '../../components/tienda.css';

export const AgregarProducto = () => {

    const navigate = useNavigate();

    const [searchParams] =
        useSearchParams();

    const editId =
        searchParams.get('edit');

    const isEditing =
        Boolean(editId);


    const [errorCodigo, setErrorCodigo] =
        useState('');

    const [mensajeError, setMensajeError] =
        useState('');

    const [cargando, setCargando] =
        useState(false);


    const [formData, setFormData] =
        useState({

            codigo: 'PROD-',

            nombre: '',

            categoria:
                'construccion',

            precio: 0,

            stockActual: 0,

            stockMinimo: 0,

            descripcion: '',

            imagen: ''

        });


    /*
       CARGAR PRODUCTO
       CUANDO ESTAMOS EDITANDO
    */
    useEffect(() => {

        if (!isEditing) {
            return;
        }

        async function cargarProducto() {

            try {

                setCargando(true);

                const producto =
                    await productoService
                        .obtenerPorId(editId);

                setFormData({

                    codigo:
                        producto.codigo || '',

                    nombre:
                        producto.nombre || '',

                    categoria:
                        producto.categoria ||
                        'construccion',

                    precio:
                        producto.precio || 0,

                    stockActual:
                        producto.stockActual || 0,

                    stockMinimo:
                        producto.stockMinimo || 0,

                    descripcion:
                        producto.descripcion || '',

                    imagen:
                        producto.imagen || ''

                });

            } catch (error) {

                console.error(
                    'Error al cargar producto:',
                    error
                );

                setMensajeError(
                    'No fue posible cargar el producto.'
                );

            } finally {

                setCargando(false);

            }
        }

        cargarProducto();

    }, [isEditing, editId]);


    /*
       CAMBIO DE CAMPOS
    */
    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        /*
           CONTROL DEL CÓDIGO
           SOLO AL CREAR
        */
        if (
            name === 'codigo' &&
            !isEditing
        ) {

            let valor =
                value.toUpperCase();


            if (
                !valor.startsWith(
                    'PROD-'
                )
            ) {

                valor = 'PROD-';

            }


            const sufijo =
                valor
                    .substring(5)
                    .replace(
                        /[^A-Z0-9]/g,
                        ''
                    );


            valor =
                'PROD-' + sufijo;


            setFormData(
                anterior => ({
                    ...anterior,
                    codigo: valor
                })
            );


            setErrorCodigo('');

            return;
        }


        setFormData(
            anterior => ({
                ...anterior,
                [name]: value
            })
        );
    };


    /*
       GUARDAR PRODUCTO
    */
    const handleSubmit =
        async (e) => {

            e.preventDefault();

            setErrorCodigo('');
            setMensajeError('');


            if (
                !isEditing &&
                formData.codigo ===
                    'PROD-'
            ) {

                setErrorCodigo(
                    'Debes ingresar números o letras después de PROD-.'
                );

                return;
            }


            const productoRequest = {

                codigo:
                    formData.codigo,

                nombre:
                    formData.nombre,

                categoria:
                    formData.categoria,

                precio:
                    Number(
                        formData.precio
                    ),

                stockActual:
                    Number(
                        formData.stockActual
                    ),

                stockMinimo:
                    Number(
                        formData.stockMinimo
                    ),

                descripcion:
                    formData.descripcion,

                imagen:
                    formData.imagen

            };


            try {

                setCargando(true);


                if (isEditing) {

                    await productoService
                        .actualizar(
                            editId,
                            productoRequest
                        );

                } else {

                    await productoService
                        .crear(
                            productoRequest
                        );

                }


                navigate(
                    '/admin/gestionProductos'
                );


            } catch (error) {

                console.error(
                    'Error al guardar producto:',
                    error
                );


                if (
                    error.response?.status ===
                    400
                ) {

                    setMensajeError(
                        'Revisa los datos ingresados. El código puede estar repetido o existir datos inválidos.'
                    );

                } else if (
                    error.response?.status ===
                    401 ||
                    error.response?.status ===
                    403
                ) {

                    setMensajeError(
                        'No tienes autorización para realizar esta operación.'
                    );

                } else {

                    setMensajeError(
                        'No fue posible guardar el producto.'
                    );

                }

            } finally {

                setCargando(false);

            }
        };


    if (
        cargando &&
        isEditing &&
        !formData.nombre
    ) {

        return (

            <main className="container py-5 text-center">

                <p className="fs-5">
                    Cargando producto...
                </p>

            </main>

        );
    }


    return (

        <div className="d-flex flex-column min-vh-100">

            <main className="flex-grow-1">

                <section>

                    <div
                        className="card my-5 border-0 shadow-sm rounded-4 p-4 mx-auto"
                        style={{
                            border:
                                '1px solid #e2e8f0',
                            maxWidth:
                                '800px'
                        }}
                    >

                        <h2 className="h4 mb-4 text-dark fw-bold">

                            {
                                isEditing
                                    ? 'Editar Producto'
                                    : 'Agregar Producto'
                            }

                        </h2>


                        {mensajeError && (

                            <div className="alert alert-danger">

                                {mensajeError}

                            </div>

                        )}


                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="row g-4">


                                <div className="col-md-6">

                                    <label
                                        htmlFor="codigo"
                                        className="form-label fw-medium text-dark"
                                    >
                                        Código *
                                    </label>

                                    <input
                                        type="text"
                                        name="codigo"
                                        id="codigo"
                                        className={
                                            `form-control shadow-none ${
                                                isEditing
                                                    ? 'bg-light text-muted'
                                                    : ''
                                            }`
                                        }
                                        required
                                        readOnly={
                                            isEditing
                                        }
                                        value={
                                            formData.codigo
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    {errorCodigo && (

                                        <div
                                            className="text-danger mt-1"
                                            style={{
                                                fontSize:
                                                    '0.85rem'
                                            }}
                                        >

                                            {errorCodigo}

                                        </div>

                                    )}

                                </div>


                                <div className="col-md-6">

                                    <label
                                        htmlFor="nombre"
                                        className="form-label fw-medium text-dark"
                                    >
                                        Nombre *
                                    </label>

                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        className="form-control shadow-none"
                                        required
                                        value={
                                            formData.nombre
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="col-md-6">

                                    <label
                                        htmlFor="categoria"
                                        className="form-label fw-medium text-dark"
                                    >
                                        Categoría *
                                    </label>

                                    <select
                                        id="categoria"
                                        name="categoria"
                                        className="form-select shadow-none"
                                        required
                                        value={
                                            formData.categoria
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="construccion">
                                            Construcción
                                        </option>

                                        <option value="herramientas">
                                            Herramientas
                                        </option>

                                        <option value="electricidad">
                                            Electricidad
                                        </option>

                                        <option value="pinturas">
                                            Pinturas
                                        </option>

                                        <option value="gasfiteria">
                                            Gásfitería
                                        </option>

                                    </select>

                                </div>


                                <div className="col-md-6">

                                    <label
                                        htmlFor="precio"
                                        className="form-label fw-medium text-dark"
                                    >
                                        Precio *
                                    </label>

                                    <input
                                        type="number"
                                        id="precio"
                                        name="precio"
                                        className="form-control shadow-none"
                                        min="0"
                                        required
                                        value={
                                            formData.precio
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="col-md-6">

                                    <label
                                        htmlFor="stockActual"
                                        className="form-label fw-medium text-dark"
                                    >
                                        Stock *
                                    </label>

                                    <input
                                        type="number"
                                        id="stockActual"
                                        name="stockActual"
                                        className="form-control shadow-none"
                                        min="0"
                                        required
                                        value={
                                            formData.stockActual
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="col-md-6">

                                    <label
                                        htmlFor="stockMinimo"
                                        className="form-label fw-medium text-dark"
                                    >
                                        Stock mínimo *
                                    </label>

                                    <input
                                        type="number"
                                        id="stockMinimo"
                                        name="stockMinimo"
                                        className="form-control shadow-none"
                                        min="0"
                                        required
                                        value={
                                            formData.stockMinimo
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="col-12">

                                    <label
                                        htmlFor="descripcion"
                                        className="form-label fw-medium text-dark"
                                    >
                                        Descripción
                                    </label>

                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        className="form-control shadow-none"
                                        rows="3"
                                        value={
                                            formData.descripcion
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="col-12">

                                    <label
                                        htmlFor="imagen"
                                        className="form-label fw-medium text-dark"
                                    >
                                        URL de imagen
                                    </label>

                                    <input
                                        type="text"
                                        id="imagen"
                                        name="imagen"
                                        className="form-control shadow-none"
                                        placeholder="/img/producto.png"
                                        value={
                                            formData.imagen
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                <div className="col-12 mt-5">

                                    <div className="row g-3">

                                        <div className="col-6">

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary w-100 py-2 rounded-3 fw-medium"
                                                onClick={
                                                    () =>
                                                        navigate(
                                                            '/admin/gestionProductos'
                                                        )
                                                }
                                            >
                                                Cancelar
                                            </button>

                                        </div>


                                        <div className="col-6">

                                            <button
                                                type="submit"
                                                disabled={
                                                    cargando
                                                }
                                                className="btn w-100 py-2 rounded-3 fw-medium text-white shadow-sm"
                                                style={{
                                                    backgroundColor:
                                                        '#d97706'
                                                }}
                                            >

                                                {
                                                    cargando
                                                        ? 'Guardando...'
                                                        : isEditing
                                                            ? 'Guardar cambios'
                                                            : 'Guardar producto'
                                                }

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