import React, { useState, useEffect, useRef } from "react";
import { getAllVinos, createVino, updateVino, deleteVino } from "../services/vinoServices";
import { obtenerBodegas } from "../services/BodegaService";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toolbar } from "primereact/toolbar";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const VinosCRUD = () => {
  const [vinos, setVinos] = useState([]);
  const [vinoDialog, setVinoDialog] = useState(false);
  const [deleteVinoDialog, setDeleteVinoDialog] = useState(false);
  const [vino, setVino] = useState({ nombre: "", tipo: "", bodega: "", descripcion: "", precio: "", imageUrl: "" });
  const [isEditing, setIsEditing] = useState(false); // Saber si es edición o creación
  const [imageFile, setImageFile] = useState(null);
  const [bodegas, setBodegas] = useState([]);
  const [bodegaSeleccionada, setBodegaSeleccionada] = useState(null);
  const toast = useRef(null);

  const tipoOptions = [
    { label: "Tinto", value: "tinto" },
    { label: "Blanco", value: "blanco" },
    { label: "Rosado", value: "rosado" },
  ];

  useEffect(() => {
    const fetchVinos = async () => {
      try {
        const data = await getAllVinos();
        setVinos(data);
      } catch (error) {
        toast.current.show({ severity: "error", summary: "Error", detail: "Error al cargar vinos", life: 3000 });
      }
    };

    const fetchBodegas = async () => {
      try {
        const data = await obtenerBodegas();
        setBodegas(data.data.map((b) => ({ label: b.nombre, value: b._id })));
      } catch (error) {
        toast.current.show({ severity: "error", summary: "Error", detail: "Error al cargar bodegas", life: 3000 });
      }
    };

    fetchVinos();
    fetchBodegas();
  }, []);

  const openNew = () => {
    setVino({ nombre: "", tipo: "", bodega: "", descripcion: "", precio: "", imageUrl: "" });
    setImageFile(null);
    setIsEditing(false);
    setVinoDialog(true);
  };

  const hideDialog = () => {
    setVinoDialog(false);
  };

  const hideDeleteVinoDialog = () => {
    setDeleteVinoDialog(false);
  };

  const saveVino = async () => {
    try {
      let imageUrl = vino.imageUrl;

      if (imageFile) {
        const storageRef = ref(storage, `vinos/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        const snapshot = await uploadTask;
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const newVinoData = {
        ...vino,
        bodega: isEditing ? bodegaSeleccionada : undefined, // Agrega bodega solo si es edición
        imageUrl,
      };

      if (isEditing) {
        await updateVino(vino._id, newVinoData);
        setVinos(vinos.map((v) => (v._id === vino._id ? newVinoData : v)));
        toast.current.show({ severity: "success", summary: "Éxito", detail: "Vino actualizado", life: 3000 });
      } else {
        const newVino = await createVino(newVinoData);
        setVinos([...vinos, newVino]);
        toast.current.show({ severity: "success", summary: "Éxito", detail: "Vino creado", life: 3000 });
      }

      setVinoDialog(false);
      setVino({ nombre: "", tipo: "", bodega: "", descripcion: "", precio: "", imageUrl: "" });
      setImageFile(null);
    } catch (error) {
      toast.current.show({ severity: "error", summary: "Error", detail: "Error al guardar el vino", life: 3000 });
    }
  };

  const editVino = (vino) => {
    setVino({ ...vino });
    setBodegaSeleccionada(vino.bodega);
    setIsEditing(true);
    setVinoDialog(true);
  };

  const confirmDeleteVino = (vino) => {
    setVino(vino);
    setDeleteVinoDialog(true);
  };

  const deleteVinoConfirm = async () => {
    try {
      await deleteVino(vino._id);
      setVinos(vinos.filter((v) => v._id !== vino._id));
      setDeleteVinoDialog(false);
      toast.current.show({ severity: "success", summary: "Éxito", detail: "Vino eliminado", life: 3000 });
    } catch (error) {
      toast.current.show({ severity: "error", summary: "Error", detail: "Error al eliminar el vino", life: 3000 });
    }
  };

  const actionBodyTemplate = (rowData) => (
    <>
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editVino(rowData)} />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteVino(rowData)} />
    </>
  );

  const imageBodyTemplate = (rowData) => (
    <img src={rowData.imageUrl} alt={rowData.nombre} style={{ width: "80px", borderRadius: "4px" }} />
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar
          className="mb-4"
          left={() => <Button label="Nuevo Vino" icon="pi pi-plus" className="p-button-success" onClick={openNew} />}
        />

        <DataTable
          value={vinos}
          paginator
          rows={10}
          //  globalFilter={globalFilter}
          header="Listado de Vinos"
          className="p-datatable-gridlines"
        >
          <Column field="nombre" header="Nombre"></Column>
          <Column field="tipo" header="Tipo"></Column>
          <Column field="bodega.nombre" header="Bodega"></Column>
          <Column body={imageBodyTemplate} header="Imagen"></Column>
          <Column body={actionBodyTemplate} header="Acciones"></Column>
        </DataTable>
      </div>

      <Dialog visible={vinoDialog} style={{ width: "450px" }} header="Detalles del Vino" modal className="p-fluid" onHide={hideDialog}>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText id="nombre" value={vino.nombre} onChange={(e) => setVino({ ...vino, nombre: e.target.value })} required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="tipo">Tipo</label>
          <Dropdown
            id="tipo"
            value={vino.tipo}
            options={tipoOptions}
            onChange={(e) => setVino({ ...vino, tipo: e.value })}
            placeholder="Selecciona un tipo"
          />
        </div>
        {isEditing && (
          <div className="field">
            <label htmlFor="bodega">Bodega</label>
            <Dropdown
              id="bodega"
              value={bodegaSeleccionada}
              options={bodegas}
              onChange={(e) => setBodegaSeleccionada(e.value)}
              placeholder="Selecciona una bodega"
            />
          </div>
        )}
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            rows={3}
            value={vino.descripcion}
            onChange={(e) => setVino({ ...vino, descripcion: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="precio">Precio</label>
          <InputText id="precio" type="number" value={vino.precio} onChange={(e) => setVino({ ...vino, precio: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="imagen">Imagen</label>
          <input id="imagen" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>

        <div className="p-dialog-footer">
          <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
          <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveVino} />
        </div>
      </Dialog>

      <Dialog
        visible={deleteVinoDialog}
        style={{ width: "450px" }}
        header="Confirmar"
        modal
        footer={
          <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteVinoDialog} />
            <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteVinoConfirm} />
          </>
        }
        onHide={hideDeleteVinoDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-2" style={{ fontSize: "2rem" }} />
          {vino && <span>¿Estás seguro de que quieres eliminar <b>{vino.nombre}</b>?</span>}
        </div>
      </Dialog>
    </div>
  );
};

export default VinosCRUD;
