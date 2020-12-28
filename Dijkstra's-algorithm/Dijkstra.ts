interface IEdge {
    vertex: string;
    weight: number;
}

interface IAdjacencyList {
    [key: string]: IEdge[];
}

interface IWeightedGraph {
    readonly adjacencyList: IAdjacencyList;

    addVertex(vertex: string): IWeightedGraph;
    addEdge(vertexOne: string, vertexTwo: string, weight: number): IWeightedGraph;
}

interface IPriorityQueueItem {
    value: string;
    priority: number;
}

interface INaivePriorityQueue {
    values: IPriorityQueueItem[];
}

interface IDijkstraDistances {
    [key: string]: number;
}

interface IDijkstraPrevious {
    [key: string]: string | null;
}

class NaivePriorityQueue implements INaivePriorityQueue {
    readonly values: IPriorityQueueItem[] = [];

    enqueue(value: string, priority: number) {
        this.values.push({ value, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    get length() {
        return this.values.length;
    }

    private sort() {
        this.values.sort( (a, b) => a.priority - b.priority );
    }
}

class WeightedGraph implements IWeightedGraph {
    adjacencyList: IAdjacencyList = {};

    constructor() {}

    addVertex(vertex: string): IWeightedGraph {
        const vertexFound = this.adjacencyList[vertex];

        if (!vertexFound) {
            this.adjacencyList[vertex] = [];
        }

        return this;
    }

    addEdge(vertexOne: string, vertexTwo: string, weight: number): IWeightedGraph {
        this.adjacencyList[vertexOne].push({vertex: vertexTwo, weight});
        this.adjacencyList[vertexTwo].push({vertex: vertexOne, weight});

        return this;
    }

    execDijkstra(startingVertex: string, endingVertex: string) {
        let path: string[] = [];
        const verticesPriorityQueue: NaivePriorityQueue = new NaivePriorityQueue();
        const previous: IDijkstraPrevious = {};
        const distances: IDijkstraDistances = Object.keys(this.adjacencyList)
            .reduce((acc: IDijkstraDistances, curr) => {
                acc[curr] = curr === startingVertex
                    ? 0
                    : Infinity;

                return acc;
            }, {});

        Object.entries(distances).forEach(([vertex, weight]) => {
            verticesPriorityQueue.enqueue(vertex, weight);
            previous[vertex] = null;
        });

        while(verticesPriorityQueue.length > 0) {
            const { value: currentVertex, priority: currentVertexWeight } = verticesPriorityQueue.dequeue()!;

            if (currentVertex === endingVertex) {
                let currentStep = currentVertex;

                if ( previous[endingVertex] === null ) {
                    return [];
                }

                do {
                    path.push(currentStep);
                    currentStep = previous[currentStep];
                } while (currentStep !== null);

                path = path.reverse();

                break;
            }

            this.adjacencyList[currentVertex].forEach(({ vertex: neighbourVertex, weight: neighbourWeight }) => {
                const weightFromCurrentVertex = currentVertexWeight + neighbourWeight;

                if (weightFromCurrentVertex < distances[neighbourVertex]) {
                    distances[neighbourVertex] = weightFromCurrentVertex;
                    previous[neighbourVertex] = currentVertex;
                    verticesPriorityQueue.enqueue(neighbourVertex, weightFromCurrentVertex);
                }
            })
        }

        return path;
    }
}

const weightedGraph = new WeightedGraph();

weightedGraph
    .addVertex('A')
    .addVertex('B')
    .addVertex('C')
    .addVertex('D')
    .addVertex('E')
    .addVertex('F')
    .addEdge('A', 'B', 4)
    .addEdge('A', 'C', 2)
    .addEdge('B', 'E', 3)
    .addEdge('C', 'D', 2)
    .addEdge('C', 'F', 4)
    .addEdge('D', 'E', 3)
    .addEdge('D', 'F', 1)
    .addEdge('E', 'F', 1);

weightedGraph.execDijkstra('A', 'E');
