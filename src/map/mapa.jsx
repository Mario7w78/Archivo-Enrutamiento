import React, { useEffect, useState, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-kml";
import peruGraph from "../graph/PeruGraph"; 
import { coordenadas } from "../graph/data.js";
import { ResultadosContext } from "./context/resultContext";

const Mapa = ({ startNode, endNode, algoritmo }) => {
  const [map, setMap] = useState(null);
  const [routeLayer, setRouteLayer] = useState(null);
  const { agregarResultados } = useContext(ResultadosContext);

  useEffect(() => {
    const newMap = L.map("map").setView([-13.5319, -71.9675], 6); // Centered on Peru

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(newMap);

    // Load the KML file
    fetch("./mapa.kml")
      .then((res) => res.text())
      .then((kmltext) => {
        var parser = new DOMParser();
        var kml = parser.parseFromString(kmltext, "text/xml");
        var track = new L.KML(kml);
        newMap.addLayer(track);
        newMap.fitBounds(track.getBounds());

        
        track.getLayers().forEach(layer => {
          if (layer instanceof L.Marker) {
            // Change icons of markers
            let customIcon = L.icon({
              iconUrl: './router.png',
              iconSize: [24, 24],   
              iconAnchor: [10, 16], 
              popupAnchor: [0, -12]
            });
            layer.setIcon(customIcon);
          } else if (layer instanceof L.Polyline) {
            

            layer.setStyle({
              color: '#06007a', // Line color
              weight: 3,        // Line thickness
              opacity: 0.8,     // Line opacity
              dashArray: '1,5' // Dotted pattern
            });
          }
        });
      });

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  
  const handleProcesar = () => {
    if (!map || !startNode || !endNode || !algoritmo) {
      alert("Por favor, selecciona un nodo de inicio y un nodo de fin.");
      return;
    }

    
    const dijkstraResult = peruGraph.shortestPath(startNode, endNode, "dijkstra");
    const bellmanFordResult = peruGraph.shortestPath(startNode, endNode, "bellman-ford");

    console.log(dijkstraResult);
    console.log(bellmanFordResult);

    // Guardar los resultados de ambos algoritmos en el contexto
    agregarResultados({
      algorithm: "dijkstra",
      distance: dijkstraResult.distance,
      executionTime: dijkstraResult.executionTime,
    });
    agregarResultados({
      algorithm: "bellman-ford",
      distance: bellmanFordResult.distance,
      executionTime: bellmanFordResult.executionTime,
    });

    // Eliminar la ruta anterior
    if (routeLayer) {
      map.removeLayer(routeLayer);
    }

    // Dibujar la ruta del algoritmo seleccionado
    const selectedResult = algoritmo === "dijkstra" ? dijkstraResult : bellmanFordResult;
    const coordinates = selectedResult.path.map((node) => [coordenadas[node][1], coordenadas[node][0]]);

    const color = algoritmo === "dijkstra" ? "red" : "blue";
    const newRoute = L.polyline(coordinates, {
      color: color,
      weight: 4,
      opacity: 0.8,
    }).addTo(map);

    map.fitBounds(newRoute.getBounds());

    setRouteLayer(newRoute);
  };

  
  useEffect(() => {
    const botonProcesar = document.getElementById("prcs");
    if (botonProcesar) {
      botonProcesar.addEventListener("click", handleProcesar);
    }

    
    return () => {
      if (botonProcesar) {
        botonProcesar.removeEventListener("click", handleProcesar);
      }
    };
  }, [handleProcesar]); 

  return (
    <div>
      <div id="map" className="mapa"></div>
    </div>
  );
};

export default Mapa;