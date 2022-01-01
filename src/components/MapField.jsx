import React from "react";

const MapField = (props) => {
    return (
        <div id="map-container" className={props.isMapVisible ? '' : 'disabled'}>
            <div id="map" className={props.isMapVisible ? '' : 'disabled'}></div>
        </div>
    )
}

export default MapField