type AdjacencyList = {
    [key: string]: string[]
}

interface IGraph<T> {
    readonly adjacencyList: AdjacencyList;

    addVertex(vertex: string): IGraph<T>;
    addEdge(vertexOne: string, vertexTwo: string): IGraph<T>;
    removeEdge(vertexOne: string, vertexTwo: string): IGraph<T>;
    removeVertex(vertex: string): IGraph<T>;
}

class Graph<T> implements IGraph<T> {
    readonly adjacencyList: AdjacencyList = {};

    addVertex( vertex: string ) {
        const vertexFound = this.adjacencyList[ vertex ];

        if ( !vertexFound ) {
            this.adjacencyList[ vertex ] = [];
        }

        return this;
    }

    addEdge( vertexOne: string, vertexTwo: string ) {
        this.adjacencyList[ vertexOne ].push( vertexTwo );
        this.adjacencyList[ vertexTwo ].push( vertexOne );

        return this;
    }

    removeEdge( vertexOne: string, vertexTwo: string ) {
        this.adjacencyList[ vertexOne ] = this.adjacencyList[ vertexOne ].filter( connection => connection !== vertexTwo );
        this.adjacencyList[ vertexTwo ] = this.adjacencyList[ vertexTwo ].filter( connection => connection !== vertexOne );

        return this;
    }

    removeVertex( vertex: string ) {
        while( this.adjacencyList[vertex].length ) {
            const adjacentVertex = this.adjacencyList[ vertex ].pop()!;

            this.removeEdge( vertex, adjacentVertex );
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

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");

console.log( graph.breadthFirst("A") );
