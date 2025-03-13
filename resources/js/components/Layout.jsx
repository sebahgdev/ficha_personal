import React,{useState,useEffect} from 'react';
import Formulario from './Formulario';
import ListarFormulario from './ListarFormulario';
import axios from 'axios';

const Layout = () => {
    const [data, setData] = useState([]);

    // Función para cargar los datos en el estado
    const fetchFichas = async () => {
        try {
          const response = await axios({
            method: "GET", // 🔥 Asegura que la solicitud sea GET
            url: "/api/ficha",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          });
          setData(response.data.data);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      };

    // Actualizar los datos tras el envío del formulario
    const refreshData = (newFicha) => {
        setData((prevData) => {
            // Si newFicha es un solo objeto, lo envolvemos en un arreglo
            return Array.isArray(newFicha) ? [...prevData, ...newFicha] : [...prevData, newFicha];
        });
    };


    useEffect(() => {
      fetchFichas(); // Llama a la función para obtener los datos iniciales
    }, []);

    return (
      <div>
        <Formulario refreshData={refreshData} /> {/* Pasa la función para refrescar datos */}
        <ListarFormulario data={data} fetchFichas={fetchFichas} /> {/* Pasa los datos al componente de listado */}
      </div>
    );
  };


export default Layout;
