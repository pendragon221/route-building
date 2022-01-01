import React from "react";

const CalcButton = (props) => {
    return (
        <div id="calc-button-wrapper" className={props.waypoints.length >= 2 ? '' : 'disabled'}>
            <button className="btn" id="calc-button" onClick={props.calculateButtonClick}>Построить маршрут</button>
        </div>
    )
}

export default CalcButton