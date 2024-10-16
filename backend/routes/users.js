const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ruta para registrar usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellidos, correo, password, telefono, ciudad, colonia, calle } = req.body;

    // Crear un nuevo usuario con los datos recibidos
    const newUser = new User({
      nombre,
      apellidos,
      correo,
      password,
      telefono,
      direccion: { ciudad, colonia, calle } // Agrupar la dirección
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
});

module.exports = router;
