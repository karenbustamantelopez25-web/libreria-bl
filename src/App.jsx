import { useState, useEffect } from 'react'
import './App.css'
import Login from './Login'
import Registro from './Registro'

import ecoEstrellas from './assets/el-eco-de-las-estrellas.png'
import cartasAlma from './assets/cartas-para-el-alma.png'
import silencioBosque from './assets/bajo-el-silencio-del-bosque.png'
import mujeresEscriben from './assets/mujeres-que-escriben-su-historia.png'
import luzTormenta from './assets/luz-en-la-tormenta.png'
import viajesCambian from './assets/viajes-que-te-cambian.png'
import secretoBiblioteca from './assets/el-secreto-de-la-biblioteca.png'
import amorLlega from './assets/cuando-el-amor-llega.png'
import grandesSuenos from './assets/pequenos-pasos-grandes-suenos.png'
import reinoSuenos from './assets/el-reino-de-los-suenos.png'
import mentesMundo from './assets/mentes-que-cambian-el-mundo.png'
import sinMiedo from './assets/sin-miedo-a-sonar.png'
import logoLibreria from './assets/logo-libreria-bl.png'

import destinoPaginas from './assets/un-destino-entre-paginas.png'
import casaAzul from './assets/el-misterio-de-la-casa-azul.png'
import milMundos from './assets/la-puerta-de-los-mil-mundos.png'
import comenzarNuevo from './assets/el-poder-de-comenzar-de-nuevo.png'
import islaSecretos from './assets/la-isla-de-los-secretos.png'
import despuesLluvia from './assets/despues-de-la-lluvia.png'
import masEstrellas from './assets/mas-alla-de-las-estrellas.png'
import creerTi from './assets/aprende-a-creer-en-ti.png'
import cafeLibros from './assets/cafe-libros-y-casualidades.png'
import ultimoManuscrito from './assets/el-ultimo-manuscrito.png'

const imagenesLibros = {
  'el-eco-de-las-estrellas.png': ecoEstrellas,
  'cartas-para-el-alma.png': cartasAlma,
  'bajo-el-silencio-del-bosque.png': silencioBosque,
  'mujeres-que-escriben-su-historia.png': mujeresEscriben,
  'luz-en-la-tormenta.png': luzTormenta,
  'viajes-que-te-cambian.png': viajesCambian,
  'el-secreto-de-la-biblioteca.png': secretoBiblioteca,
  'cuando-el-amor-llega.png': amorLlega,
  'pequenos-pasos-grandes-suenos.png': grandesSuenos,
  'el-reino-de-los-suenos.png': reinoSuenos,
  'mentes-que-cambian-el-mundo.png': mentesMundo,
  'sin-miedo-a-sonar.png': sinMiedo,
  'un-destino-entre-paginas.png': destinoPaginas,
  'el-misterio-de-la-casa-azul.png': casaAzul,
  'la-puerta-de-los-mil-mundos.png': milMundos,
  'el-poder-de-comenzar-de-nuevo.png': comenzarNuevo,
  'la-isla-de-los-secretos.png': islaSecretos,
  'despues-de-la-lluvia.png': despuesLluvia,
  'mas-alla-de-las-estrellas.png': masEstrellas,
  'aprende-a-creer-en-ti.png': creerTi,
  'cafe-libros-y-casualidades.png': cafeLibros,
  'el-ultimo-manuscrito.png': ultimoManuscrito
}

