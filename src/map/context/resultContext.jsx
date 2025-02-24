import { createContext, useState } from "react";

export const ResultadosContext = createContext();

export const ResultadosProvider = ({ children }) => {
  const [resultados, setResultados] = useState([]);

  const agregarResultados = (nuevoResultado) => {
    setResultados((prev) => [...prev, nuevoResultado]);
  };

  const limpiarResultados = () => {
    setResultados([]); // Reinicia el estado a un array vacío
  };

  return (
    <ResultadosContext.Provider value={{ resultados, agregarResultados, limpiarResultados }}>
      {children}
    </ResultadosContext.Provider>
  );
};