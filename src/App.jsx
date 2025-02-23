import React, { useState, useEffect } from 'react';
import Mapa from "./map/mapa";
import { ResultadosProvider } from "./map/context/resultContext";
import Grafico from './map/grafico/grafico.jsx';


function App() {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [alg, setAlg] = useState('');

  useEffect(() => {
    const handleChangeOrigen = (e) => setOrigen(e.target.value);
    const handleChangeDestino = (e) => setDestino(e.target.value);
    const handleChangeAlg = (e) => setAlg(e.target.value);

    document.getElementById('origen').addEventListener('change', handleChangeOrigen);
    document.getElementById('destino').addEventListener('change', handleChangeDestino);
    document.getElementById('alg').addEventListener('change', handleChangeAlg);

    return () => {
      document.getElementById('origen').removeEventListener('change', handleChangeOrigen);
      document.getElementById('destino').removeEventListener('change', handleChangeDestino);
      document.getElementById('alg').removeEventListener('change', handleChangeAlg);
    };
  }, []);

  return (
    <>
      <ResultadosProvider>
        <Mapa startNode={origen} endNode={destino} algoritmo={alg} />
        <Grafico />
      </ResultadosProvider>

        
    </>
  );
}

export default App;