import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import PolicyViewer from './components/PolicyViewer'; // Asegúrate de que este componente esté correctamente implementado
import './App.css';  

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            {/* Rutas para políticas en modo lectura usando parámetros dinámicos */}
            <Route path="/politicas/:id" element={<PolicyViewer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
