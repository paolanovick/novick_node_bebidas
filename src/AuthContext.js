import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    if (token && name && email) {
      setUser({ token, name, email });
    }
    setLoading(false);
  }, []);

  const login = (token, name, email, rol) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("rol", rol);

    setUser({ token, name, email, rol });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
