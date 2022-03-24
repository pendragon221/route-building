import React from "react";


const PointsTable = (props) => {
    function startEdit(index) {
        const copy = Object.assign([], props.waypoints);
        copy[index].isEdit = true;
        props.setWaypoints(copy);
    }

    function changeTitle(index, event) {
        const copy = Object.assign([], props.waypoints);
        copy[index].title = event.target.value;
        props.setWaypoints(copy);
    }

    function endEdit(index) {
        const copy = Object.assign([], props.waypoints);
        copy[index].isEdit = false;
        props.setWaypoints(copy);
    }

    function deleteWaypoint(index) {
        const copy = Object.assign([], props.waypoints);
        copy.splice(index, 1)
        props.setWaypoints(copy);
    }

    const wayPointsList = props.waypoints.map((waypoint, index) => {
        let elem
        if (!waypoint.isEdit) {
            elem = waypoint.title
        }
        else {
            elem = <input value={waypoint.title}
                onChange={event => changeTitle(index, event)}
                onBlur={() => endEdit(index)}
                style={{ 'width': '100%', 'margin': '0' }}
            />

        }
        return (
            <tr key={index}>
                <td className='cell-number'>{index + 1}</td>
                <td className='cell-data no-border-right'>{elem}</td>
                <td className='cell-icons no-border-left' style={{ userSelect: 'none' }}>
                    <i className="material-icons button edit" onClick={() => startEdit(index)}>edit</i>
                    <i className="material-icons button delete" onClick={() => deleteWaypoint(index)}>delete</i>
                </td>
            </tr>)
    })
    return (
        <div className={props.waypoints.length !== 0 ? '' : 'disabled'}>
            <table className="points-table">
                <thead>
                    <tr>
                        <th colSpan="3" className="no-border">Точки назначения</th>
                    </tr>
                    <tr>
                        <th className='cell-number'>№</th>
                        <th className='no-border-right'>Адрес</th>
                        <th className="no-border-left cell-icons"></th>
                    </tr>
                </thead>
                <tbody>
                    {wayPointsList}
                </tbody>
            </table>
        </div>
    )
}

export default PointsTable