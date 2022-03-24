import React from 'react';
import FindBestRouteButton from './FindBestRouteButton';
import MainForm from './MainForm';
import MapField from './MapField';
import PointsTable from './PointsTable';
import BestRouteList from './BestRouteList';
import DistanceMatrixBuilder from '../logic/my-algorithms/DistanceMatrixBuilder';
import LoadingAnimation from './LoadingAnimation';
import { NavLink } from 'react-router-dom';


class MainPage extends React.Component {

    findBestRouteButtonClick = () => {
        this.props.loadingOn()
        let waypoints = this.props.waypoints.map((el) => {
            return el.title
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
                this.buildRoute([waypoints[this.props.bestRoutePointsIdArr[index]].title,
                waypoints[this.props.bestRoutePointsIdArr[index + 1]].title])
                this.props.changeCurrentIndex(index + 1)
            }
            else {
                console.log(index);
                this.buildRoute([waypoints[this.props.bestRoutePointsIdArr[index]].title,
                waypoints[this.props.bestRoutePointsIdArr[0]].title])
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
                <NavLink to="/">Login</NavLink>
                <div id="fake-map"></div>

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