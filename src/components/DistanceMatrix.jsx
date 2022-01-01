import React from "react";


async function buildMatrix(props) {
    let resultArray = []
    for (let i = 0; i < props.waypoints.length; i++) {
        resultArray[i] = []
        for (let j = 0; j < props.waypoints.length; j++) {
            if (i === j) {
                resultArray[i][j] = "-"
            }
            else {
                resultArray[i][j] = await props.buildRoute([props.waypoints[i].pointName, props.waypoints[j].pointName])
            }
        }
    }
    console.log(resultArray)
    props.updateDistanceMatrix(resultArray)
}

const buildTable = (props) => {
    const table = props.distanceMatrix.map(arr => {
        return (<tr>
            {arr.map(el => {
                return (
                    <td>{el}</td>
                )
            })}
        </tr>
        )
    })
    return table
}

const DistanceMatrix = (props) => {

    return (
        <div>
            <button onClick={buildMatrix.bind(null, props)}>Calc</button>
            <table>{props.distanceMatrix === null ? '' : buildTable(props)}</table>
        </div>
    )
}

export default DistanceMatrix