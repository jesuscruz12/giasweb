import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importa Routes y Route correctamente
>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
<<<<<<< HEAD
import PolicyViewer from './components/PolicyViewer'; // Asegúrate de que este componente esté correctamente implementado
=======
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf
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
<<<<<<< HEAD
            {/* Rutas para políticas en modo lectura usando parámetros dinámicos */}
            <Route path="/politicas/:id" element={<PolicyViewer />} />
=======
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
