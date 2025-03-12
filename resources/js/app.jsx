import React from 'react';
import ReactDOM from 'react-dom/client';  // Usamos 'react-dom/client' para React 18+

import Formulario from './Formulario';  // Importa el componente

import './bootstrap';  // Si usas Bootstrap, mantenlo aquí

const root = ReactDOM.createRoot(
  document.getElementById('app')  // 'app' es el id del contenedor en tu HTML
);

// Renderizamos el componente FichaFormulario
root.render(<Formulario />);
