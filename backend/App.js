const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const crypto = require('crypto');
const MongoStore = require('connect-mongo');

dotenv.config();

const app = express();

// Habilitar CORS
const corsOptions = {
  origin: 'http://localhost:3000', // URL de tu frontend
  credentials: true, // Para permitir cookies, si es necesario
};
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log(err));

// Configurar sesiones seguras
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 60 * 1000
  },
  genid: function(req) {
    return crypto.randomBytes(32).toString('hex');
  }
}));

// Importar rutas
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
<<<<<<< HEAD
const policyRoute = require('./routes/policyRoutes');  // Importar rutas de políticas
=======
const passwordResetRoutes = require('./routes/passwordReset');
>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf

// Usar las rutas
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
<<<<<<< HEAD
app.use('/api/policies', policyRoute);  // Usar rutas de políticas
=======
app.use('/api/password', passwordResetRoutes);
>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf

// Ruta para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

// Ruta para cerrar sesión
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('No se pudo cerrar la sesión');
    }
    res.clearCookie('connect.sid');
    res.status(200).send('Sesión cerrada correctamente');
  });
});

// Escuchar en el puerto configurado
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
