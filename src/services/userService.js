// src/services/userService.js
import axios from 'axios';

const API_URL = "http://localhost:3000/usuarios"; // Cambia según tu servidor

// Servicio para crear un nuevo usuario
// export const createUser = async (userData) => {
//     const response = await axios.post(`${API_URL}`, userData);
//     return response.data;
// };



// Cambia esta URL por la de tu endpoint para crear usuarios


export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
        'Content-Type': 'application/json', // Asegúrate de que el backend espera JSON
      },
    });

    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Manejo de errores
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message); // Devuelve el mensaje del backend si existe
    }
    throw new Error('Error al registrar usuario');
  }
};


// Servicio para obtener todos los usuarios
export const getAllUsers = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Servicio para obtener un usuario por ID
export const getUserById = async (id, token) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Servicio para iniciar sesión
// export const loginUser = async (email, password) => {
//     const response = await axios.post(`${API_URL}/login`, { email, password });
//     return response.data;
// };

export const loginUser = async (email, password) => {
    try {
      const response = await fetch(API_URL + '/login', { // Cambia la URL según tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
  
      const data = await response.json(); // Aquí obtendrás el token del backend
      return data; // Devuelve el token
    } catch (err) {
      throw err;
    }
  };
  

// Servicio para actualizar un usuario
export const updateUser = async (id, userData, token) => {
    const response = await axios.put(`${API_URL}/${id}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Servicio para eliminar un usuario
export const deleteUser = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
