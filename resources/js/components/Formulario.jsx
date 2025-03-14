import React, { useState,useRef } from "react";
import { Toast } from 'primereact/toast';
const Formulario = ({ refreshData,hideModal  }) => {
    const [formData, setFormData] = useState({
        nombres: "",
        direccion: "",
        telefono: "",
        correo: "",
        urgencia: "",
    });
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const [suggestions, setSuggestions] = useState([]);

    const showToast = (severityValue, summaryValue, detailValue) => {
        toast.current.show({severity: severityValue, summary: summaryValue, detail: detailValue});
      }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === "direccion" && value.length > 2) {
            fetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    const fetchSuggestions = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&countrycodes=CL`
            );
            const data = await response.json();

            // Filtrar solo calle y número
            const formattedSuggestions = data.map((item) => {
                const street = item.address.road || "";
                const number = item.address.house_number || "";
                return {
                    displayName: `${street} ${number}`.trim(), // Mostrar solo calle y número
                    fullData: item // Guardamos la data completa por si la necesitas
                };
            });
            setSuggestions(data);
        } catch (error) {
            console.error("Error al obtener sugerencias:", error);
        } finally {
            setLoading(false); // Desactivar loading después de la solicitud
        }
    };

    const handleSelect = (address) => {
        setFormData({ ...formData, direccion: address.display_name });
        setSuggestions([]); // Ocultar sugerencias después de seleccionar
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response =  await fetch("/api/ficha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

             // Asegúrate de que la respuesta sea exitosa (status 2xx)
        if (!response.ok) {
            throw new Error('Error al crear la ficha');
        }

        const result = await response.json();

        // Aquí estamos capturando el campo `data` que contiene los datos del DataTable
        if (result.data) {
            console.log(result.data)
            if (result.data && Array.isArray(result.data)) {
                console.log('entro');
                refreshData([]); // Asegúrate de que data es un arreglo
                refreshData(result.data);
            }
        }
        toast.current.show({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Ficha creada con éxito!',
            life: 3000, // El mensaje se mostrará durante 3 segundos
        });
            setFormData({
                nombres: "",
                direccion: "",
                telefono: "",
                correo: "",
                urgencia: "",
            });
            hideModal();

        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un problema al crear la ficha.',
                life: 3000, // El mensaje se mostrará durante 3 segundos
            });
            console.error("Error al crear la ficha:", error);
        }
    };

    return (
        <div className="container-flud">
             <Toast ref={toast} />

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    name="nombres"
                                    value={formData.nombres}
                                    onChange={handleChange}
                                />
                                                           </div>

                            <div className="col-md-6" style={{ position: 'relative' }}>
    <label htmlFor="direccion" className="form-label">Dirección Particular</label>

    {loading && <div className="mt-1 text-primary">Cargando direcciones...</div>}

    {/* Mostrar sugerencias solo cuando hay datos y no está cargando */}
    {suggestions.length > 0 && !loading && (
        <ul className="list-group mt-1" style={{ position: 'absolute', width: '100%', top: '100%', left: 0, zIndex: 1 }}>
            {suggestions.map((s) => (
                <li
                    key={s.place_id}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSelect(s)}
                    style={{ cursor: "pointer" }}
                >
                    {s.display_name}
                </li>
            ))}
        </ul>
    )}

    <input
        type="text"
        className="form-control"
        id="direccion"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
        placeholder="Escribe una dirección..."
    />
</div>



                            <div className="col-md-6">
                                <label htmlFor="telefono" className="form-label">Teléfono Particular</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="correo"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="urgencia" className="form-label">En caso de urgencia avisar a</label>
                                <textarea
                                    className="form-control"
                                    id="urgencia"
                                    name="urgencia"
                                    value={formData.urgencia}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="row pt-2">
                                <div className="col-md-2">
                                    <button type="submit" className="btn btn-primary">Enviar</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>


    );
};

export default Formulario;
