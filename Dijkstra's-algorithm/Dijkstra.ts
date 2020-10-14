type Edge = {
    vertex: string,
    weight: number,
};

type AdjacencyList = {
    [key: string]: Edge[]
};

type PriorityQueueItem = {
    val: string,
    priority: number,
};

interface INaivePriorityQueue {
    values: PriorityQueueItem[];
}

interface IWeightedGraph {
    readonly adjacencyList: AdjacencyList;
}

class NaivePriorityQueue implements INaivePriorityQueue {
    values: PriorityQueueItem[] = [];

    enqueue(val: string, priority: number) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort( (a, b) => a.priority - b.priority );
    }
}

class WeightedGraph implements IWeightedGraph {
    adjacencyList: AdjacencyList = {};

    addVertex(vertex: string): IWeightedGraph {
        const vertexFound = this.adjacencyList[vertex];

        if ( !vertexFound ) {
            this.adjacencyList[vertex] = [];
        }

        return this;
    }

    addEdge(vertexOne: string, vertexTwo: string, weight: number): IWeightedGraph {
        this.adjacencyList[vertexOne].push({ vertex: vertexTwo, weight });
        this.adjacencyList[vertexTwo].push({ vertex: vertexOne, weight });
        
        return this;
    }
}

const graph = new WeightedGraph();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");

graph.addEdge("A", "B", 9);
graph.addEdge("A", "C", 5);
graph.addEdge("B", "C", 7);

console.log( graph.adjacencyList );
