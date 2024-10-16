const axios = require('axios');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 5 * 60 * 1000; // 5 minutos de bloqueo

// Función de registro de usuarios con envío de correo de verificación
exports.register = async (req, res) => {
  const { nombre, apellidos, correo, password, telefono, ciudad, colonia, calle } = req.body;

  try {
    // Generar un token de verificación
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = new User({
      nombre,
      apellidos,
      correo,
      password,
      telefono,
      direccion: { ciudad, colonia, calle },
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 horas de validez
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Enviar el correo de verificación
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const verificationUrl = `http://localhost:5000/api/users/verify/${verificationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: correo,
      subject: 'Verifica tu correo electrónico',
      text: `Haz clic en el siguiente enlace para verificar tu correo: ${verificationUrl}`,
      html: `<p>Haz clic en el siguiente enlace para verificar tu correo:</p><a href="${verificationUrl}">${verificationUrl}</a>`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Usuario registrado. Por favor, verifica tu correo electrónico.' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Función para verificar el correo electrónico
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Correo verificado exitosamente' });
  } catch (error) {
    console.error('Error al verificar correo:', error);
    res.status(500).json({ message: 'Error al verificar correo', error });
  }
};

// Función de inicio de sesión con reCAPTCHA
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

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Debes verificar tu correo antes de iniciar sesión.' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
