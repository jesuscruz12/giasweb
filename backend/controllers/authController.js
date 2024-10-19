const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el correo fue recibido correctamente
    console.log('Correo recibido:', correo);

    const user = await User.findOne({ correo });

    if (!user) {
      console.log('Usuario no encontrado para el correo:', correo);
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Verificar si el usuario ha verificado su correo
    if (!user.isVerified) {
      console.log('Correo no verificado para el usuario:', user.correo);
      return res.status(400).json({ message: 'Debes verificar tu correo electrónico antes de iniciar sesión.' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);

    console.log('Contraseña ingresada:', password);
    console.log('Contraseña almacenada (hasheada):', user.password);
    console.log('La comparación resultó:', isMatch);

    if (!isMatch) {
      console.log('Las contraseñas no coinciden');
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Si la contraseña coincide, comprobar el rol
    if (user.role === 'admin') {
      return res.status(200).json({ message: 'Inicio de sesión exitoso', role: 'admin', user });
    } else {
      return res.status(200).json({ message: 'Inicio de sesión exitoso', role: 'user', user });
    }

  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
