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

    addVertext( vertex: string ) {
        const vertexFound = this.adjacencyList[ vertex ];

        if ( !vertexFound ) {
            this.adjacencyList[ vertex ] = [];
        }

        return this;
    }

    addEdge( vertextOne: string, vertextTwo: string ) {
        this.adjacencyList[ vertextOne ].push( vertextTwo );
        this.adjacencyList[ vertextTwo ].push( vertextOne );

        return this;
    }

    removeEdge( vertextOne: string, vertextTwo: string ) {
        this.adjacencyList[ vertextOne ] = this.adjacencyList[ vertextOne ].filter( connection => connection !== vertextTwo );
        this.adjacencyList[ vertextTwo ] = this.adjacencyList[ vertextTwo ].filter( connection => connection !== vertextOne );

        return this;
    }

    removeVertex( vertex: string ) {
        while( this.adjacencyList[vertex].length ) {
            const adjacentVertext = this.adjacencyList[ vertex ].pop()!;

            this.removeEdge( vertex, adjacentVertext );
        }

        delete this.adjacencyList[ vertex ];

        return this;
    }

    depthFirstRecursive( startingPoint: string ) {
        const result: string[] = [];
        const visited: { [key: string]: boolean } = {};

        const dfs = ( start: string ) => {
            const startingVertexNeighbours = this.adjacencyList[ start ];

            if ( !startingVertexNeighbours ) {
                return;
            }

            visited[ start ] = true;
            result.push( start );

            startingVertexNeighbours.forEach( ( neighbour: string ) => {
                if ( !visited[ neighbour ] ) {
                    dfs( neighbour );
                }
            } );
        }

        dfs(startingPoint);

        return result;
    }

    depthFirstIterative( startingPoint: string ) {
        const stack: string[] = [];
        const visited: { [key: string]: boolean } = {};
        const result: string[] = [];

        stack.push(...this.adjacencyList[startingPoint]);
        result.push(startingPoint);
        visited[startingPoint] = true;

        while( stack.length > 0 ) {
            const currentVertex = stack.pop() as string;

            if ( !visited[currentVertex] ) {
                const neighbours = this.adjacencyList[currentVertex];

                stack.push( ...neighbours );
                result.push(currentVertex);
                visited[currentVertex] = true;
            }
        }

        return result;
    }

    breadthFirst( startingPoint: string ) {
        const stack: string[] = [];
        const visited: { [key: string]: boolean } = {};
        const result: string[] = [];

        stack.push(...this.adjacencyList[startingPoint]);
        result.push(startingPoint);
        visited[startingPoint] = true;

        while( stack.length > 0 ) {
            const currentVertex = stack.shift() as string;

            if ( !visited[currentVertex] ) {
                const neighbours = this.adjacencyList[currentVertex];

                stack.push( ...neighbours );
                result.push(currentVertex);
                visited[currentVertex] = true;
            }
        }

        return result;
    }
}

const graph = new Graph();

graph.addVertext("A");
graph.addVertext("B");
graph.addVertext("C");
graph.addVertext("D");
graph.addVertext("E");
graph.addVertext("F");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");

console.log( graph.breadthFirst("A") );
