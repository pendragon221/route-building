import React from "react";


const makePathList = (pointsIdArr, waypoints) => {
    return (
        <ul>
            {pointsIdArr.map((el, index) => <li key={index}>{waypoints[el].title}</li>)}
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