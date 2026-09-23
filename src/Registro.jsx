import { useState } from 'react'

function Registro({ volverLogin }) {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [exito, setExito] = useState(false)
  const [cargando, setCargando] = useState(false)

  const registrarUsuario = async (e) => {
    e.preventDefault()

    setMensaje('')
    setExito(false)

    if (password !== confirmarPassword) {
      setMensaje('Las contraseñas no coinciden')
      return
    }

    setCargando(true)

    try {
      const respuesta = await fetch('https://libreria-bl.onrender.com/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          correo,
          password
        })
      })

      const datos = await respuesta.json()

      if (!respuesta.ok) {
        setMensaje(datos.mensaje)
        return
      }

      setExito(true)
      setMensaje(datos.mensaje)

      setNombre('')
      setCorreo('')
      setPassword('')
      setConfirmarPassword('')

    } catch (error) {
      console.error(error)
      setMensaje('No se pudo conectar con el servidor')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="registro-page">

      <div className="registro-box">

        <div className="registro-logo">
          📚
        </div>

        <h1>Librería BL</h1>

        <h2>Crear una cuenta</h2>

        <p className="registro-descripcion">
          Regístrate para disfrutar de nuestra librería
        </p>

        <form onSubmit={registrarUsuario}>

          <label>Nombre completo</label>

          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label>Correo electrónico</label>

          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label>Contraseña</label>

          <input
            type="password"
            placeholder="Crea una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirmar contraseña</label>

          <input
            type="password"
            placeholder="Repite tu contraseña"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="registro-button"
            disabled={cargando}
          >
            {cargando ? 'Registrando...' : 'CREAR CUENTA'}
          </button>

        </form>

        {mensaje && (
          <p className={exito ? 'registro-exito' : 'registro-error'}>
            {mensaje}
          </p>
        )}

        <button
          type="button"
          className="volver-login"
          onClick={volverLogin}
        >
          ← Volver al inicio de sesión
        </button>

      </div>

    </div>
  )
}

export default Registro