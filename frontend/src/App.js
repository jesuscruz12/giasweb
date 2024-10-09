import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importa Routes y Route correctamente
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import './App.css';  // Asegúrate de que los estilos de la aplicación están importados

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
