import React from 'react';
import ymaps$1 from 'ymaps';
import CalcButton from './CalcButton';
import DistanceMatrix from './DistanceMatrix';
import MainForm from './MainForm';
import MapField from './MapField';
import PointsTable from './PointsTable';



class MainPage extends React.Component {

    doWayPointsList = () => {
        const wayPointsList = this.props.waypoints.map((el) => {
            return (
                <tr>
                    <td className='cell-number'>{el.id}</td>
                    <td className='cell-data no-border-right'>{el.pointName}</td>
                    <td className='cell-icons no-border-left'>
                        <i className="material-icons button edit">edit</i>
                        <i className="material-icons button delete">delete</i>
                    </td>
                </tr>)
        })
        return wayPointsList
    }

    addWaypoint = () => {
        this.props.addWaypoint(this.doWayPointsList().length + 1)
    }

    onTextChange = (el) => {
        const text = el.target.value
        this.props.changePointText(text)
    }

    calculateButtonClick = () => {
        let waypoints;
        if (this.props.waypoints.length !== 0) {
            waypoints = this.props.waypoints.map((el) => {
                return el.pointName
            })
        }
        else {
            waypoints = ["Belarus, Mahilioŭ, prospekt Mira, 43", "Беларусь Могилев Улица Каштановая Дом 34"]
        }
        this.buildRoute(waypoints)
        this.props.enableMap()
    }

    loadYmaps = () => {
        ymaps$1
            .load()
            .then(ymaps => {
                this.props.saveYmapsObj(ymaps)
                this.createMap(ymaps)
            })
            .catch(error => console.log('Failed to load Yandex Maps', error));
    }

    createMap = (ymaps) => {
        const map = new ymaps.Map('map', {
            center: [53.90798227, 30.34363726],
            zoom: 16
        });
        this.props.updateMap(map)
    }

    async buildRoute(points, ymaps = this.props.ymaps, map = this.props.map) {
        console.log('Building route...');
        let distance = await ymaps.route(points).then(
            function (res) {
                var pathsObjects = ymaps.geoQuery(res.getPaths()),
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
                var routeObjects = ymaps.geoQuery(edges).addToMap(map);
                var dist = 0;
                routeObjects.each(function (path) {
                    dist += path.geometry.getDistance();
                });
                console.log(dist + "m");
                return dist
            }
        )
        return Math.round(distance)
    }

    componentDidMount = () => {
        this.loadYmaps()
    }

    render() {
        return (
            <div className="todoapp stack-large" >
                <h1>Постройте свой маршрут</h1>
                <MainForm onTextChange={this.onTextChange}
                    waypointText={this.props.waypointText}
                    addWaypoint={this.addWaypoint} />
                <h2 id="list-heading"> В вашем маршруте {this.props.waypoints.length} точек </h2>
                <PointsTable waypoints={this.props.waypoints} doWayPointsList={this.doWayPointsList} />
                <CalcButton waypoints={this.props.waypoints} calculateButtonClick={this.calculateButtonClick} />
                <MapField isMapVisible={this.props.isMapVisible} />
                <DistanceMatrix waypoints={this.props.waypoints}
                    buildRoute={this.buildRoute.bind(this)}
                    updateDistanceMatrix={this.props.updateDistanceMatrix}
                    distanceMatrix={this.props.distanceMatrix}
                />
            </div >
        )
    }
}

export default MainPage