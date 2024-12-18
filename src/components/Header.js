import React, { useContext } from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  console.log("El usuario es :", user);
  const items = user
    ? [
        {
          label:
            user.rol !== "admin"
              ? "bienvenido : " + user.name
              : "Bienvenido admin",
        },
        {
          label: "Inicio",
          icon: "pi pi-fw pi-home",
          command: () => navigate("/"),
        },
        {
          label: "Vinos",
          icon: "pi pi-fw pi-list",
          command: () => navigate("/vinos"),
        },
        {
          label: "Bodegas",
          icon: "pi pi-fw pi-globe",
          command: () => navigate("/bodegas"),
        },
        {
          label: "Tienda Vinos",
          icon: "pi pi-fw pi-shopping-cart",
          command: () => navigate("/vinosStore"),
        },
        {
          label: "Cerrar Sesión",
          icon: "pi pi-fw pi-sign-out",
          command: handleLogout,
        },
      ]
    : [
        {
          label: "Inicio",
          icon: "pi pi-fw pi-home",
          command: () => navigate("/"),
        },
        {
          label: "Login",
          icon: "pi pi-fw pi-sign-in",
          command: () => navigate("/login"),
        },
      ];

  return <Menubar model={items || []} />;
};

export default Header;
