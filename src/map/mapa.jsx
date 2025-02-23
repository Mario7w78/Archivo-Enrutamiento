import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-kml";
import peruGraph from "../graph/PeruGraph"; 
import { coordenadas } from "../graph/data.js";
import { useContext } from "react";
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

        // Customize placemarks and lines
        track.getLayers().forEach(layer => {
          if (layer instanceof L.Marker) {
            // Change icons of markers
            let customIcon = L.icon({
              iconUrl: './router.png', // Change this to your icon path
              iconSize: [24, 24],   // Icon size
              iconAnchor: [10, 16], // Icon anchor point
              popupAnchor: [0, -12]
            });
            layer.setIcon(customIcon);
          } else if (layer instanceof L.Polyline) {
            // Change the style of the lines (create a dotted line)
            layer.setStyle({
              color: '#000000', // Line color
              weight: 2.5,        // Line thickness
              opacity: 0.8,     // Line opacity
              dashArray: '1, 5' // Dotted pattern
            });
          }
        });
      });

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!map || !startNode || !endNode || !algoritmo) return;

    // Get the shortest path
    const { path, distance, executionTime, algorithm } = peruGraph.shortestPath(startNode, endNode, algoritmo);

    if (path.length === 0) {
      console.log("No valid route found");
      return;
    }

    agregarResultados({algorithm, distance, executionTime});

    // Remove the previous route
    if (routeLayer) {
      map.removeLayer(routeLayer);
    }

    // Convert path to coordinates
    const coordinates = path.map((node) => [coordenadas[node][1], coordenadas[node][0]]);

    // Draw the new route with conditional color
    const color = algoritmo === "dijkstra" ? "red" : "blue";
    const newRoute = L.polyline(coordinates, {
      color: color,
      weight: 4,
      opacity: 0.8,
    }).addTo(map);

    map.fitBounds(newRoute.getBounds());

    setRouteLayer(newRoute);
  }, [map, startNode, endNode, algoritmo]);

  return <div id="map" className="mapa"></div>;
};

export default Mapa;