function App() {
  const [usuario, setUsuario] = useState(null)
  const [vista, setVista] = useState('login')
  const [librosBD, setLibrosBD] = useState([])
  const [libroSeleccionado, setLibroSeleccionado] = useState(null)
  const [carrito, setCarrito] = useState([])
  const [mostrarCarrito, setMostrarCarrito] = useState(false)
  const [mostrarCompra, setMostrarCompra] = useState(false)
  const [compraExitosa, setCompraExitosa] = useState(false)
  const [procesandoCompra, setProcesandoCompra] = useState(false)
 
    useEffect(() => {
    fetch('https://libreria-bl.onrender.com/api/libros')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
  console.log('LIBROS DESDE MYSQL:', datos)
  setLibrosBD(datos)
})
      .catch((error) => {
        console.error('Error al cargar los libros:', error)
      })
  }, []) 
  const agregarAlCarrito = (libro) => {
    setCarrito([...carrito, libro])
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((libro) => libro.id !== id))
  }

  const librosIniciales = [
    {
      id: 1,
      titulo: 'El eco de las estrellas',
      autor: 'Laura Martínez',
      precio: 35000,
      imagen: ecoEstrellas,
      categoria: 'Ficción',
      fragmento:
        'A veces, cuando creemos haber perdido nuestro camino, basta con mirar hacia las estrellas para descubrir que todavía queda una historia por escribir.',
    },
    {
      id: 2,
      titulo: 'Cartas para el alma',
      autor: 'Sofía Ramírez',
      precio: 32000,
      imagen: cartasAlma,
      categoria: 'Romance',
      fragmento:
        'Entre cartas, recuerdos y palabras que nunca fueron dichas, una historia de amor descubre que algunas emociones permanecen incluso cuando pasa el tiempo.',
    },
    {
      id: 3,
      titulo: 'Bajo el silencio del bosque',
      autor: 'Daniel Torres',
      precio: 38000,
      imagen: silencioBosque,
      categoria: 'Misterio',
      fragmento:
        'En lo profundo del bosque existe una casa abandonada que guarda un secreto. Una noche, una joven decide entrar y descubre que algunas historias nunca permanecen enterradas.',
    },
    {
      id: 4,
      titulo: 'Mujeres que escriben su historia',
      autor: 'Camila Rodríguez',
      precio: 42000,
      imagen: mujeresEscriben,
      categoria: 'Inspiración',
      fragmento:
        'Historias de mujeres que encontraron el valor para cambiar su destino, superar obstáculos y demostrar que cada persona puede escribir su propia historia.',
    },
    {
      id: 5,
      titulo: 'Luz en la tormenta',
      autor: 'Valentina Gómez',
      precio: 36000,
      imagen: luzTormenta,
      categoria: 'Drama',
      fragmento:
        'Cuando todo parece perdido, una pequeña luz puede convertirse en la esperanza necesaria para continuar. Una historia sobre fuerza, pérdida y nuevos comienzos.',
    },
    {
      id: 6,
      titulo: 'Viajes que te cambian',
      autor: 'Andrés Moreno',
      precio: 40000,
      imagen: viajesCambian,
      categoria: 'Viajes',
      fragmento:
        'Viajar no siempre significa conocer nuevos lugares. Algunas veces significa encontrarnos a nosotros mismos y regresar a casa siendo una persona diferente.',
    },
    {
      id: 7,
      titulo: 'El secreto de la biblioteca',
      autor: 'Mariana López',
      precio: 39000,
      imagen: secretoBiblioteca,
      categoria: 'Misterio',
      fragmento:
        'Una antigua biblioteca esconde un libro que nadie recuerda haber escrito. Al encontrarlo, una joven descubre que sus páginas parecen conocer secretos de su propia vida.',
    },
    {
      id: 8,
      titulo: 'Cuando el amor llega',
      autor: 'Natalia Herrera',
      precio: 33000,
      imagen: amorLlega,
      categoria: 'Romance',
      fragmento:
        'A veces el amor aparece cuando menos lo esperamos. Una historia sobre segundas oportunidades, encuentros inesperados y la posibilidad de volver a creer.',
    },
    {
      id: 9,
      titulo: 'Pequeños pasos, grandes sueños',
      autor: 'Sebastián Castro',
      precio: 37000,
      imagen: grandesSuenos,
      categoria: 'Motivación',
      fragmento:
        'Los grandes sueños no se construyen de un día para otro. Cada pequeño paso cuenta y puede acercarnos mucho más de lo que imaginamos a aquello que deseamos.',
    },
    {
      id: 10,
      titulo: 'El reino de los sueños',
      autor: 'Isabella Vargas',
      precio: 45000,
      imagen: reinoSuenos,
      categoria: 'Fantasía',
      fragmento:
        'Existe un reino al que solo se puede llegar mientras dormimos. Allí, una joven descubrirá que sus sueños pueden cambiar el destino de dos mundos.',
    },
    {
      id: 11,
      titulo: 'Mentes que cambian el mundo',
      autor: 'Felipe Sánchez',
      precio: 43000,
      imagen: mentesMundo,
      categoria: 'Educación',
      fragmento:
        'Grandes ideas pueden comenzar con una simple pregunta. Descubre historias de personas que decidieron pensar diferente y transformar su entorno.',
    },
    {
      id: 12,
      titulo: 'Sin miedo a soñar',
      autor: 'Ana María Pérez',
      precio: 35000,
      imagen: sinMiedo,
      categoria: 'Inspiración',
      fragmento:
        'Los sueños pueden dar miedo cuando parecen demasiado grandes. Esta historia nos recuerda que atreverse a intentarlo puede ser el primer paso hacia una vida diferente.',
    },
  ]
  const libros = librosBD.length > 0 ? librosBD : librosIniciales

