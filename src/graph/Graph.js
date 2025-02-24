import { Tools } from "./Tools";
import FastPriorityQueue from "fastpriorityqueue";



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
  
    shortestPath(start, end, algorithm = "dijkstra", iterations = 3) {
      try {
          let totalExecutionTime = 0;
          let result;
  
          for (let i = 0; i < iterations; i++) {
              const startTime = performance.now(); 
  
              const res = algorithm === "dijkstra"
                  ? this.dijkstra(start, end)
                  : this.bellmanFord(start, end);
  
              const endTime = performance.now(); 
              totalExecutionTime += (endTime - startTime); 
  
              if (i === 0) result = res; 
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

    const { distances, predecessors } = this.initializeAlgorithm(startNode);

    const visited = new Set();
    const priorityQueue = new FastPriorityQueue((a, b) => a.priority < b.priority);
    
    priorityQueue.add({ node: startNode, priority: 0 });

    while (!priorityQueue.isEmpty()) {
        const { node: currentNode } = priorityQueue.poll();

        if (visited.has(currentNode)) continue;
        visited.add(currentNode);

        if (currentNode === endNode) break;

        this.edges.get(currentNode).forEach(({ node, weight }) => {
            if (!visited.has(node)) {
                const newDistance = distances.get(currentNode) + weight;
                if (newDistance < distances.get(node)) {
                    distances.set(node, newDistance);
                    predecessors.set(node, currentNode);
                    priorityQueue.add({ node, priority: newDistance });
                }
            }
        });
    }

    
    return { distances, predecessors};
}


  
    bellmanFord(startNode, endNode) {
      
      
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

      
      return { distances, predecessors};
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
  