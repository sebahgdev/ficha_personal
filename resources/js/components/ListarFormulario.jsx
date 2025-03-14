import React, { useState,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import './App.css'; // Asegúrate de importar tu archivo de estilos

const ListarFormulario = ({ data,showModal  }) => {
    const [first, setFirst] = useState(0); // Control del primer elemento de la página
    const [rows, setRows] = useState(10);  // Cantidad de filas por página
    const [globalFilter, setGlobalFilter] = useState('');

    const myToast = useRef(null);

  const showToast = (severityValue, summaryValue, detailValue) => {
    myToast.current.show({severity: severityValue, summary: summaryValue, detail: detailValue});
  }



    const columns = [
        { name: "Nombre", selector: (row) => row.nombres, sortable: true },
        { name: "Dirección", selector: (row) => row.direccion, sortable: true },
        { name: "Teléfono", selector: (row) => row.telefono, sortable: true },
        { name: "Correo", selector: (row) => row.correo, sortable: true },
        { name: "Urgencia", selector: (row) => row.urgencia, sortable: true },
    ];

    // Función para manejar el cambio de página
    const onPageChange = (event) => {
        setFirst(event.first); // Cambiar el primer elemento visible
        setRows(event.rows);   // Cambiar la cantidad de filas por página
    };

    const onGlobalFilterChange = (e) => {
        setGlobalFilter(e.target.value);
    };

    return (
        <div className="container ">
            <Toast ref={myToast} />
              <button className="btn btn-primary" onClick={() => showToast('success','Success Message','The task was executed successfully.')}>Show message</button>

              <div className="row">
              <div className="mb-3 col-md-10">

                    <InputText
                    className="form-control"
                        value={globalFilter}
                        onChange={onGlobalFilterChange}
                        placeholder="Buscar en toda la tabla..."
                    />

            </div>
            <div className="col-md-2 text-end">
                <button className='btn btn-success'  onClick={showModal}>
                Agregar
                </button>
            </div>
            </div>
            <DataTable
                value={data}
                paginator
                rows={rows}
                first={first}
                onPage={onPageChange}
                globalFilter={globalFilter}
                tableStyle={{ minWidth: '50rem' }}
                stripedRows
            >
                <Column field="id" header="ID" sortable headerClassName="header-column" />
                <Column field="nombres" header="Nombre" sortable headerClassName="header-column" />
                <Column field="direccion" header="Dirección" sortable headerClassName="header-column" />
                <Column field="telefono" header="Teléfono" sortable headerClassName="header-column" />
                <Column field="correo" header="Correo" sortable headerClassName="header-column" />
            </DataTable>
        </div>
    );
};

export default ListarFormulario;
