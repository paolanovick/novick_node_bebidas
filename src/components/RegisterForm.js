import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { createUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import './AuthForms.css'; // Importa los estilos reutilizables

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userData = { name, email, password };
      await createUser(userData);
      setMessage('Usuario registrado con éxito');
      setTimeout(() => navigate('/login'), 2000); 
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    
    <div className="auth-container">
      <Card title="Registro de Usuario" className="auth-card">
        <div className="p-fluid">
          {message && (
            <div className="p-message p-message-success p-mb-3">{message}</div>
          )}
          {error && (
            <div className="p-message p-message-error p-mb-3">{error}</div>
          )}
          <div className="p-field">
            <label htmlFor="name" className="p-d-block">Nombre</label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              className="p-inputtext-lg p-d-block"
            />
          </div>
          <div className="p-field">
            <label htmlFor="email" className="p-d-block">Email</label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              className="p-inputtext-lg p-d-block"
            />
          </div>
          <div className="p-field">
            <label htmlFor="password" className="p-d-block">Contraseña</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              toggleMask
              feedback={false}
              className="p-inputtext-lg p-d-block"
            />
          </div>
          <br/>
          <Button
            label="Registrar"
            icon="pi pi-user-plus"
            className="p-button-success p-mt-3"
            onClick={handleRegister}
          />
          <div className="text-center p-mt-3">
            <p>
              ¿Ya tienes cuenta?{' '}
              <Button
                label="Inicia Sesión"
                className="p-button-link p-text-primary"
                onClick={() => navigate('/login')}
              />
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterForm;

