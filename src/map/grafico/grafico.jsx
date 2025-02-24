import React, { useState, useContext } from "react";
import { ResultadosContext } from "../context/resultContext";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Grafico = () => {
  const { resultados, limpiarResultados } = useContext(ResultadosContext); // Obtén la función limpiarResultados
  const [isVisible, setIsVisible] = useState(false);

  // Transformar datos para el gráfico
  const data = [];
  for (let i = 0; i < resultados.length; i += 2) {
    const dijkstraResult = resultados[i];
    const bellmanFordResult = resultados[i + 1];

    data.push({
      id: i / 2 + 1, // Número del test
      dijkstra: dijkstraResult?.executionTime || 0, // Tiempo de Dijkstra
      bellmanFord: bellmanFordResult?.executionTime || 0, // Tiempo de Bellman-Ford
    });
  }

  // Obtener los últimos resultados de ambos algoritmos
  const lastDijkstraResult = [...resultados].reverse().find((res) => res.algorithm === "dijkstra");
  const lastBellmanFordResult = [...resultados].reverse().find((res) => res.algorithm === "bellman-ford");

  console.log(lastDijkstraResult);
  console.log(lastBellmanFordResult);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
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
          pointerEvents: isVisible ? "all" : "none",
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
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" tickFormatter={(id) => `Test ${id}`} />
            <YAxis label={{ value: "Tiempo (ms)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="dijkstra" fill="#FF0000" name="Dijkstra" />
            <Bar dataKey="bellmanFord" fill="#0000FF" name="Bellman-Ford" />
          </BarChart>
        </ResponsiveContainer>
        <div className="datos">
          {lastDijkstraResult && lastBellmanFordResult && (
            <div className="test-info">
              <p><strong>TEST {data.length}</strong></p>
              <p><strong>Algoritmo Dijkstra:</strong></p>
              <p><strong>Distancia Total:</strong> {lastDijkstraResult.distance} km</p>
              <p><strong>Tiempo de ejecución:</strong> {lastDijkstraResult.executionTime} ms</p>
              <p><strong>Algoritmo Bellman-Ford:</strong></p>
              <p><strong>Distancia Total:</strong> {lastBellmanFordResult.distance} km</p>
              <p><strong>Tiempo de ejecución:</strong> {lastBellmanFordResult.executionTime} ms</p>
            </div>
          )}
        </div>
        <button
          onClick={limpiarResultados} // Llama a la función limpiarResultados
          style={{
            position: "fixed",
            zIndex: 1100,
            top: "61vh",
            right: "1vw",
            borderRadius: "50px",
            cursor: "pointer",
            backgroundColor: "white",
            borderColor: "black"
          }}
        >
          Limpiar Datos
        </button>
        
      </div>
    </div>
  );
};

export default Grafico;