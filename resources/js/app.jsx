import React from 'react';
import ReactDOM from 'react-dom/client';
import Loyout from './components/Layout';  // Importamos el formulario correctamente

const root = ReactDOM.createRoot(document.getElementById('app'));

// Renderiza el formulario en el contenedor con id="app"
root.render(
  <React.StrictMode>
    <Loyout />
  </React.StrictMode>
);