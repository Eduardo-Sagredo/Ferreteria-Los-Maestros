import { useState } from 'react'
import { Link } from 'react-router-dom'

function Registro() {

  const [rut, setRut] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')

  const [errorRut, setErrorRut] = useState('')
  const [errorNombre, setErrorNombre] = useState('')
  const [errorApellidos, setErrorApellidos] = useState('')
  const [errorCorreo, setErrorCorreo] = useState('')
  const [errorContrasena, setErrorContrasena] = useState('')

  const [mensajeExito, setMensajeExito] = useState('')


  const validarRut = (valor) => {

    const rutLimpio = valor.trim()

    if (rutLimpio === '') {
      return 'El RUT es obligatorio.'
    }

    if (!/^\d{6,8}[0-9Kk]$/.test(rutLimpio)) {
      return 'Ingrese un RUT válido, sin puntos ni guion.'
    }

    return ''
  }


  const validarNombre = (valor) => {

    const nombreLimpio = valor.trim()

    if (nombreLimpio === '') {
      return 'El nombre es obligatorio.'
    }

    if (nombreLimpio.length > 50) {
      return 'El nombre no puede superar los 50 caracteres.'
    }

    return ''
  }


  const validarApellidos = (valor) => {

    const apellidosLimpios = valor.trim()

    if (apellidosLimpios === '') {
      return 'Los apellidos son obligatorios.'
    }

    if (apellidosLimpios.length > 100) {
      return 'Los apellidos no pueden superar los 100 caracteres.'
    }

    return ''
  }


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

    const dominio = correoLimpio.split('@')[1].toLowerCase()

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


  const manejarSubmit = (event) => {

    event.preventDefault()

    setMensajeExito('')

    const nuevoErrorRut = validarRut(rut)
    const nuevoErrorNombre = validarNombre(nombre)
    const nuevoErrorApellidos = validarApellidos(apellidos)
    const nuevoErrorCorreo = validarCorreo(correo)
    const nuevoErrorContrasena = validarContrasena(contrasena)

    setErrorRut(nuevoErrorRut)
    setErrorNombre(nuevoErrorNombre)
    setErrorApellidos(nuevoErrorApellidos)
    setErrorCorreo(nuevoErrorCorreo)
    setErrorContrasena(nuevoErrorContrasena)

    if (
      nuevoErrorRut ||
      nuevoErrorNombre ||
      nuevoErrorApellidos ||
      nuevoErrorCorreo ||
      nuevoErrorContrasena
    ) {
      return
    }


    const usuariosGuardados =
      JSON.parse(localStorage.getItem('usuarios')) || []


    const correoIngresado =
      correo.trim().toLowerCase()


    const usuarioExistente =
      usuariosGuardados.some((usuario) => {

        return (
          usuario.correo &&
          usuario.correo.toLowerCase() === correoIngresado
        )

      })


    if (usuarioExistente) {

      setErrorCorreo(
        'Ya existe un usuario registrado con este correo.'
      )

      return
    }


    const nuevoUsuario = {

      rut: rut.trim(),
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      correo: correoIngresado,
      contrasena: contrasena.trim()

    }


    usuariosGuardados.push(nuevoUsuario)


    localStorage.setItem(
      'usuarios',
      JSON.stringify(usuariosGuardados)
    )


    setMensajeExito(
      'Registro realizado correctamente.'
    )


    setRut('')
    setNombre('')
    setApellidos('')
    setCorreo('')
    setContrasena('')

    setErrorRut('')
    setErrorNombre('')
    setErrorApellidos('')
    setErrorCorreo('')
    setErrorContrasena('')
  }


  return (

    <main className="container my-5 flex-grow-1">

      <div className="row justify-content-center">

        <div className="col-12 col-md-8 col-lg-5">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Registro de Usuario
              </h2>


              <form onSubmit={manejarSubmit} noValidate>

                <div className="mb-3">

                  <label
                    htmlFor="rut"
                    className="form-label"
                  >
                    RUT
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="rut"
                    maxLength="9"
                    placeholder="12345678K"
                    value={rut}
                    onChange={(event) => {
                      const valor = event.target.value
                      setRut(valor)
                      setErrorRut(validarRut(valor))
                      setMensajeExito('')
                    }}
                  />

                  {errorRut && (
                    <div className="text-danger mt-1">
                      {errorRut}
                    </div>
                  )}

                  <small className="text-muted">
                    Ingrese el RUT sin puntos ni guion.
                  </small>

                </div>


                <div className="mb-3">

                  <label
                    htmlFor="nombre"
                    className="form-label"
                  >
                    Nombre
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    maxLength="50"
                    placeholder="Ingrese su nombre"
                    value={nombre}
                    onChange={(event) => {
                      const valor = event.target.value
                      setNombre(valor)
                      setErrorNombre(validarNombre(valor))
                      setMensajeExito('')
                    }}
                  />

                  {errorNombre && (
                    <div className="text-danger mt-1">
                      {errorNombre}
                    </div>
                  )}

                </div>


                <div className="mb-3">

                  <label
                    htmlFor="apellidos"
                    className="form-label"
                  >
                    Apellidos
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="apellidos"
                    maxLength="100"
                    placeholder="Ingrese sus apellidos"
                    value={apellidos}
                    onChange={(event) => {
                      const valor = event.target.value
                      setApellidos(valor)
                      setErrorApellidos(validarApellidos(valor))
                      setMensajeExito('')
                    }}
                  />

                  {errorApellidos && (
                    <div className="text-danger mt-1">
                      {errorApellidos}
                    </div>
                  )}

                </div>


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
                    onChange={(event) => {
                      const valor = event.target.value
                      setCorreo(valor)
                      setErrorCorreo(validarCorreo(valor))
                      setMensajeExito('')
                    }}
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
                    placeholder="Ingrese su contraseña"
                    value={contrasena}
                    onChange={(event) => {
                      const valor = event.target.value
                      setContrasena(valor)
                      setErrorContrasena(validarContrasena(valor))
                      setMensajeExito('')
                    }}
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
                    Registrarse
                  </button>

                </div>


                {mensajeExito && (

                  <div className="text-success text-center mt-3">
                    {mensajeExito}
                  </div>

                )}

              </form>


              <p className="text-center mt-3 mb-0">

                ¿Ya tienes una cuenta?{' '}

                <Link to="/login">
                  Inicia sesión aquí
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  )
}

export default Registro