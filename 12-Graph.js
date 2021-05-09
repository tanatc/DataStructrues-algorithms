import { defaultToString } from './utils.js'
import { ValuePair } from './value-pair.js'
import { Queue } from './02-queue.js' 
class Dictionary {
    constructor(toStrFn = defaultToString) {
      this.toStrFn = toStrFn;
      this.table = {};
    }
    set(key, value) {
      if (key != null && value != null) {
        const tableKey = this.toStrFn(key);
        this.table[tableKey] = new ValuePair(key, value);
        return true;
      }
      return false;
    }
    get(key) {
      const valuePair = this.table[this.toStrFn(key)];
      return valuePair == null ? undefined : valuePair.value;
    }
    hasKey(key) {
      return this.table[this.toStrFn(key)] != null;
    }
    remove(key) {
      if (this.hasKey(key)) {
        delete this.table[this.toStrFn(key)];
        return true;
      }
      return false;
    }
    values() {
      return this.keyValues().map(valuePair => valuePair.value);
    }
    keys() {
      return this.keyValues().map(valuePair => valuePair.key);
    }
    keyValues() {
      return Object.values(this.table);
    }
    forEach(callbackFn) {
      const valuePairs = this.keyValues();
      for (let i = 0; i < valuePairs.length; i++) {
        const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
        if (result === false) {
          break;
        }
      }
    }
    isEmpty() {
      return this.size() === 0;
    }
    size() {
      return Object.keys(this.table).length;
    }
    clear() {
      this.table = {};
    }
    toString() {
      if (this.isEmpty()) {
        return '';
      }
      const valuePairs = this.keyValues();
      let objString = `${valuePairs[0].toString()}`;
      for (let i = 1; i < valuePairs.length; i++) {
        objString = `${objString},${valuePairs[i].toString()}`;
      }
      return objString;
    }
  }

  class Graph {
      constructor(isDirected = false) {
          this.isDirected = isDirected
          this.vertices = []
          this.adjList = new Dictionary()
      }

      addVertex (v) {
          if (!this.vertices.includes(v)) {
              this.vertices.push(v)
              this.adjList.set(v, [])
          }
      }

      addEdge (v, w) {
          if (!this.adjList.get(v)) {
              this.addVertex(v)
          }
          if (!this.adjList.get(w)) {
              this.addVertex(w)
          }
          this.adjList.get(v).push(w)
          if (!this.isDirected) {
              this.adjList.get(w).push(v)
          }
      }

      getVertices () {
          return this.vertices
      }

      getAdjList () {
          return this.adjList
      }

      toString () {
          let s = '' 
          for (let i = 0; i < this.vertices.length; i++) {
              s += `${this.vertices[i]} -> `
              const neighbors = this.adjList.get(this.vertices[i])
              for (let j = 0; j < neighbors.length; j++) {
                  s += `${neighbors[j]} `
              }
              s += '\n'
          }
          return s
      }
  }

  const graph = new Graph()
  const myvertices = ['A', 'B','C', 'D', 'E', 'F', 'G', 'H', 'I']
  for (let i = 0; i < myvertices.length; i++) {
      graph.addVertex(myvertices[i])
  }
  graph.addEdge('A', 'B')
  graph.addEdge('A', 'C')
  graph.addEdge('A', 'D')
  graph.addEdge('A', 'E')
  graph.addEdge('A', 'F')
  graph.addEdge('A', 'G')
  graph.addEdge('I', 'B')
  graph.addEdge('E', 'B')
  graph.addEdge('H', 'B')
//   console.log(graph)
//   console.log(graph.toString())

const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
}
const initializeColor = vertices => {
    const color = {}
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE
    }
    return color
}

const breadFirstSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)
    const queue = new Queue()
    queue.enqueue(startVertex)
    while(!queue.isEmpty()) {
        const u = queue.dequeue()
        const neighbors = adjList.get(u)
        color[u] = Colors.GREY
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i]
            if (color[w] ===Colors.WHITE) {
                color[w] = Colors.GREY
                queue.enqueue(w)

            }
        }
        color[u] = Colors.BLACK
        if (callback) {
            callback(u)
        }
    }
}
const printVertex = (value) => console.log('Visited vertex: ' + value)
breadFirstSearch( graph, myvertices[0], printVertex)