// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: {
    ciudad: { type: String, required: true },
    colonia: { type: String, required: true },
    calle: { type: String, required: true }
  },
  loginAttempts: { type: Number, default: 0 }, // Intentos fallidos
  isLocked: { type: Boolean, default: false }, // Estado de bloqueo
  lockUntil: { type: Date } // Tiempo hasta el desbloqueo
});

// Cifrar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
