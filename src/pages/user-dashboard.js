
import './UserDashboard.css'; // Importa los estilos

import React, { useContext } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const UserWelcome = () => {
  const { user, logout } = useContext(AuthContext); // Obtener el nombre del usuario
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>🎉 ¡Bienvenido, {user?.name || 'Usuario'}!</h1> {/* Mostrar el nombre del usuario */}
        <p className="welcome-message">
          Estamos emocionados de tenerte aquí, {user?.name || 'amigo'}. ¡Explora las funcionalidades y disfruta!
        </p>
        <div className="welcome-actions">
          <Button
            label="Explorar"
            icon="pi pi-compass"
            className="p-button-raised p-button-success"
            onClick={() => navigate('/vinos')}
          />
          <Button
            label="Cerrar Sesión"
            icon="pi pi-sign-out"
            className="p-button-raised p-button-danger"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default UserWelcome;

