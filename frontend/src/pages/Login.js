import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'; // Importar useNavigate en lugar de useHistory
=======
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf
import '../styles/Login.css';
import imagen2 from '../assets/imagen2.png';
import imagen3 from '../assets/imagen3.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
<<<<<<< HEAD
  const navigate = useNavigate(); // Hook para redirigir
=======
  const navigate = useNavigate();
>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf

  // Cargar reCAPTCHA cuando el componente se monta
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

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const recaptchaResponse = document.querySelector('#g-recaptcha-response').value;

    if (!recaptchaResponse) {
      setErrorMessage('Por favor completa el reCAPTCHA');
      return;
    }

    try {
      // Enviar los datos al servidor para iniciar sesión
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: recaptchaResponse }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Inicio de sesión exitoso.');
        setErrorMessage('');

        // Guardar los datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('userRole', result.user.role);

        // Redirigir al dashboard según el rol
        if (result.user.role === 'admin') {
<<<<<<< HEAD
          navigate('/admin-dashboard'); // Redirigir a página de administrador
        } else {
          navigate('/dashboard'); // Redirigir a página de usuario
=======
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf
        }
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
    <div className="login-page-container">
      <div className="login-container-wrapper">
        <div className="login-carousel">
          <Carousel>
            <Carousel.Item>
              <img src={imagen2} alt="Segunda imagen" className="carousel-image" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={imagen3} alt="Tercera imagen" className="carousel-image" />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="login-container">
          <h1>Iniciar Sesión</h1>
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

            {/* Aquí se incluye el reCAPTCHA */}
            <div className="g-recaptcha" data-sitekey="6Lc5pV0qAAAAAFyeHTlFcFJOlMWTXzQGwlbeA88_"></div>

            <button type="submit">Iniciar Sesión</button>
          </form>

          <div className="extra-links">
            <a href="/forgot-password">¿Olvidaste la contraseña?</a>
            <a href="/register">Registrarse</a>
          </div>
        </div>
<<<<<<< HEAD

        {/* Google reCAPTCHA */}
        <div className="g-recaptcha" data-sitekey="6Lc5pV0qAAAAAFyeHTlFcFJOlMWTXzQGwlbeA88_"></div>

        <button type="submit">Iniciar Sesión</button>
      </form>
=======
      </div>
>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf
    </div>
  );
};

export default Login;
