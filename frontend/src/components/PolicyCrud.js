import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';
import '../styles/policy.css';

const PolicyCrud = () => {
  const [policies, setPolicies] = useState([]); // Lista de políticas
  const [newPolicy, setNewPolicy] = useState({ title: '', content: '' }); // Nueva política
  const [editingPolicy, setEditingPolicy] = useState(null); // Política en edición

  useEffect(() => {
    fetchPolicies(); // Cargar todas las políticas al montar el componente
  }, []);

  // Obtener todas las políticas
  const fetchPolicies = async () => {
    try {
      const response = await axios.get(`${API_URL}/policies`);
      setPolicies(response.data); // Guardar las políticas en el estado
    } catch (error) {
      console.error('Error al obtener las políticas:', error);
    }
  };

  // Crear nueva política
  const handleCreatePolicy = async () => {
    if (!newPolicy.title || !newPolicy.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }

    try {
      await axios.post(`${API_URL}/policies`, newPolicy); // Crear política en el backend
      setNewPolicy({ title: '', content: '' }); // Reiniciar los campos del formulario
      fetchPolicies(); // Recargar las políticas
    } catch (error) {
      console.error('Error al crear la política:', error);
    }
  };

  // Editar una política existente
  const handleEditPolicy = (policy) => {
    setEditingPolicy(policy); // Poner la política en modo edición
  };

  // Guardar los cambios en una nueva versión de la política editada
  const handleSavePolicy = async () => {
    // Verifica que editingPolicy no sea nulo y tenga las propiedades correctas
    if (!editingPolicy || !editingPolicy.title || !editingPolicy.content) {
      console.error('Título y contenido no pueden estar vacíos');
      return;
    }

    console.log('Guardando política:', editingPolicy); // Verifica los datos que se enviarán

    try {
      await axios.put(`${API_URL}/policies/${editingPolicy._id}`, editingPolicy); // Actualizar la política
      setEditingPolicy(null); // Salir del modo de edición
      fetchPolicies(); // Recargar las políticas
    } catch (error) {
      console.error('Error al guardar la nueva versión de la política:', error.response ? error.response.data : error.message);
    }
  };

  // Eliminar una política
  const handleDeletePolicy = async (id) => {
    try {
      await axios.delete(`${API_URL}/policies/${id}`); // Eliminar política por ID
      fetchPolicies(); // Recargar las políticas
    } catch (error) {
      console.error('Error al eliminar la política:', error);
    }
  };

  return (
    <div className="policy-crud-container">
      <h2>Gestionar Políticas</h2>

      {/* Formulario para crear nueva política */}
      <div>
        <h3>Crear nueva política</h3>
        <input
          type="text"
          placeholder="Título"
          value={newPolicy.title}
          onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
        />
        <textarea
          placeholder="Contenido"
          value={newPolicy.content}
          onChange={(e) => setNewPolicy({ ...newPolicy, content: e.target.value })}
        />
        <button onClick={handleCreatePolicy}>Crear</button>
      </div>

      {/* Listado de políticas existentes */}
      <h3>Políticas existentes</h3>
      <ul>
        {policies.map((policy) => (
          <li key={policy._id}>
            {editingPolicy && editingPolicy._id === policy._id ? (
              <>
                <input
                  type="text"
                  value={editingPolicy.title}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, title: e.target.value })}
                />
                <textarea
                  value={editingPolicy.content}
                  onChange={(e) => setEditingPolicy({ ...editingPolicy, content: e.target.value })}
                />
                <button onClick={handleSavePolicy}>Guardar nueva versión</button>
                <button onClick={() => setEditingPolicy(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <h4>{policy.title} {policy.isCurrent && <span>(Vigente)</span>}</h4>
                <p>{policy.content}</p>
                <p>Versión: {policy.version || 1}</p>
                <p>Fecha de creación: {new Date(policy.createdAt).toLocaleString()}</p>
                <button onClick={() => handleEditPolicy(policy)}>Editar</button>
                <button onClick={() => handleDeletePolicy(policy._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PolicyCrud;
