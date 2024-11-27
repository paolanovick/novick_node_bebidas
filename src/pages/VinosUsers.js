import React, { useEffect, useState, useRef } from 'react';
import { getAllVinos } from '../services/vinoServices';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Galleria } from 'primereact/galleria';
import './VinosUsers.css';

const VinosUsers = () => {
  const [vinos, setVinos] = useState([]);
  const [selectedVino, setSelectedVino] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    fetchVinos();
  }, []);

  const fetchVinos = async () => {
    try {
      const data = await getAllVinos();
      setVinos(data);
    } catch (error) {
      console.error('Error al cargar los vinos:', error);
    }
  };

  const handleAddToCart = (vino) => {
    toast.current.show({
      severity: 'success',
      summary: 'Añadido al carrito',
      detail: `El vino "${vino.nombre}" se ha agregado al carrito.`,
      life: 3000,
    });
  };

  const handleShowDetails = (vino) => {
    setSelectedVino(vino);
    setDialogVisible(true);
  };

  const renderGalleriaItem = (item) => (
    <img
      src={item.imageUrl || `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 100)}`}
      alt={item.nombre}
      className="galleria-image"
    />
  );

  const renderHeader = (vino) => (
    <div className="vino-header">
      <h3>{vino.nombre}</h3>
      <Rating value={4} readOnly stars={5} cancel={false} />
    </div>
  );

  const renderFooter = (vino) => (
    <div className="vino-footer">
      <Button
        label="Detalles"
        icon="pi pi-info-circle"
        className="p-button-outlined p-button-secondary"
        onClick={() => handleShowDetails(vino)}
      />
      <Button
        label="Añadir al carrito"
        icon="pi pi-shopping-cart"
        className="p-button-success"
        onClick={() => handleAddToCart(vino)}
      />
    </div>
  );

  return (
    <div className="vinos-marketplace">
      <Toast ref={toast} />
      <h1 className="marketplace-title">Explora Nuestra Selección de Vinos</h1>
      <Galleria
        value={vinos}
        responsiveOptions={[
          { breakpoint: '1024px', numVisible: 4 },
          { breakpoint: '768px', numVisible: 2 },
          { breakpoint: '560px', numVisible: 1 },
        ]}
        numVisible={4}
        circular
        autoPlay
        transitionInterval={3000}
        showItemNavigators
        item={renderGalleriaItem}
        className="marketplace-galleria"
      />
      <div className="vinos-grid">
        {vinos.map((vino) => (
          <div key={vino._id} className="vino-card-container">
            <Card
              title={renderHeader(vino)}
              footer={renderFooter(vino)}
              className="vino-card"
            >
              <img
                src={vino.imageUrl || `https://picsum.photos/300/400?random=${Math.floor(Math.random() * 100)}`}
                alt={vino.nombre}
                className="vino-image"
              />
              <p><strong>Tipo:</strong> {vino.tipo}</p>
              <p><strong>Bodega:</strong> {vino.bodega?.nombre || 'Sin bodega'}</p>
              <p><strong>Precio:</strong> ${vino.precio || 'Consultar'}</p>
            </Card>
          </div>
        ))}
      </div>
      <Dialog
        header={selectedVino?.nombre}
        visible={dialogVisible}
        style={{ width: '500px' }}
        modal
        onHide={() => setDialogVisible(false)}
      >
        {selectedVino && (
          <div>
            <img
              src={selectedVino.imageUrl || `https://picsum.photos/500/400?random=${Math.floor(Math.random() * 100)}`}
              alt={selectedVino.nombre}
              className="dialog-image"
            />
            <p><strong>Tipo:</strong> {selectedVino.tipo}</p>
            <p><strong>Bodega:</strong> {selectedVino.bodega?.nombre || 'Sin bodega'}</p>
            <p><strong>Precio:</strong> ${selectedVino.precio || 'Consultar'}</p>
            <p><strong>Descripción:</strong> {selectedVino.descripcion || 'Descripción no disponible'}</p>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default VinosUsers;
