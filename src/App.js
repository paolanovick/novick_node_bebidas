import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import HomePage from './pages/HomePage'; 
import VinosCRUD from './components/VinosCrud'; 
import LoginForm from './components/LoginForm'; 
import RegisterForm from './components/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute'; 
import BodegasPage from './pages/BodegasPage'; 
import VinosUsers from './pages/VinosUsers'; 
import UserModal from './components/UserModal';
import { AuthProvider } from './AuthContext'; 
import UserDashboard from './pages/user-dashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
       
        <Header />
      
        <UserModal />
        <Routes>
          
          <Route path="/" element={<HomePage />} />
        
          <Route path="/login" element={<LoginForm />} />
         
          <Route path="/register" element={<RegisterForm />} />
        
          <Route
            path="/bodegas"
            element={
              <ProtectedRoute>
                <BodegasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vinos"
            element={
              <ProtectedRoute>
                <VinosCRUD />
              </ProtectedRoute>
            }
          />
          
          <Route path="/VinosStore" element={<VinosUsers />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
