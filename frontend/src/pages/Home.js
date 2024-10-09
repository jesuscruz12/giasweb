import React from 'react';
import foto from '../assets/foto.jpg';  // Asegúrate de que la ruta de la imagen sea correcta
import '../styles/Home.css'; // Puedes usar un archivo CSS separado si deseas

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a GIAS</h1>
      <div className="image-container">
        <img src={foto} alt="Imagen principal" />
      </div>
    </div>
  );
};

export default Home;
