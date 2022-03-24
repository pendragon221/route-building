import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LoginForm.module.css'
import MainForm from './../../MainForm'
import PointsTable from './../../PointsTable'


const LoginForm = (props) => {

	const addWaypoint = () => {
		if (props.waypointText.length !== 0) {
			props.addWaypoint(props.waypoints.length + 1)
		}
	}

	const onTextChange = (el) => {
		const text = el.target.value
		props.changePointText(text)
	}

	return (
		<div className={styles.loginForm}>
			<NavLink to="/mainpage">Mainpage</NavLink>
			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<MainForm onTextChange={onTextChange}
				waypointText={props.waypointText}
				addWaypoint={addWaypoint} />
			<h2 id="list-heading"> Количество точек в машруте: {props.waypoints.length} </h2>
			<PointsTable waypoints={props.waypoints} setWaypoints={props.updateWaypoints} />
			<br></br>
			{/* <button className='btn toggle-btn'>Отправить</button> */}
		</div>
	)
};

export default LoginForm;
