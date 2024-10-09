import React, { useState } from 'react';
import '../styles/Register.css'; // Ajusta la ruta a donde tienes el archivo CSS

const Register = () => {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      return 'Débil';
    } else if (password.length >= 6 && password.length < 10) {
      return 'Medio';
    } else if (password.length >= 10) {
      return 'Fuerte';
    }
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      <form className="register-form">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" required />
        </div>

        <div className="form-group">
          <label>Apellidos</label>
          <input type="text" placeholder="Apellidos" required />
        </div>

        <div className="form-group">
          <label>Correo</label>
          <input type="email" placeholder="Correo" required />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
            Fortaleza: {passwordStrength}
          </div>
        </div>

        <div className="form-group">
          <label>Número Telefónico</label>
          <input type="tel" placeholder="Número Telefónico" required />
        </div>

        <div className="form-group">
          <label>Dirección - Ciudad</label>
          <input type="text" placeholder="Ciudad" required />
        </div>

        <div className="form-group">
          <label>Dirección - Colonia</label>
          <input type="text" placeholder="Colonia" required />
        </div>

        <div className="form-group">
          <label>Dirección - Calle</label>
          <input type="text" placeholder="Calle" required />
        </div>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
