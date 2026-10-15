import { useState } from 'react'
import loginFondo from './assets/login-fondo.jpeg'

function Login({ onLogin, irARegistro, irARecuperar }) {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  const iniciarSesion = async (e) => {
    e.preventDefault()

    setMensaje('')
    setCargando(true)

    try {
      const respuesta = await fetch('https://libreria-bl.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo,
          password
        })
      })

      const datos = await respuesta.json()

      if (!respuesta.ok) {
        setMensaje(datos.mensaje)
        return
      }

      onLogin(datos.usuario)

    } catch (error) {
      console.error(error)
      setMensaje('No se pudo conectar con el servidor')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="login-page">

      {/* =========================
          LADO IZQUIERDO - IMAGEN
      ========================= */}

      <div
        className="login-image"
        style={{
          backgroundImage: `url(${loginFondo})`
        }}
      >
      </div>


      {/* =========================
          LADO DERECHO
      ========================= */}

      <div className="login-side">

        {/* MARCA */}

        <div className="login-brand">

          <div className="login-logo">
            📚
          </div>

          <h1>Librería BL</h1>

          <p>
            Un libro, un mundo por descubrir
          </p>

        </div>


        {/* FORMULARIO */}

        <div className="login-box">

          <h2>Bienvenido</h2>

          <p className="login-description">
            Ingresa a tu cuenta para continuar
          </p>

          <form onSubmit={iniciarSesion}>

            <label>
              Correo electrónico
            </label>

            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <label>
              Contraseña
            </label>

            <input
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="login-button"
              disabled={cargando}
            >
              {cargando
                ? 'Ingresando...'
                : 'INICIAR SESIÓN'}
            </button>

          </form>


          {/* MENSAJE DE ERROR */}

          {mensaje && (
            <p className="login-mensaje">
              {mensaje}
            </p>
          )}


          {/* RECUPERAR CONTRASEÑA */}

          <button
            type="button"
            className="boton-recuperar"
            onClick={irARecuperar}
          >
            ¿Olvidaste tu contraseña?
          </button>


          {/* REGISTRO */}

          <div className="login-separator">
            <span>¿No tienes una cuenta?</span>
          </div>

          <button
            type="button"
            className="boton-registrar"
            onClick={irARegistro}
          >
            REGISTRARME
          </button>

        </div>

      </div>

    </div>
  )
}

export default Login