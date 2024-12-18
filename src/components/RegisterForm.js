import React, { useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { createUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { AuthContext } from "../AuthContext";

import "./AuthForms.css"; // Importa los estilos reutilizables
import { crearBodega } from "../services/BodegaService";
const RegisterForm = () => {
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [bodegaDialog, setBodegaDialog] = useState(false);
  const [bodega, setBodega] = useState({
    nombre: "",
    userId: "",
    vinos: [],
    cantidad: 0,
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userData = { name, email, password };
      let user = await createUser(userData);
      setMessage("Usuario registrado con éxito");
      localStorage.setItem("token", user.user.token);
      console.log("la respuesta es :", user.user);
      console.log("El token de mi usuario es :", user.user.token);
      login(
        user.user.token,
        user.user.newUser.name,
        user.user.newUser.userEmail,
        user.user.newUser.rol
      );

      setBodegaDialog(true);
      setBodega({ ...bodega, userId: user._id });
    } catch (err) {
      setError("Error al registrar usuario");
    }
  };

  const handleCrearBodega = async () => {
    try {
      await crearBodega(bodega);

      setTimeout(() => navigate("/user-dashboard"), 300);
    } catch (error) {
      setError("Error al registrar la bodega");
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
            <label htmlFor="name" className="p-d-block">
              Nombre
            </label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              className="p-inputtext-lg p-d-block"
            />
          </div>
          <div className="p-field">
            <label htmlFor="email" className="p-d-block">
              Email
            </label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              className="p-inputtext-lg p-d-block"
            />
          </div>
          <div className="p-field">
            <label htmlFor="password" className="p-d-block">
              Contraseña
            </label>
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
          <br />
          <Button
            label="Registrar"
            icon="pi pi-user-plus"
            className="p-button-success p-mt-3"
            onClick={handleRegister}
          />
          <div className="text-center p-mt-3">
            <p>
              ¿Ya tienes cuenta?{" "}
              <Button
                label="Inicia Sesión"
                className="p-button-link p-text-primary"
                onClick={() => navigate("/login")}
              />
            </p>
          </div>
        </div>
      </Card>

      <Dialog
        visible={bodegaDialog}
        style={{ width: "450px" }}
        header="Registrar Bodega"
        modal
        className="p-fluid"
        onHide={() => setBodegaDialog(false)}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={bodega.nombre}
            onChange={(e) => setBodega({ ...bodega, nombre: e.target.value })}
            required
            autoFocus
          />
        </div>

        <div className="p-dialog-footer">
          <Button
            label="Cancelar"
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => setBodegaDialog(false)}
          />
          <Button
            label="Guardar"
            icon="pi pi-check"
            className="p-button-text"
            onClick={handleCrearBodega}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default RegisterForm;
