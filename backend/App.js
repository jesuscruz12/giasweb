const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Importar rutas
const usersRoute = require('./routes/users');

// Configurar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log(err));

// Usar las rutas
app.use('/api/users', usersRoute);

// Ruta básica para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

// Escuchar en un puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
