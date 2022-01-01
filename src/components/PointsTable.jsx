import React from "react";

const PointsTable = (props) => {
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
                    {props.doWayPointsList()}
                </tbody>
            </table>
        </div>
    )
}

export default PointsTable