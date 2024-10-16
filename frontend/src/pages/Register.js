import React, { useState } from 'react';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    telefono: '',
    ciudad: '',
    colonia: '',
    calle: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordSuggestions, setPasswordSuggestions] = useState([]); // Sugerencias para la contraseña
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Patrones comunes a evitar en contraseñas
  const commonPatterns = ['12345', '123456', 'qwerty', 'password', 'abc123', '111111', 'letmein'];

  // Validación en tiempo real para contraseñas
  const handlePasswordChange = (e) => {
    const value = e.target.value;

    if (value.length > 16) {
      setErrorMessage('La contraseña no debe tener más de 16 caracteres.');
      return;
    }

    const containsCommonPattern = commonPatterns.some((pattern) => value.toLowerCase().includes(pattern));
    if (containsCommonPattern) {
      alert('La contraseña contiene un patrón común que la hace débil. Por favor, elige una contraseña más segura.');
    }

    setFormData({ ...formData, password: value });
    setPasswordStrength(checkPasswordStrength(value));
  };

  // Evaluar la fortaleza de la contraseña
  const checkPasswordStrength = (password) => {
    let strength = 0;
    const suggestions = [];

    if (password.length >= 8) {
      strength++;
    } else {
      suggestions.push('Debe tener al menos 8 caracteres');
    }
    if (/[A-Z]/.test(password)) {
      strength++;
    } else {
      suggestions.push('Debe incluir al menos una letra mayúscula');
    }
    if (/[a-z]/.test(password)) {
      strength++;
    } else {
      suggestions.push('Debe incluir al menos una letra minúscula');
    }
    if (/[0-9]/.test(password)) {
      strength++;
    } else {
      suggestions.push('Debe incluir al menos un número');
    }
    if (/[\W]/.test(password)) {
      strength++;
    } else {
      suggestions.push('Debe incluir al menos un carácter especial');
    }

    setPasswordSuggestions(suggestions); // Actualizamos las sugerencias
    if (strength <= 2) return 'Débil';
    if (strength === 3) return 'Medio';
    if (strength >= 4) return 'Fuerte';
  };

  // Validación de entrada
  const validate = () => {
    let newErrors = {};
    
    // Expresión regular actualizada para incluir letras en español, incluyendo la ñ y vocales acentuadas
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!formData.nombre.trim() || !nameRegex.test(formData.nombre)) {
      newErrors.nombre = 'El nombre solo debe contener letras, espacios y caracteres válidos (á, é, í, ó, ú, ñ)';
    }
    if (!formData.apellidos.trim() || !nameRegex.test(formData.apellidos)) {
      newErrors.apellidos = 'Los apellidos solo deben contener letras, espacios y caracteres válidos (á, é, í, ó, ú, ñ)';
    }

    // Validar formato de correo
    if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'Correo inválido';
    }

    // Validar contraseña
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    // Validar que el teléfono solo contenga números y tenga 10 dígitos
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.telefono)) {
      newErrors.telefono = 'El número de teléfono debe contener exactamente 10 dígitos';
    }

    // Validar otros campos
    if (!formData.ciudad.trim()) newErrors.ciudad = 'Ciudad es requerida';
    if (!formData.colonia.trim()) newErrors.colonia = 'Colonia es requerida';
    if (!formData.calle.trim()) newErrors.calle = 'Calle es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setSuccessMessage('Usuario registrado exitosamente.');
          setErrorMessage('');
          setFormData({
            nombre: '',
            apellidos: '',
            correo: '',
            password: '',
            telefono: '',
            ciudad: '',
            colonia: '',
            calle: '',
          });
        } else {
          setSuccessMessage('');
          setErrorMessage(result.message || 'Error al registrar usuario.');
        }
      } catch (error) {
        setErrorMessage('Error de red al registrar.');
        setSuccessMessage('');
        console.error('Error al registrar:', error);
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Registro</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) => {
              if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(e.target.value)) {
                setFormData({ ...formData, nombre: e.target.value });
              }
            }}
            required
          />
          {errors.nombre && <p className="error">{errors.nombre}</p>}
        </div>

        <div className="form-group">
          <label>Apellidos</label>
          <input
            type="text"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={(e) => {
              if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(e.target.value)) {
                setFormData({ ...formData, apellidos: e.target.value });
              }
            }}
            required
          />
          {errors.apellidos && <p className="error">{errors.apellidos}</p>}
        </div>

        <div className="form-group">
          <label>Correo</label>
          <input
            type="email"
            placeholder="Correo"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
            required
          />
          {errors.correo && <p className="error">{errors.correo}</p>}
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handlePasswordChange}
            required
          />
          <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
            Fortaleza: {passwordStrength}
          </div>
          {passwordSuggestions.length > 0 && (
            <ul className="password-suggestions">
              {passwordSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Número Telefónico</label>
          <input
            type="tel"
            placeholder="Número Telefónico"
            value={formData.telefono}
            onChange={(e) => {
              if (e.target.value === '' || /^\d{0,10}$/.test(e.target.value)) {
                setFormData({ ...formData, telefono: e.target.value });
              }
            }}
            required
          />
          {errors.telefono && <p className="error">{errors.telefono}</p>}
        </div>

        <div className="form-group">
          <label>Dirección - Ciudad</label>
          <input
            type="text"
            placeholder="Ciudad"
            value={formData.ciudad}
            onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
            required
          />
          {errors.ciudad && <p className="error">{errors.ciudad}</p>}
        </div>

        <div className="form-group">
          <label>Dirección - Colonia</label>
          <input
            type="text"
            placeholder="Colonia"
            value={formData.colonia}
            onChange={(e) => setFormData({ ...formData, colonia: e.target.value })}
            required
          />
          {errors.colonia && <p className="error">{errors.colonia}</p>}
        </div>

        <div className="form-group">
          <label>Dirección - Calle</label>
          <input
            type="text"
            placeholder="Calle"
            value={formData.calle}
            onChange={(e) => setFormData({ ...formData, calle: e.target.value })}
            required
          />
          {errors.calle && <p className="error">{errors.calle}</p>}
        </div>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
