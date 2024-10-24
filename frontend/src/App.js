import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap para estilos
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import PolicyViewer from './components/PolicyDetail'; // Importa el componente para ver políticas
import TermsDetail from './components/TermsDetail';
import DisclaimerDetail from './components/DisclaimerDetail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

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
            <Route path="/politicas/:id" element={<PolicyViewer />} />
            <Route path="/terminos/:id" element={<TermsDetail />} />
            <Route path="/deslinde/:id" element={<DisclaimerDetail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
