import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import PolicyCrud from '../components/PolicyCrud'; // Importa el componente CRUD de políticas

const AdminDashboard = () => {
  const [showPolicyCrud, setShowPolicyCrud] = useState(false); // Estado para mostrar o no el CRUD

  const handleShowPolicyCrud = () => {
    setShowPolicyCrud(true); // Cambia el estado a true cuando se presiona el botón
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-content">
        <h1>Panel de Administrador</h1>
        <p>Bienvenido al panel de administración.</p>

        {/* Tarjeta para Gestión de Políticas */}
        {!showPolicyCrud ? (
          <div className="dashboard-tools-container">
            <div className="dashboard-tool" onClick={handleShowPolicyCrud}>
              <div className="tool-icon policy-icon"></div>
              <h3>Gestión de Políticas</h3>
              <p>Ver y gestionar las políticas del sistema</p>
              <button className="view-button">Ir</button>
            </div>
          </div>
        ) : (
          <div className="policy-management">
            <h2>Gestión de Políticas</h2>
            <PolicyCrud />  {/* Incluye el CRUD de Políticas */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
