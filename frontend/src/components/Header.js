import React from 'react';
import '../styles/Header.css'; // Archivo de estilos para el header

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>GIAS</h1>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/register">Registro</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
