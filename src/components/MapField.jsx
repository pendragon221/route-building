import React from "react";

const MapField = (props) => {
    return (
        <div id="map-container" className={props.isMapVisible ? '' : 'disabled'} style={{ userSelect: 'none' }}>
            <div id="map" className={props.isMapVisible ? '' : 'disabled'}></div>
        </div>
    )
}

export default MapField