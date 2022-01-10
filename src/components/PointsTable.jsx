import React from "react";


const PointsTable = (props) => {
    const wayPointsList = props.waypoints.map((el) => {
        return (
            <tr>
                <td className='cell-number'>{el.id}</td>
                <td className='cell-data no-border-right'>{el.pointName}</td>
                <td className='cell-icons no-border-left'>
                    <i className="material-icons button edit">edit</i>
                    <i className="material-icons button delete">delete</i>
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