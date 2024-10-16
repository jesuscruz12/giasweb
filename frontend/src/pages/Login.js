import React, { useState, useEffect } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };
    loadRecaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recaptchaResponse = document.querySelector('#g-recaptcha-response').value;

    if (!recaptchaResponse) {
      setErrorMessage('Por favor completa el reCAPTCHA');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: recaptchaResponse }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Inicio de sesión exitoso.');
        setErrorMessage('');

        localStorage.setItem('user', JSON.stringify(result.user));

        // Redirigir al dashboard o página principal
        window.location.href = '/dashboard';
      } else {
        setSuccessMessage('');
        setErrorMessage(result.message || 'Error al iniciar sesión.');
      }
    } catch (error) {
      setErrorMessage('Error de red al iniciar sesión.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-container">
      <h1>Inicio de Sesión</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo</label>
          <input
            type="email"
            placeholder="Correo"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <div className="g-recaptcha" data-sitekey="6Lc5pV0qAAAAAFyeHTlFcFJOlMWTXzQGwlbeA88_"></div>

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;