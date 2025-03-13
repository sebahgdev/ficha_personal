import React from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ListarFormulario = ({ data }) => {
    const columns = [
        { name: "Nombre", selector: (row) => row.nombres, sortable: true },
        { name: "Dirección", selector: (row) => row.direccion, sortable: true },
        { name: "Teléfono", selector: (row) => row.telefono, sortable: true },
        { name: "Correo", selector: (row) => row.correo, sortable: true },
        { name: "Urgencia", selector: (row) => row.urgencia, sortable: true },
    ];

    return (
      <div className="container mt-4">
        <h2>Listado de Fichas</h2>
        <DataTable
          columns={columns}  // Definimos las columnas
          data={data}  // Usamos 'data' que viene de Layout
          pagination
          stripedRows
          highlightOnHover
           filterDisplay="menu"
        />
      </div>
    );
};

export default ListarFormulario;
