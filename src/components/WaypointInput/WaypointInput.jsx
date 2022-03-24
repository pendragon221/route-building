import React, { useState } from 'react';

const WaypointInput = (props) => {
    const updateWaypointText = (event, index = props.index) => {
        console.log(props)
        props.updateWaypoint(index, event.target.value)
    }
    return (
        <div>
            <input type="text" placeholder="Новая точка маршрута" onChange={updateWaypointText}></input>
        </div>
    )
};

export default WaypointInput;
