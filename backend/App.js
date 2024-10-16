const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Importar cors
const session = require('express-session'); // Importar express-session
const crypto = require('crypto'); // Importar crypto para IDs de sesión seguros
const MongoStore = require('connect-mongo'); // Importar connect-mongo para almacenar sesiones en MongoDB

// Configurar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Habilitar CORS
app.use(cors());  // Permitir CORS desde cualquier origen

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log(err));

// Configurar sesiones seguras
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Clave secreta para la sesión (almacenada en .env)
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Guardar las sesiones en MongoDB
  cookie: {
    httpOnly: true, // Protege contra ataques XSS
    secure: process.env.NODE_ENV === 'production', // Cookies seguras solo para HTTPS en producción
    sameSite: 'strict', // Protege contra CSRF
    maxAge: 30 * 60 * 1000  // Expira en 30 minutos de inactividad
  },
  genid: function(req) {
    return crypto.randomBytes(32).toString('hex');  // Genera un ID de sesión seguro
  }
}));

// Importar rutas
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth'); // Ruta para el login

// Usar las rutas
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

// Ruta básica para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

// Ruta para cerrar sesión y destruir la sesión
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('No se pudo cerrar la sesión');
    }
    res.clearCookie('connect.sid'); // Limpia la cookie de sesión
    res.status(200).send('Sesión cerrada correctamente');
  });
});

// Escuchar en un puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
