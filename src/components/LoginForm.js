import React, { useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { loginUser } from "../services/userService";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      setError(null);
      const {
        token,
        name,
        email: userEmail,
        rol,
      } = await loginUser(email, password);
      login(token, name, userEmail);
      //cambiar user dashboard por dashboard admin
      if (rol === "admin") navigate("/user-dashboard");
      else navigate("/vinos");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <Card
        title="Iniciar Sesión"
        style={{ width: "25rem" }}
        className="shadow-3 login-card"
      >
        <div className="p-fluid">
          {error && (
            <Message severity="error" text={error} className="p-mb-3" />
          )}
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
              className="p-inputtext-lg p-d-block"
            />
          </div>
          <br />
          <Button
            label="Iniciar Sesión"
            icon="pi pi-sign-in"
            className="p-button-primary p-button-lg p-mt-3"
            onClick={handleSubmit}
          />
          <div className="p-mt-3 text-center">
            <p>
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="p-text-primary">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
