import Graph from "./Graph.js";
import {nodos, coordenadas, conexiones} from "./data.js";
import { Tools } from "./Tools";

class PeruGraph extends Graph {
    constructor(nodos, coordenadas, conexiones) {
      super();
      this.coordenadas = coordenadas;
      this.initializeGraph(nodos, conexiones);
    }
  
    
    initializeGraph(nodos, conexiones) {
      nodos.forEach((nodo) => this.addNode(nodo));
  
      conexiones.forEach(([inicio, fin]) => {
        const [lon1, lat1] = this.coordenadas[inicio];
        const [lon2, lat2] = this.coordenadas[fin];
        const distancia = Tools.calculateDistance(lat1, lon1, lat2, lon2);
        this.addEdge(inicio, fin, distancia);
      });
    }
  }

  const peruGraph = new PeruGraph(nodos, coordenadas, conexiones);
  export default peruGraph;