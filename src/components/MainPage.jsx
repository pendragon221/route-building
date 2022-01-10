import React from 'react';
import FindBestRouteButton from './FindBestRouteButton';
import MainForm from './MainForm';
import MapField from './MapField';
import PointsTable from './PointsTable';
import BestRouteList from './BestRouteList';
import DistanceMatrixBuilder from '../logic/my-algorithms/DistanceMatrixBuilder';
import LoadingAnimation from './LoadingAnimation';

class MainPage extends React.Component {

    addWaypoint = () => {
        this.props.addWaypoint(this.props.waypoints.length + 1)
    }

    onTextChange = (el) => {
        const text = el.target.value
        this.props.changePointText(text)
    }

    findBestRouteButtonClick = () => {
        this.props.loadingOn()
        let waypoints = this.props.waypoints.map((el) => {
            return el.pointName
        })
        DistanceMatrixBuilder.doIt(waypoints)
            .then(res => {
                this.props.updateBestRoutePointsIdArr(res)
                this.props.loadingOff()
            })
    }

    buildRoute = async (points) => {
        console.log('Building route...');
        const map = DistanceMatrixBuilder.createMap('map')
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
        this.props.updateMap(map)
        return distance
    }

    buildRouteButtonClick = () => {
        const index = this.props.currentIndex
        const waypoints = this.props.waypoints
        this.props.enableMap()
        if (index !== -1) {
            this.props.map?.destroy()
            console.log('map: ' + this.props.map);
            if (index + 1 < waypoints.length) {
                this.buildRoute([waypoints[this.props.bestRoutePointsIdArr[index]].pointName,
                waypoints[this.props.bestRoutePointsIdArr[index + 1]].pointName])
                this.props.changeCurrentIndex(index + 1)
            }
            else {
                console.log(index);
                this.buildRoute([waypoints[this.props.bestRoutePointsIdArr[index]].pointName,
                waypoints[this.props.bestRoutePointsIdArr[0]].pointName])
                this.props.changeCurrentIndex(-1)
            }
        }
        else console.log('Построение закончено')
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <div className="todoapp stack-large" >
                <div id="fake-map"></div>

                <h1>
                    Постройте свой маршрут
                </h1>

                <MainForm onTextChange={this.onTextChange}
                    waypointText={this.props.waypointText}
                    addWaypoint={this.addWaypoint} />

                <h2 id="list-heading">
                    В вашем маршруте {this.props.waypoints.length} точек
                </h2>

                <PointsTable waypoints={this.props.waypoints} doWayPointsList={this.doWayPointsList} />

                {this.props.waypoints.length >= 2 ? <FindBestRouteButton
                    findBestRouteButtonClick={this.findBestRouteButtonClick} /> : ''}

                <LoadingAnimation isLoading={this.props.isLoading} />

                {this.props.bestRoutePointsIdArr === null ? '' : <BestRouteList
                    bestRoutePointsIdArr={this.props.bestRoutePointsIdArr}
                    waypoints={this.props.waypoints}
                />}

                {this.props.bestRoutePointsIdArr === null ? '' : <div>
                    <button className='btn toggle-btn'
                        onClick={this.buildRouteButtonClick}>Построить</button>
                </div>}

                <MapField isMapVisible={this.props.isMapVisible} />
            </div>
        )
    }
}

export default MainPage