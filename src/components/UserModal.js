import React, { useContext, useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const UserModal = () => {
  const { user, logout } = useContext(AuthContext); 
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
   
    if (user && !sessionStorage.getItem('modalShown')) {
      setShowModal(true); 
      sessionStorage.setItem('modalShown', 'true'); 
    }
  }, [user]);

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  const footer = (
    <div>
      <Button label="Cerrar" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text" />
      <Button label="Cerrar Sesión" icon="pi pi-sign-out" onClick={handleLogout} className="p-button-danger" />
    </div>
  );

 // return (
    // <Dialog
    //   header="Información del Usuario"
    //   visible={showModal}
    //   style={{ width: '30vw' }}
    //   modal
    //   onHide={() => setShowModal(false)}
    //   footer={footer}
    // >
    //   {user ? (
    //     <div>
    //       <p><strong>Nombre:</strong> {user.name}</p>
    //       <p><strong>Email:</strong> {user.email}</p>
    //       <p><strong>Estado:</strong> Logueado</p>
    //     </div>
    //   ) : (
    //     <p>No hay información de usuario.</p>
    //   )}
    // </Dialog>
 // );
};

export default UserModal;
