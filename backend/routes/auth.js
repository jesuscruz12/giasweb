// routes/auth.js
const express = require('express');
const router = express.Router();
const { login } = require('../models/authController'); // Importar la función de inicio de sesión

// Ruta para el inicio de sesión
router.post('/login', login); // Llamar a la función login desde authController

module.exports = router;
