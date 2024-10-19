const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Ruta para el inicio de sesión
<<<<<<< HEAD
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Buscar el usuario por correo
    const user = await User.findOne({ correo });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Verificar si el correo está verificado
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Debes verificar tu correo electrónico antes de iniciar sesión.' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Diferenciar si es administrador o usuario normal
    if (user.role === 'admin') {
      res.status(200).json({ message: 'Inicio de sesión exitoso', role: 'admin', user });
    } else {
      res.status(200).json({ message: 'Inicio de sesión exitoso', role: 'user', user });
    }

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});
=======
router.post('/login', authController.login);
>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf

module.exports = router;
