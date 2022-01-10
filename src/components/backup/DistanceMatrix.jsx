import React from "react";
import Animation from './Animation';

async function buildMatrix(props) {
    const map = new props.ymaps.Map('fake-map', {
        center: [53.90798227, 30.34363726],
        zoom: 16
    });

    props.loadingOn()
    let resultArray = []
    for (let i = 0; i < props.waypoints.length; i++) {
        resultArray[i] = []
    }
    for (let i = 0; i < props.waypoints.length; i++) {
        for (let j = 0; j < props.waypoints.length; j++) {
            if (i === j) {
                resultArray[i][j] = "-"
            }
            else if (i > j) continue
            else {
                const res = await props.buildRoute(
                    [props.waypoints[i].pointName, props.waypoints[j].pointName], map)
                resultArray[i][j] = res
                resultArray[j][i] = res
            }
        }
    }
    console.log(resultArray)
    props.loadingOff()
    props.updateDistanceMatrix(resultArray)
    map.destroy()
}

const buildTable = (props) => {
    return (
        <table>
            <tbody>
                {props.distanceMatrix.map(arr => (<tr>{arr.map(el => <td>{el}</td>)}</tr>))}
            </tbody>
        </table>
    )
}

const DistanceMatrix = (props) => {
    return (
        <div>
            <button onClick={buildMatrix.bind(null, props)} id="calc-matrix-button">Calculate distance matrix</button>
            &nbsp;
            <Animation isLoading={props.isLoading} />
            {props.distanceMatrix === null ? '' : buildTable(props)}
        </div>
    )
}

export default DistanceMatrix