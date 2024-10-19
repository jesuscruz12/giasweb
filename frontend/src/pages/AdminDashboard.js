<<<<<<< HEAD
import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import PolicyCrud from '../components/PolicyCrud'; // Importa el componente CRUD de políticas

const AdminDashboard = () => {
  const [showPolicyCrud, setShowPolicyCrud] = useState(false); // Estado para mostrar o no el CRUD

  const handleShowPolicyCrud = () => {
    setShowPolicyCrud(true); // Cambia el estado a true cuando se presiona el botón
  };

=======
import React from 'react';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-content">
        <h1>Panel de Administrador</h1>
        <p>Bienvenido al panel de administración.</p>
<<<<<<< HEAD

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
=======
        {/* Aquí puedes añadir más contenido, estadísticas, herramientas, etc. */}
>>>>>>> 57a9d654f4988941b0210ad3a7eeb1928c37a2cf
      </div>
    </div>
  );
};

export default AdminDashboard;
