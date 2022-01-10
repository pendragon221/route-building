import React from "react";

const FindBestRouteButton = (props) => {
    return (
        <div id="calc-button-wrapper">
            <button className="btn" id="calc-button" onClick={props.findBestRouteButtonClick}>
                Найти оптимальный маршрут
            </button>
        </div>
    )
}

export default FindBestRouteButton