import React, { useState, useContext, useEffect } from "react";
import { ResultadosContext } from "../context/resultContext";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Grafico = () => {
  const { resultados } = useContext(ResultadosContext);
  const [isVisible, setIsVisible] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);

  // Actualizar currentResult cuando resultados cambie
  useEffect(() => {
    if (resultados.length > 0) {
      setCurrentResult(resultados[resultados.length - 1]);
    }
  }, [resultados]);

  // Transformar datos para el gráfico
  const data = resultados.map((res, index) => ({
    id: index + 1,
    dijkstra: res.algorithm === "dijkstra" ? res.executionTime : null,
    bellmanFord: res.algorithm === "bellman-ford" ? res.executionTime : null,
  }));

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const hideGraph = () => {
    setIsVisible(false);
  };

  return (
    <div>
      <button className="graficobttn" onClick={toggleVisibility}>
        <img src="./grafico.png" alt="Gráfico" className="gra" /> 
      </button>

      <div
        id="grafico"
        className={isVisible ? "view" : ""}
        onClick={(e) => e.stopPropagation()}
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible? "all" : "none",
        }}
      >
        <ResponsiveContainer
          width="30%"
          height={300}
          style={{
            position: "fixed",
            zIndex: 1000,
            right: 0,
            top: "20vh",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "30px",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderStyle: "solid",
            borderWidth: "2px",
          }}
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" tickFormatter={(id) => `Test ${id}`} />
            <YAxis label={{ value: "Tiempo (ms)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="dijkstra" stroke="#FF0000" name="Dijkstra" connectNulls />
            <Line type="monotone" dataKey="bellmanFord" stroke="#0000FF" name="Bellman-Ford" connectNulls />
          </LineChart>
        </ResponsiveContainer>
        <div className="datos">
        {currentResult && (
          <div className="test-info">
            
            <p><strong>TEST {resultados.length} </strong></p>
            <p><strong>Algoritmo:</strong> {currentResult.algorithm}</p>
            <p><strong>Distancia Total:</strong>  {currentResult.distance} km</p>
            <p><strong>Tiempo de ejecución:</strong>  {currentResult.executionTime} ms</p>
          </div>
        )}
      </div>

      </div>

      
    </div>
  );
};

export default Grafico;
