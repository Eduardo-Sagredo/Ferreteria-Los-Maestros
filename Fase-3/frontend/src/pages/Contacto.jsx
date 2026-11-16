import { useState } from 'react'

function Contacto() {

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [comentario, setComentario] = useState('')

  const [errorNombre, setErrorNombre] = useState('')
  const [errorCorreo, setErrorCorreo] = useState('')
  const [errorComentario, setErrorComentario] = useState('')

  const [mensajeExito, setMensajeExito] = useState('')


  const validarNombre = (valor) => {

    const nombreLimpio = valor.trim()

    if (nombreLimpio === '') {
      return 'El nombre es obligatorio.'
    }

    if (nombreLimpio.length > 100) {
      return 'El nombre no puede superar los 100 caracteres.'
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


  const validarComentario = (valor) => {

    const comentarioLimpio = valor.trim()

    if (comentarioLimpio === '') {
      return 'El comentario es obligatorio.'
    }

    if (comentarioLimpio.length > 500) {
      return 'El comentario no puede superar los 500 caracteres.'
    }

    return ''
  }


  const manejarSubmit = (event) => {

    event.preventDefault()

    setMensajeExito('')

    const nuevoErrorNombre = validarNombre(nombre)
    const nuevoErrorCorreo = validarCorreo(correo)
    const nuevoErrorComentario = validarComentario(comentario)

    setErrorNombre(nuevoErrorNombre)
    setErrorCorreo(nuevoErrorCorreo)
    setErrorComentario(nuevoErrorComentario)

    if (
      nuevoErrorNombre ||
      nuevoErrorCorreo ||
      nuevoErrorComentario
    ) {
      return
    }

    setMensajeExito(
      'Mensaje enviado correctamente.'
    )

    setNombre('')
    setCorreo('')
    setComentario('')

    setErrorNombre('')
    setErrorCorreo('')
    setErrorComentario('')
  }


  return (

    <main className="container my-5 flex-grow-1">

      <div className="row justify-content-center">

        <div className="col-12 col-md-8 col-lg-5">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Contacto
              </h2>


              <form onSubmit={manejarSubmit} noValidate>

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
                    maxLength="100"
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
                    htmlFor="comentario"
                    className="form-label"
                  >
                    Comentario
                  </label>

                  <textarea
                    className="form-control"
                    id="comentario"
                    rows="5"
                    maxLength="500"
                    placeholder="Escriba su comentario"
                    value={comentario}
                    onChange={(event) => {

                      const valor = event.target.value

                      setComentario(valor)
                      setErrorComentario(
                        validarComentario(valor)
                      )
                      setMensajeExito('')

                    }}
                  />

                  {errorComentario && (

                    <div className="text-danger mt-1">
                      {errorComentario}
                    </div>

                  )}

                  <small className="text-muted">

                    El comentario puede tener un máximo
                    de 500 caracteres.

                  </small>

                </div>


                <div className="d-grid">

                  <button
                    type="submit"
                    className="btn btn-dark"
                  >
                    Enviar mensaje
                  </button>

                </div>


                {mensajeExito && (

                  <div className="text-success text-center mt-3">
                    {mensajeExito}
                  </div>

                )}

              </form>

            </div>

          </div>

        </div>

      </div>

    </main>

  )
}

export default Contacto