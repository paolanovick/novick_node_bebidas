import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { obtenerBodegasConPaginado, actualizarBodega, eliminarBodega } from '../../services/BodegaService';

const PaginacionBodega = () => {
  const [bodegas, setBodegas] = useState([]); // Lista de bodegas
  const [page, setPage] = useState(1); // Página actual
  const [totalRecords, setTotalRecords] = useState(0); // Total de registros
  const [editingBodega, setEditingBodega] = useState(null); // Estado para la edición
  const [dialogVisible, setDialogVisible] = useState(false); // Controla el diálogo de confirmación para eliminar
  const [bodegaToDelete, setBodegaToDelete] = useState(null); // Bodega seleccionada para eliminar

  // Obtener bodegas al cargar o cambiar de página
  useEffect(() => {
    fetchBodegas(page);
  }, [page]);

  const fetchBodegas = async (page) => {
    try {
      const response = await obtenerBodegasConPaginado(page, 10); // Límite de 10 filas por página
      if (response?.data) {
        setBodegas(response.data.bodegas || []); // Asegura un array aunque sea vacío
        setTotalRecords(response.data.totalBodegas || 0); // Maneja casos donde no haya registros
      } else {
        console.error('Datos recibidos no válidos:', response);
      }
    } catch (error) {
      console.error('Error al obtener bodegas paginadas:', error);
    }
  };

  const onPageChange = (event) => {
    setPage(event.page + 1); // Cambiar la página al interactuar con el paginador
  };

  const handleEditar = (bodega) => {
    setEditingBodega({ ...bodega }); // Copia los datos de la bodega seleccionada
  };

  const handleGuardarEdicion = async () => {
    if (!editingBodega) return;
    try {
      await actualizarBodega(editingBodega._id, editingBodega); // Llama al servicio de actualización
      setEditingBodega(null); // Finaliza la edición
      fetchBodegas(page); // Refresca los datos
    } catch (error) {
      console.error('Error al actualizar la bodega:', error);
    }
  };

  const handleShowEliminarDialog = (bodega) => {
    setBodegaToDelete(bodega); // Establece la bodega a eliminar
    setDialogVisible(true); // Muestra el diálogo
  };

  const handleEliminar = async () => {
    if (!bodegaToDelete) return;
    try {
      await eliminarBodega(bodegaToDelete._id); // Llama al servicio de eliminación
      setDialogVisible(false); // Cierra el diálogo
      fetchBodegas(page); // Refresca los datos
    } catch (error) {
      console.error('Error al eliminar la bodega:', error);
    }
  };

  return (
    <div>
      <DataTable
        value={bodegas || []}
        paginator={false}
        responsiveLayout="scroll"
        className="p-datatable-striped p-datatable-sm"
        header="Listado de Bodegas"
      >
        <Column field="nombre" header="Nombre" />
        <Column
          field="cantidad"
          header="Cantidad"
          body={(rowData) => rowData.cantidad || 0} // Muestra la cantidad o 0 si no está definida
        />
        <Column
          header="Acciones"
          body={(rowData) => (
            <div>
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-warning p-mr-2"
                onClick={() => handleEditar(rowData)}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => handleShowEliminarDialog(rowData)}
              />
            </div>
          )}
        />
      </DataTable>

      <Paginator
        first={(page - 1) * 10}
        rows={10}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        className="p-mt-4"
      />

      {editingBodega && (
        <Dialog
          header="Editar Bodega"
          visible={!!editingBodega}
          style={{ width: '450px' }}
          modal
          onHide={() => setEditingBodega(null)}
        >
          <div className="p-field">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              value={editingBodega?.nombre || ''}
              onChange={(e) =>
                setEditingBodega({ ...editingBodega, nombre: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="cantidad">Cantidad</label>
            <InputText
              id="cantidad"
              value={editingBodega?.cantidad || ''}
              onChange={(e) =>
                setEditingBodega({
                  ...editingBodega,
                  cantidad: parseInt(e.target.value, 10) || 0,
                })
              }
            />
          </div>
          <Button
            label="Guardar"
            icon="pi pi-check"
            onClick={handleGuardarEdicion}
            className="p-button-success p-mt-2"
          />
        </Dialog>
      )}

      <Dialog
        header="Confirmar Eliminación"
        visible={dialogVisible}
        style={{ width: '350px' }}
        modal
        onHide={() => setDialogVisible(false)}
        footer={
          <>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setDialogVisible(false)}
            />
            <Button
              label="Eliminar"
              icon="pi pi-check"
              onClick={handleEliminar}
              className="p-button-danger"
            />
          </>
        }
      >
        <p>
          ¿Estás seguro de que quieres eliminar la bodega{' '}
          <b>{bodegaToDelete?.nombre}</b>?
        </p>
      </Dialog>
    </div>
  );
};

export default PaginacionBodega;
