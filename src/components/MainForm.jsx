import React from "react";

const MainForm = (props) => {
    return (
        <form>
            <h2 className="label-wrapper">
                {/* <label htmlFor="new-todo-input" className="label__lg">
                    Какая точка назначения?
                </label> */}
            </h2>
            <input type="text"
                id="new-todo-input"
                className="input input__lg"
                placeholder='Введите адрес...'
                onChange={props.onTextChange}
                value={props.waypointText}>

            </input>
            <button className="btn btn__primary btn__lg" type="button" onClick={props.addWaypoint}>Добавить</button>
        </form>
    )
}

export default MainForm