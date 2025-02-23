import { createContext, useState } from "react";

export const ResultadosContext = createContext();

export const ResultadosProvider = ({ children }) => {
  const [resultados, setResultados] = useState([]);

  const agregarResultados = (nuevoResultado) => {
    setResultados((prev) => [...prev, nuevoResultado]);
  };

  return (
    <ResultadosContext.Provider value={{ resultados, agregarResultados }}>
      {children}
    </ResultadosContext.Provider>
  );
};
