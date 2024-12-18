/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { obtenerBodegaPorNombre } from "../../services/BodegaService";

const handleEditar = () => {};
const handleShowEliminarDialog = () => {};

const BuscarBodegaPorNombre = () => {
  const [nombre, setNombre] = useState("");
  const [bodega, setBodega] = useState(null);

  const buscarBodega = async () => {
    try {
      const response = await obtenerBodegaPorNombre(nombre);
      console.log("Estoy trayendo", response);
      setBodega(response.data);
    } catch (error) {
      console.error("Error al buscar la bodega:", error);
    }
  };

  return (
    <div className="p-mt-4">
      <h2>Buscar Bodega por Nombre</h2>
      <div className="p-grid">
        <div className="p-col">
          <InputText
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la Bodega"
          />
        </div>
        <div className="p-col">
          <Button label="Buscar" icon="pi pi-search" onClick={buscarBodega} />
        </div>
      </div>

      {bodega && (
        <DataTable
          value={bodega || []}
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
        </DataTable>
      )}
    </div>
  );
};

export default BuscarBodegaPorNombre;
