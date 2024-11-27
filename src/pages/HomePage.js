import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import './HomePage.css'; // Importa el archivo CSS para los estilos

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="homepage-card">
                <Card 
                    title="🍷 Bienvenido a la API de Gestión de Vinos"
                    subTitle="Organiza, gestiona y optimiza tu inventario de bodegas y vinos"
                    className="homepage-card-content"
                >
                    <div className="homepage-image">
                        <Image 
                            src="/assets/bp_300.png"  
                            alt="Foto de la alumna" 
                            width="150" 
                            style={{ borderRadius: '50%' }} 
                            preview 
                        />
                    </div>
                    <div className="homepage-buttons">
                        <Button label="Ver Vinos" className="p-button-rounded p-button-info p-mr-2" onClick={() => window.location.href = "/vinosStore"} />
                        <Button label="Login" className="p-button-rounded p-button-secondary" onClick={() => window.location.href = "/login"} />
                    </div>
                </Card>
            </div>
            <footer className="homepage-footer">
                <p><strong>Nombre y Apellido:</strong> Paola Novick</p>
                <p><strong>Materia:</strong> Aplicaciones Híbridas</p>
                <p><strong>Docente:</strong> Camila Carballo</p>
                <p><strong>Comisión:</strong> DWN4AV</p>
            </footer>
        </div>
    );
};

export default HomePage;
