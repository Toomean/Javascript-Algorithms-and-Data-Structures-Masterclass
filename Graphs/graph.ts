type AdjacencyList = {
    [key: string]: string[]
}

interface IGraph<T> {
    readonly adjacencyList: AdjacencyList;

    addVertext(vertext: string): IGraph<T>;
    addEdge(vertextOne: string, vertextTwo: string): IGraph<T>;
    removeEdge(vertexOne: string, vertexTwo: string): IGraph<T>;
    removeVertex(vertex: string): IGraph<T>;
}

class Graph<T> implements IGraph<T> {
    readonly adjacencyList: AdjacencyList = {};

    addVertext(vertex: string) {
        const vertexFound = this.adjacencyList[vertex];

        if (!vertexFound) {
            this.adjacencyList[vertex] = [];
        }

        return this;
    }

    addEdge(vertextOne: string, vertextTwo: string) {
        this.adjacencyList[vertextOne].push(vertextTwo);
        this.adjacencyList[vertextTwo].push(vertextOne);

        return this;
    }

    removeEdge(vertextOne: string, vertextTwo: string) {
        this.adjacencyList[vertextOne] = this.adjacencyList[vertextOne].filter(connection => connection !== vertextTwo);
        this.adjacencyList[vertextTwo] = this.adjacencyList[vertextTwo].filter(connection => connection !== vertextOne);

        return this;
    }

    removeVertex(vertex: string) {
        while( this.adjacencyList[vertex].length ) {
            const adjacentVertext = this.adjacencyList[vertex].pop()!;

            this.removeEdge(vertex, adjacentVertext);
        }

        delete this.adjacencyList[vertex];

        return this;
    }
}

const graph = new Graph();

graph.addVertext("Tokio");
graph.addVertext("Moscow");
graph.addVertext("London");

graph.addEdge("Tokio", "London");
graph.addEdge("London", "Moscow");

graph.removeVertex("Moscow");

console.log(graph)
