const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// ===============================
// RUTA PRINCIPAL
// ===============================

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Backend de Librería BL funcionando 📚'
  })
})


// ===============================
// OBTENER LIBROS
// ===============================

app.get('/api/libros', async (req, res) => {
  try {
    const [libros] = await db.query(
      'SELECT * FROM libros'
    )

    res.json(libros)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      mensaje: 'Error al obtener los libros'
    })
  }
})


// ===============================
// REGISTRO DE USUARIO
// ===============================

app.post('/api/registro', async (req, res) => {

  try {

    const { nombre, correo, password } = req.body

    if (!nombre || !correo || !password) {

      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      })
    }


    const [usuarioExistente] = await db.query(
      'SELECT id FROM usuarios WHERE correo = ?',
      [correo]
    )


    if (usuarioExistente.length > 0) {

      return res.status(400).json({
        mensaje: 'El correo ya está registrado'
      })
    }


    // Encriptar contraseña
    const passwordEncriptada = await bcrypt.hash(
      password,
      10
    )


    await db.query(
      'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)',
      [
        nombre,
        correo,
        passwordEncriptada
      ]
    )


    res.status(201).json({
      mensaje: 'Usuario registrado correctamente'
    })


  } catch (error) {

    console.error('Error en registro:', error)

    res.status(500).json({
      mensaje: 'Error al registrar el usuario'
    })
  }
})


// ===============================
// INICIO DE SESIÓN
// ===============================

app.post('/api/login', async (req, res) => {

  try {

    const { correo, password } = req.body



    const [usuarios] = await db.query(
      'SELECT * FROM usuarios WHERE correo = ?',
      [correo]
    )


    if (usuarios.length === 0) {

      return res.status(401).json({
        mensaje: 'Correo o contraseña incorrectos'
      })
    }


    const usuario = usuarios[0]


    // Comprobar contraseña encriptada
    const passwordCorrecta = await bcrypt.compare(
      password,
      usuario.password
    )

    if (!passwordCorrecta) {

      return res.status(401).json({
        mensaje: 'Correo o contraseña incorrectos'
      })
    }


    res.json({

      mensaje: 'Inicio de sesión exitoso',

      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }

    })


  } catch (error) {

    console.error('Error en login:', error)

    res.status(500).json({
      mensaje: 'Error al iniciar sesión'
    })
  }
})


/* ===============================
   REGISTRAR PEDIDO
=============================== */

app.post('/api/pedidos', async (req, res) => {
  try {
    const {
      nombre,
      correo,
      direccion,
      metodo_pago,
      total,
      productos
    } = req.body

    if (
      !nombre?.trim() ||
      !correo?.trim() ||
      !direccion?.trim() ||
      !metodo_pago ||
      !Array.isArray(productos) ||
      productos.length === 0
    ) {
      return res.status(400).json({
        mensaje: 'Faltan datos para registrar el pedido'
      })
    }

    const metodosPermitidos = [
      'tarjeta',
      'pse',
      'nequi',
      'contra-entrega'
    ]

    if (!metodosPermitidos.includes(metodo_pago)) {
      return res.status(400).json({
        mensaje: 'Método de pago no válido'
      })
    }

    // Calcular el total en el servidor usando los precios de la BD.
    let totalCalculado = 0
    const productosPedido = []

    for (const producto of productos) {
      const [libros] = await db.query(
        'SELECT id, titulo, precio FROM libros WHERE id = ?',
        [producto.id]
      )

      if (libros.length === 0) {
        return res.status(400).json({
          mensaje: 'Uno de los libros del pedido no existe'
        })
      }

      const libro = libros[0]
      const precio = Number(libro.precio)

      totalCalculado += precio

      productosPedido.push({
        id: libro.id,
        titulo: libro.titulo,
        precio
      })
    }

    const [resultado] = await db.query(
      `INSERT INTO pedidos
       (nombre, correo, direccion, metodo_pago, total, productos)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nombre.trim(),
        correo.trim(),
        direccion.trim(),
        metodo_pago,
        totalCalculado,
        JSON.stringify(productosPedido)
      ]
    )

    res.status(201).json({
      mensaje: 'Pedido registrado correctamente',
      pedidoId: resultado.insertId,
      total: totalCalculado
    })
  } catch (error) {
    console.error('Error al registrar pedido:', error)

    res.status(500).json({
      mensaje: 'Error al registrar el pedido'
    })
  }
})

// ===============================
// INICIAR SERVIDOR
// ===============================

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {

  console.log(
    `Servidor backend funcionando en el puerto ${PORT}`
  )
})