const totalCarrito = carrito.reduce(
  (total, libro) => total + Number(libro.precio),
  0
)
   
    if (!usuario) {
       if (vista === 'registro') {
    return (
      <Registro
        volverLogin={() => setVista('login')}
      />
    )
  }
    return (
      <Login
        onLogin={(datosUsuario) => setUsuario(datosUsuario)}
        irARegistro={() => setVista('registro')}
        irARecuperar={() => alert('Próximamente: Recuperar contraseña')}
      />
    )
  }

  return (
    <div className="app">

      {/* ENCABEZADO */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">📚</span>

          <div>
            <h1>Librería BL</h1>
            <p>Un libro, un mundo por descubrir</p>
          </div>
        </div>
        <span className="user-greeting">
  👤 Hola, {usuario.nombre}
</span> 

        <nav className="nav">
          <a href="#inicio">Inicio</a>
          <a href="#libros">Libros</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>

          <button
            className="cart-button"
            onClick={() => setMostrarCarrito(true)}
          >
            🛒 Carrito ({carrito.length})
          </button>
        </nav>
      </header>

      {/* PORTADA */}
      <section id="inicio" className="hero-section">

        <div className="hero-content">

          <span className="hero-label">
            📖 BIENVENIDO A LIBRERÍA BL
          </span>

          <h2>
            Encuentra tu próxima
            <span> gran historia</span>
          </h2>

          <p>
            Descubre libros que inspiran, enseñan y transportan
            a nuevos mundos. Explora nuestra colección y encuentra
            ese libro que estabas buscando.
          </p>

          <div className="hero-buttons">
            <a href="#libros" className="primary-button">
              Explorar libros 📚
            </a>

            <a href="#nosotros" className="secondary-button">
              Conócenos
            </a>
          </div>

        </div>

       <div className="hero-book">
      <img
       src={logoLibreria}
      alt="Logo de Librería BL"
      className="hero-logo"
       />
</div>  

      </section>

      {/* CATEGORÍAS */}
      <section className="categories">

        <div className="category">
          <span>📚</span>
          <h3>Gran colección</h3>
          <p>Libros para todos los gustos</p>
        </div>

        <div className="category">
          <span>🚚</span>
          <h3>Compra fácil</h3>
          <p>Proceso rápido y sencillo</p>
        </div>

        <div className="category">
          <span>💜</span>
          <h3>Lectores felices</h3>
          <p>Una experiencia pensada para ti</p>
        </div>

      </section>

      {/* CATÁLOGO */}
      <section id="libros" className="books-section">

        <div className="section-title">
          <span>DESCUBRE</span>

          <h2>Nuestra colección</h2>

          <p>
            Encuentra una historia que te acompañe.
          </p>
        </div>

        <div className="books-grid">

          {libros.map((libro) => (

            <article
              className="book-card"
              key={libro.id}
            >

              <div className="book-image">

                
                 <img
                src={imagenesLibros[libro.imagen] || libro.imagen}
               alt={libro.titulo}
               />
                <span className="book-category">
                  {libro.categoria}
                </span>

              </div>

              <div className="book-info">

                <h3>
                  {libro.titulo}
                </h3>

                <p className="author">
                  {libro.autor}
                </p>

                <div className="rating">
                  ⭐⭐⭐⭐⭐
                </div>

                <p className="price">
                  ${libro.precio.toLocaleString('es-CO')}
                </p>

                <div className="book-actions">

                  <button
                    className="read-button"
                    onClick={() =>
                      setLibroSeleccionado(libro)
                    }
                  >
                    Leer
                  </button>

                  <button
                    className="buy-button"
                    onClick={() => {
                      agregarAlCarrito(libro)
                      setMostrarCarrito(true)
                    }}
                  >
                    Comprar
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

      {/* MODAL LEER */}
      {libroSeleccionado && (

        <div className="modal-overlay">

          <div className="book-modal">

            <button
              className="modal-close"
              onClick={() =>
                setLibroSeleccionado(null)
              }
            >
              ×
            </button>

            
        <img
         src={
          imagenesLibros[libroSeleccionado.imagen] ||
           libroSeleccionado.imagen
        }
           alt={libroSeleccionado.titulo}
          />

            <div className="modal-info">

              <span>
                {libroSeleccionado.categoria}
              </span>

              <h2>
                {libroSeleccionado.titulo}
              </h2>

              <p className="modal-author">
                {libroSeleccionado.autor}
              </p>

              <p className="modal-fragment">
                “{libroSeleccionado.fragmento}”
              </p>

              <button
                className="modal-button"
                onClick={() =>
                  setLibroSeleccionado(null)
                }
              >
                Cerrar
              </button>

            </div>

          </div>

        </div>

      )}

      {/* CARRITO */}
      {mostrarCarrito && (

        <div className="modal-overlay">

          <div className="cart-modal">

            <button
              className="modal-close"
              onClick={() =>
                setMostrarCarrito(false)
              }
            >
              ×
            </button>

            <h2>🛒 Mi carrito</h2>

            {carrito.length === 0 ? (

              <div className="empty-cart">

                <span>📚</span>

                <p>
                  Tu carrito está vacío.
                </p>

                <button
                  className="modal-button"
                  onClick={() =>
                    setMostrarCarrito(false)
                  }
                >
                  Seguir comprando
                </button>

              </div>

            ) : (

              <>

                <div className="cart-items">

                  {carrito.map((libro) => (

                    <div
                      className="cart-item"
                      key={libro.id}
                    >

                      <img
                     src={imagenesLibros[libro.imagen] || libro.imagen}
                      alt={libro.titulo}
                        />

                      <div className="cart-item-info">

                        <h3>
                          {libro.titulo}
                        </h3>

                        <p>
                          {libro.autor}
                        </p>

                       <strong>
                            $
                        {Number(libro.precio).toLocaleString('es-CO')}
                        </strong>

                      </div>

                      <button
                        className="delete-button"
                        onClick={() =>
                          eliminarDelCarrito(libro.id)
                        }
                      >
                        🗑️
                      </button>

                    </div>

                  ))}

                </div>

                <div className="cart-total">

                  <span>
                    Total:
                  </span>

                  <strong>
                    $
                    {totalCarrito.toLocaleString(
                      'es-CO'
                    )}
                  </strong>

                </div>

                <button
                  className="checkout-button"
                  onClick={() => {
                    setMostrarCarrito(false)
                    setMostrarCompra(true)
                  }}
                >
                  Continuar con la compra
                </button>

              </>

            )}

          </div>

        </div>

      )}

      {/* FORMULARIO DE COMPRA */}
      {mostrarCompra && (

        <div className="modal-overlay">

          <div className="purchase-modal">

            <button
              className="modal-close"
              onClick={() =>
                setMostrarCompra(false)
              }
            >
              ×
            </button>

            <h2>
              Finalizar compra
            </h2>

            <p className="purchase-subtitle">
              Completa tus datos para realizar tu pedido.
            </p>

            <form
             
           onSubmit={async (e) => {
            e.preventDefault()

               if (procesandoCompra || carrito.length === 0) return

              setProcesandoCompra(true)

             const formulario = e.currentTarget
             const datos = new FormData(formulario)

           const pedido = {
             nombre: datos.get('nombre'),
             correo: datos.get('correo'),
             direccion: datos.get('direccion'),
              metodo_pago: datos.get('metodo_pago'),
              productos: carrito.map((libro) => ({
             id: libro.id
             }))
           }

         try {
         const respuesta = await fetch(
         'https://libreria-bl.onrender.com/api/pedidos',
         {
            method: 'POST',
           headers: {
          'Content-Type': 'application/json'
          },
            body: JSON.stringify(pedido)
         }
        )

       const resultado = await respuesta.json()

        if (!respuesta.ok) {
      throw new Error(
        resultado.mensaje || 'No se pudo registrar el pedido'
      )
    }

         setMostrarCompra(false)
        setCompraExitosa(true)
      setCarrito([])
      } catch (error) {
       console.error('Error al registrar la compra:', error)
      alert(error.message || 'No se pudo registrar la compra. Inténtalo de nuevo.')
    } finally {
     setProcesandoCompra(false)
    }
      }}
            >

              
           <label>
            Nombre completo

             <input
            name="nombre"
            type="text"
            placeholder="Escribe tu nombre"
           minLength="3"
           required
         />
        </label>

              
            <input
           name="correo"
          type="email"
          placeholder="correo@ejemplo.com"
           required
                 />

              <label>
                
           <input
             name="direccion"
            type="text"
            placeholder="Dirección donde recibirás tu pedido"
            minLength="5"
           required
           />
              </label>

              <label>
                Método de pago

                
              <select
                name="metodo_pago"
            defaultValue=""
            required
               >

                  <option
                    value=""
                    disabled
                  >
                    Selecciona un método
                  </option>

                  <option value="tarjeta">
                    Tarjeta de crédito
                  </option>

                  <option value="pse">
                    PSE
                  </option>

                  <option value="nequi">
                    Nequi
                  </option>

                  <option value="contra-entrega">
                    Contra Entrega
                  </option>

                </select>

              </label>

              <div className="purchase-total">

                <span>
                  Total a pagar:
                </span>

                <strong>
                  $
                  {totalCarrito.toLocaleString(
                    'es-CO'
                  )}
                </strong>

              </div>

              
         <button
        type="submit"
       className="confirm-purchase-button"
       disabled={procesandoCompra}
      >
  {procesandoCompra
    ? 'Registrando pedido...'
    : 'Confirmar compra'}
</button>

            </form>

          </div>

        </div>

      )}

      {/* COMPRA EXITOSA */}
      {compraExitosa && (

        <div className="modal-overlay">

          <div className="success-modal">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              ¡Compra realizada!
            </h2>

            <p>
              Gracias por comprar en{' '}
              <strong>
                Librería BL
              </strong>.
            </p>

            <p>
              Tu pedido ha sido registrado correctamente.
            </p>

            <button
              className="success-button"
              onClick={() =>
                setCompraExitosa(false)
              }
            >
              Aceptar
            </button>

          </div>

        </div>

      )}

      {/* NOSOTROS */}
      <section
        id="nosotros"
        className="about-section"
      >

        <div>

          <span className="section-label">
            SOBRE NOSOTROS
          </span>

          <h2>
            Más que una librería
          </h2>

          <p>
            En Librería BL creemos que cada libro tiene una historia
            capaz de cambiar la forma en que vemos el mundo.
          </p>

          <p>
            Nuestro objetivo es ofrecer una experiencia sencilla,
            agradable y especial para todos los amantes de la lectura.
          </p>

        </div>

        <div className="about-card">

          <span>💜</span>

          <h3>
            Leer es viajar
          </h3>

          <p>
            Abre un libro y comienza una nueva aventura.
          </p>

        </div>

      </section>

      {/* FOOTER */}
      <footer
        id="contacto"
        className="footer"
      >

        <h2>
          📚 Librería BL
        </h2>

        <p>
          Un libro, un mundo por descubrir.
        </p>

        <p className="copyright">
          © 2026 Librería BL. Todos los derechos reservados.
        </p>

      </footer>

    </div>
  )
}

export default App