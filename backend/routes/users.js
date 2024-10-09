const express = require('express');
const router = express.Router();

// Ruta para obtener todos los usuarios (ejemplo)
router.get('/', (req, res) => {
  res.send('Lista de usuarios');
});

module.exports = router;
