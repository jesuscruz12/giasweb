const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const SibApiV3Sdk = require('@sendinblue/client');
const router = express.Router();

// Configuración de Brevo (Sendinblue)
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// Ruta para enviar el código de verificación al correo
router.post('/send-code', async (req, res) => {
  const { correo } = req.body;

  try {
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(400).json({ message: 'No existe una cuenta con este correo.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpires = Date.now() + 3600000; // 1 hora de expiración

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    try {
      await user.save();
      console.log('Usuario guardado con éxito:', user);
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
    // Enviar el correo usando Brevo
    const sendSmtpEmail = {
      to: [{ email: correo }],
      sender: { email: process.env.EMAIL_USER_BREVO, name: 'Grupo GIAS' },
      subject: 'Recuperación de contraseña',
      htmlContent: `<p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
                    <a href="http://localhost:3000/reset-password?token=${resetToken}">Restablecer Contraseña</a>`,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    res.status(200).json({ message: 'verifica tu correo electronico' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

// Ruta para restablecer la contraseña
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  console.log('Token recibido:', token);  // Verificación de token
  console.log('Nueva contraseña recibida:', newPassword);  // Verificación de nueva contraseña

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log('No se encontró el usuario con ese token');  // Debugging del usuario no encontrado
      return res.status(400).json({ message: 'El token es inválido o ha expirado.' });
    }

    console.log('Usuario encontrado:', user);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    try {
      await user.save();
      console.log('Contraseña cambiada y usuario guardado:', user);
      res.status(200).json({ message: 'Contraseña cambiada con éxito.' });
    } catch (error) {
      console.error('Error al guardar la nueva contraseña:', error);
      res.status(500).json({ message: 'Error al guardar la nueva contraseña.' });
    }
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
});

module.exports = router;
