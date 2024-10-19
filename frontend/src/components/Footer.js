import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css'; // Asegúrate de ajustar el CSS según el diseño

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-rights">© 2024 GIAS. Todos los derechos reservados.</p>

        <div className="footer-content">
          {/* Contenedor para la sección de redes sociales */}
          <div className="social-container">
            <h3>Nuestras Redes:</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} /> Facebook
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Contenedor para la sección de enlaces legales */}
          <div className="legal-container">
            <h3>Enlaces Legales</h3>
            <ul>
              <li><Link to="/politicas/67112fc7a383295d83c2229f">Política de Privacidad</Link></li>
              <li><Link to="/politicas/67113093a383295d83c222a9">Política de Seguridad de la Información</Link></li>
              <li><Link to="/politicas/671130b6a383295d83c222ac">Términos y Condiciones de Uso</Link></li>
              <li><Link to="/politicas/671130eaa383295d83c222af">Política de Retención de Datos</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
