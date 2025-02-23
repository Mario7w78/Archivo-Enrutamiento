import { Tools } from "./Tools";
import TinyQueue from 'tinyqueue';
/**
 * Graph: Grafo
 * Nodes: Nodos - Vertice
 * Edges: Conexiones - Aristas
 * 
 */

class Graph {

    constructor() {
      this.nodes = new Set();
      this.edges = new Map();
    }
  
    addNode(node) {
      this.nodes.add(node);
      this.edges.set(node, []);
    }
  
    addEdge(start, end, weight) {
      this.edges.get(start).push({ node: end, weight });
      this.edges.get(end).push({ node: start, weight });
    }
  
    initializeAlgorithm(startNode) {
      const distances = new Map();
      const predecessors = new Map();

      this.nodes.forEach((node) => {
        distances.set(node, Infinity);
        predecessors.set(node, null);
      });
      distances.set(startNode, 0);
      return { distances, predecessors };
    }
  
    shortestPath(start, end, algorithm = "dijkstra", iterations = 10) {
      try {
        let totalExecutionTime = 0;
        let result;
  
        for (let i = 0; i < iterations; i++) {
          const { distances, predecessors, executionTime } =
            algorithm === "dijkstra"
              ? this.dijkstra(start, end)
              : this.bellmanFord(start, end);
          
          totalExecutionTime += executionTime;
          if (i === 0) result = { distances, predecessors };
        }
  
        const avgExecutionTime = totalExecutionTime / iterations;
        const path = Tools.reconstructPath(result.predecessors, end);
  
        return path.length > 1
          ? { path, distance: result.distances.get(end), executionTime: avgExecutionTime, algorithm }
          : { path: [], distance: Infinity };
  
      } catch (error) {
        console.error(`Error en ${algorithm}:`, error.message);
        return { path: [], distance: Infinity };
      }
    }
  
    dijkstra(startNode, endNode) {
      const startTime = performance.now();

      const { distances, predecessors } = this.initializeAlgorithm(startNode);
      const visited = new Array(this.nodes.size).fill(false);
      const priorityQueue = new TinyQueue([], (a, b) => distances.get(a) - distances.get(b));

      priorityQueue.push(startNode);

      while (priorityQueue.length > 0) {
          const currentNode = priorityQueue.pop();

          if (currentNode === endNode) break;
          if (visited[currentNode]) continue;

          visited[currentNode] = true;

          // Relajación
          this.edges.get(currentNode).forEach(({ node, weight }) => {
              if (!visited[node]) {
                  const newDistance = distances.get(currentNode) + weight;
                  if (newDistance < distances.get(node)) {
                      distances.set(node, newDistance);
                      predecessors.set(node, currentNode);
                      priorityQueue.push(node);
                  }
              }
          });
      }

      const endTime = performance.now();
      return { distances, predecessors, executionTime: (endTime - startTime) };
  }

  
    bellmanFord(startNode, endNode) {
      const startTime = performance.now();
      
      const { distances, predecessors } = this.initializeAlgorithm(startNode);
      const edgeList = this.getEdgeList();
  
      for (let i = 0; i < this.nodes.size - 1; i++) {
        let changed = false;
        for (const { source, destination, weight } of edgeList) {
          //relajacion
          if (distances.get(source) + weight < distances.get(destination)) {
            distances.set(destination, distances.get(source) + weight);
            predecessors.set(destination, source);
            changed = true;
          }
        }
        if (!changed) break;
      }
  
      
      for (const { source, destination, weight } of edgeList) {
        if (distances.get(source) + weight < distances.get(destination)) {
          throw new Error("El grafo contiene un ciclo negativo");
        }
      }
  
      const endTime = performance.now();
      return { distances, predecessors, executionTime: (endTime - startTime) };
    }
  
    getEdgeList() {
      const edgeList = [];
      this.edges.forEach((neighbors, source) => {
        neighbors.forEach(({ node: destination, weight }) => {
          edgeList.push({ source, destination, weight });
        });
      });
      return edgeList;
    }
  }
  
  export default Graph;
  