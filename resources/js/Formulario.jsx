import React, { useState } from 'react';
import axios from 'axios';
import './bootstrap';

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
    casoUrgencia: '',
  });

  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/ficha/store', formData);
      console.log(response.data);
      alert('Formulario enviado con éxito');
    } catch (error) {
      console.error('Hubo un error al enviar el formulario:', error);
      alert('Hubo un error al enviar el formulario');
    }
  };

  return (
    <div className="container">
      <h2>Formulario de Ficha</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre Completo</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección Particular</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
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

        <div className="mb-3">
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

        <div className="mb-3">
          <label htmlFor="casoUrgencia" className="form-label">En caso de urgencia avisar a</label>
          <input
            type="text"
            className="form-control"
            id="casoUrgencia"
            name="casoUrgencia"
            value={formData.casoUrgencia}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
