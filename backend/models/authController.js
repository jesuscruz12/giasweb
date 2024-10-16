const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Límite de intentos de inicio de sesión y bloqueo
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 5 * 60 * 1000; // Bloqueo por 5 minutos

// Función para el inicio de sesión
exports.login = async (req, res) => {
  const { correo, password, recaptchaToken } = req.body;

  try {
    // Verificar el token de reCAPTCHA
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    );

    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ message: 'reCAPTCHA fallido. Inténtalo de nuevo.' });
    }

    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Verificar si la cuenta está bloqueada
    if (user.isLocked) {
      const unlockTime = new Date(user.lockUntil).getTime();
      if (Date.now() < unlockTime) {
        return res.status(403).json({ message: `Cuenta bloqueada. Intenta nuevamente después de ${new Date(user.lockUntil).toLocaleTimeString()}.` });
      } else {
        user.isLocked = false;
        user.loginAttempts = 0;
        await user.save();
      }
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.loginAttempts += 1;
      if (user.loginAttempts >= MAX_ATTEMPTS) {
        user.isLocked = true;
        user.lockUntil = Date.now() + LOCK_TIME;
      }
      await user.save();
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Restablecer intentos fallidos si es correcto
    user.loginAttempts = 0;
    await user.save();

    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
