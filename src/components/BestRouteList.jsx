import React from "react";


const makePathList = (pointsIdArr, waypoints) => {
    return (
        <ul>
            {pointsIdArr.map((el) => <li>{waypoints[el].pointName}</li>)}
        </ul>
    )
}

const BestRouteList = (props) => {


    return (
        <div>
            <h3>Оптимальный маршрут</h3>
            {makePathList(props.bestRoutePointsIdArr, props.waypoints)}
        </div>
    )
}

export default BestRouteList