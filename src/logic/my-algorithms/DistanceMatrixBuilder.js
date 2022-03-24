import ymapsLoader from 'ymaps';
import Graph from '../js-algorithms/Graph';
import GraphEdge from '../js-algorithms/GraphEdge'
import GraphVertex from '../js-algorithms/GraphVertex'
import bfTravellingSalesman from '../js-algorithms/bfTravellingSalesman.js '

class DistanceMatrixBuilder {

    static ymaps = null

    static loadYmaps = async () => {
        await ymapsLoader
            .load()
            .then(obj => { DistanceMatrixBuilder.ymaps = obj })
            .catch(error => console.log('Failed to load Yandex Maps', error));
    }

    static createMap = (divId) => {
        let map = new DistanceMatrixBuilder.ymaps.Map(divId, {
            center: [53.90798227, 30.34363726],
            zoom: 16
        })
        return map
    }

    static buildMatrix = async (waypoints) => {
        const map = DistanceMatrixBuilder.createMap('fake-map')
        let resultArray = []
        for (let i = 0; i < waypoints.length; i++) {
            resultArray[i] = []
        }
        for (let i = 0; i < waypoints.length; i++) {
            for (let j = 0; j < waypoints.length; j++) {
                if (i === j) {
                    resultArray[i][j] = "-"
                }
                else if (i > j) continue
                else {
                    const res = await DistanceMatrixBuilder.buildRoute(
                        [waypoints[i], waypoints[j]], map)
                    resultArray[i][j] = res
                    resultArray[j][i] = res
                }
            }
        }
        map.destroy()
        console.log(resultArray)
        return resultArray
    }

    static buildRoute = async (points) => {
        console.log('Building route...');
        const map = DistanceMatrixBuilder.createMap('fake-map')
        let distance = await DistanceMatrixBuilder.ymaps.route(points).then(
            function (res) {
                var pathsObjects = DistanceMatrixBuilder.ymaps.geoQuery(res.getPaths()),
                    edges = [];
                pathsObjects.each(function (path) {
                    var coordinates = path.geometry.getCoordinates();
                    for (var i = 1, l = coordinates.length; i < l; i++) {
                        edges.push({
                            type: 'LineString',
                            coordinates: [coordinates[i], coordinates[i - 1]],
                            options: {
                                simplification: true
                            }
                        });
                    }
                }
                )
                map.setCenter(edges[0].coordinates[0])
                var routeObjects = DistanceMatrixBuilder.ymaps.geoQuery(edges).addToMap(map);
                var dist = 0;
                routeObjects.each(function (path) {
                    dist += path.geometry.getDistance();
                });
                dist = Math.round(dist)
                console.log(dist + "m");
                return dist
            }
        )
            .catch(error => console.log('Failed to route', error))
        map.destroy()
        return distance
    }

    static buildGraph = (distanceMatrix) => {
        let myGraph = new Graph()
        let vertexes = []
        let edges = []

        for (let i = 0; i < distanceMatrix.length; i++) {
            vertexes.push(new GraphVertex(i))
        }

        for (let i = 0; i < distanceMatrix.length; i++) {
            for (let j = 0; j < distanceMatrix.length; j++) {
                if (i === j || i > j) continue
                else {
                    edges.push(new GraphEdge(vertexes[i], vertexes[j], distanceMatrix[i][j]))
                }
            }
        }

        vertexes.forEach(vertex => myGraph.addVertex(vertex))

        edges.forEach(edge => myGraph.addEdge(edge))
        return myGraph
    }

    static calcPointsOrder = (myGraph) => {
        const res = bfTravellingSalesman(myGraph)
        let pointsOrder = res.map(el => el.value)
        return pointsOrder
    }

    static doIt = async (waypoints) => {
        let resArr = await DistanceMatrixBuilder.loadYmaps()
            .then(() => DistanceMatrixBuilder.buildMatrix(waypoints))
            .then(matrix => DistanceMatrixBuilder.buildGraph(matrix))
            .then(graph => DistanceMatrixBuilder.calcPointsOrder(graph))
        return resArr
    }
}

export default DistanceMatrixBuilder

const obj = {
    ymaps: null,
    loadYmaps: async () => {
        await ymapsLoader
            .load()
            .then(obj => { this.ymaps = obj })
            .catch(error => console.log('Failed to load Yandex Maps', error));
    },
    createMap: (divId) => {
        let map = new this.ymaps.Map(divId, {
            center: [53.90798227, 30.34363726],
            zoom: 16
        })
        return map
    },
    buildMatrix: async (waypoints) => {
        const map = this.createMap('fake-map')
        let resultArray = []
        for (let i = 0; i < waypoints.length; i++) {
            resultArray[i] = []
        }
        for (let i = 0; i < waypoints.length; i++) {
            for (let j = 0; j < waypoints.length; j++) {
                if (i === j) {
                    resultArray[i][j] = "-"
                }
                else if (i > j) continue
                else {
                    const res = await this.buildRoute(
                        [waypoints[i], waypoints[j]], map)
                    resultArray[i][j] = res
                    resultArray[j][i] = res
                }
            }
        }
        map.destroy()
        return resultArray
    },
    buildRoute: async (points) => {
        console.log('Building route...');
        const map = this.createMap('fake-map')
        let distance = await this.ymaps.route(points).then(
            function (res) {
                var pathsObjects = this.ymaps.geoQuery(res.getPaths()),
                    edges = [];
                pathsObjects.each(function (path) {
                    var coordinates = path.geometry.getCoordinates();
                    for (var i = 1, l = coordinates.length; i < l; i++) {
                        edges.push({
                            type: 'LineString',
                            coordinates: [coordinates[i], coordinates[i - 1]],
                            options: {
                                simplification: true
                            }
                        });
                    }
                }
                )
                map.setCenter(edges[0].coordinates[0])
                var routeObjects = this.ymaps.geoQuery(edges).addToMap(map);
                var dist = 0;
                routeObjects.each(function (path) {
                    dist += path.geometry.getDistance();
                });
                dist = Math.round(dist)
                console.log(dist + "m");
                return dist
            }
        )
            .catch(error => console.log('Failed to route', error))
        map.destroy()
        return distance
    },
    buildGraph: (distanceMatrix) => {
        let myGraph = new Graph()
        let vertexes = []
        let edges = []

        for (let i = 0; i < distanceMatrix.length; i++) {
            vertexes.push(new GraphVertex(i))
        }

        for (let i = 0; i < distanceMatrix.length; i++) {
            for (let j = 0; j < distanceMatrix.length; j++) {
                if (i === j || i > j) continue
                else {
                    edges.push(new GraphEdge(vertexes[i], vertexes[j], distanceMatrix[i][j]))
                }
            }
        }

        vertexes.forEach(vertex => myGraph.addVertex(vertex))

        edges.forEach(edge => myGraph.addEdge(edge))
        return myGraph
    },
    calcPointsOrder: (myGraph) => {
        const res = bfTravellingSalesman(myGraph)
        let pointsOrder = res.map(el => el.value)
        return pointsOrder
    },
    doIt: async (waypoints) => {
        let resArr = await this.loadYmaps()
            .then(() => this.buildMatrix(waypoints))
            .then(matrix => this.buildGraph(matrix))
            .then(graph => this.calcPointsOrder(graph))
        return resArr
    }
}