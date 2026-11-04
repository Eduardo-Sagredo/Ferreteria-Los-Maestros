import { useState } from 'react'
import { Link } from 'react-router-dom'
import MockDB from '../services/MockDB.js'

function InicioSesion() {

  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')

  const [errorCorreo, setErrorCorreo] = useState('')
  const [errorContrasena, setErrorContrasena] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')


  const validarCorreo = (valor) => {

    const correoLimpio = valor.trim()

    if (correoLimpio === '') {
      return 'El correo es obligatorio.'
    }

    if (correoLimpio.length > 100) {
      return 'El correo no puede superar los 100 caracteres.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
      return 'Ingrese un correo electrónico válido.'
    }

    const dominio =
      correoLimpio.split('@')[1].toLowerCase()

    const dominiosPermitidos = [
      'duoc.cl',
      'profesor.duoc.cl',
      'gmail.com'
    ]

    if (!dominiosPermitidos.includes(dominio)) {
      return 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'
    }

    return ''
  }


  const validarContrasena = (valor) => {

    const contrasenaLimpia = valor.trim()

    if (contrasenaLimpia === '') {
      return 'La contraseña es obligatoria.'
    }

    if (
      contrasenaLimpia.length < 4 ||
      contrasenaLimpia.length > 10
    ) {
      return 'La contraseña debe tener entre 4 y 10 caracteres.'
    }

    return ''
  }


  const manejarCambioCorreo = (event) => {

    const valor = event.target.value

    setCorreo(valor)
    setErrorCorreo(validarCorreo(valor))
    setMensajeExito('')
  }


  const manejarCambioContrasena = (event) => {

    const valor = event.target.value

    setContrasena(valor)
    setErrorContrasena(validarContrasena(valor))
    setMensajeExito('')
  }


  const manejarSubmit = (event) => {

    event.preventDefault()

    setMensajeExito('')

    const nuevoErrorCorreo =
      validarCorreo(correo)

    const nuevoErrorContrasena =
      validarContrasena(contrasena)

    setErrorCorreo(nuevoErrorCorreo)
    setErrorContrasena(nuevoErrorContrasena)

    if (
      nuevoErrorCorreo ||
      nuevoErrorContrasena
    ) {
      return
    }


    const usuariosGuardados =
      JSON.parse(
        localStorage.getItem('usuarios')
      ) || []


    const correoIngresado =
      correo.trim().toLowerCase()

    const contrasenaIngresada =
      contrasena.trim()


    const usuarioEncontrado =
      usuariosGuardados.find((usuario) => {

        return (
          usuario.correo &&
          usuario.correo.toLowerCase() === correoIngresado
        )

      })


    if (!usuarioEncontrado) {

      setErrorCorreo(
        'No existe un usuario registrado con este correo.'
      )

      return
    }


    if (
      usuarioEncontrado.contrasena !==
      contrasenaIngresada
    ) {

      setErrorContrasena(
        'La contraseña ingresada es incorrecta.'
      )

      return
    }


    const usuarioActivo = {
      rut: usuarioEncontrado.rut,
      nombre: usuarioEncontrado.nombre,
      apellidos: usuarioEncontrado.apellidos,
      correo: usuarioEncontrado.correo
    }


    MockDB.setDato(
      'usuarioActivo',
      usuarioActivo
    )

    MockDB.setDato(
      'usuarioSesion',
      usuarioActivo
    )

    window.dispatchEvent(
      new Event('sesionActualizada')
    )


    setErrorCorreo('')
    setErrorContrasena('')

    setMensajeExito(
      'Inicio de sesión validado correctamente.'
    )
  }


  return (

    <main className="container my-5 flex-grow-1">

      <div className="row justify-content-center">

        <div className="col-12 col-md-8 col-lg-5">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Inicio de Sesión
              </h2>


              <form
                onSubmit={manejarSubmit}
                noValidate
              >

                <div className="mb-3">

                  <label
                    htmlFor="correo"
                    className="form-label"
                  >
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    maxLength="100"
                    placeholder="ejemplo@duoc.cl"
                    value={correo}
                    onChange={manejarCambioCorreo}
                  />

                  {errorCorreo && (

                    <div className="text-danger mt-1">
                      {errorCorreo}
                    </div>

                  )}

                  <small className="text-muted">
                    Dominios permitidos: @duoc.cl,
                    @profesor.duoc.cl y @gmail.com.
                  </small>

                </div>


                <div className="mb-3">

                  <label
                    htmlFor="contrasena"
                    className="form-label"
                  >
                    Contraseña
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    id="contrasena"
                    maxLength="10"
                    placeholder="Ingrese su contraseña"
                    value={contrasena}
                    onChange={manejarCambioContrasena}
                  />

                  {errorContrasena && (

                    <div className="text-danger mt-1">
                      {errorContrasena}
                    </div>

                  )}

                  <small className="text-muted">
                    La contraseña debe tener entre 4 y 10 caracteres.
                  </small>

                </div>


                <div className="d-grid">

                  <button
                    type="submit"
                    className="btn btn-dark"
                  >
                    Iniciar sesión
                  </button>

                </div>


                {mensajeExito && (

                  <div className="text-success text-center mt-3">
                    {mensajeExito}
                  </div>

                )}

              </form>


              <p className="text-center mt-3 mb-0">

                ¿No tienes una cuenta?{' '}

                <Link to="/registro">
                  Regístrate aquí
                </Link>

              </p>

            </div>

          </div>


          <section className="my-5 d-flex justify-content-center">

            <div
              className="p-4 rounded-4 w-100"
              style={{
                backgroundColor: '#fefce8',
                border: '1px solid #fef08a',
                maxWidth: '350px'
              }}
            >

              <h5
                className="mb-4 fw-medium text-center"
                style={{
                  color: '#d97706',
                  fontSize: '1.1rem',
                  letterSpacing: '0.5px'
                }}
              >
                ACCESO RÁPIDO (PROTOTIPO)
              </h5>


              <Link
                to="/admin"
                className="text-decoration-none d-block"
              >

                <div className="card bg-white rounded-4 text-center p-4 shadow-sm">

                  <div className="card-body p-0">

                    <h3 className="h5 text-dark mb-2">
                      Administrador
                    </h3>

                    <p className="text-secondary small mb-0">
                      admin@ferreteria.cl
                    </p>

                  </div>

                </div>

              </Link>


              <Link
                to="/vendedor"
                className="text-decoration-none d-block mt-2"
              >

                <div className="card bg-white rounded-4 text-center p-4 shadow-sm">

                  <div className="card-body p-0">

                    <h3 className="h5 text-dark mb-2">
                      Vendedor
                    </h3>

                    <p className="text-secondary small mb-0">
                      vendedor@ferreteria.cl
                    </p>

                  </div>

                </div>

              </Link>

            </div>

          </section>

        </div>

      </div>

    </main>

  )
}

export default InicioSesion