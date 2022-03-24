import React from 'react';
import { connect } from 'react-redux';
import { addWaypointAC, changePointTextAC, updateWaypointsAC } from './../../redux/store';
import LoginForm from './LoginForm/LoginForm';

const mapStateToProps = (state) => {
    return {
        waypoints: state.waypoints,
        waypointText: state.newWaypointText
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addWaypoint: (id) => {
            dispatch(addWaypointAC(id))
        },
        changePointText: (text) => {
            dispatch(changePointTextAC(text))
        },
        updateWaypoints: (waypoints) => {
            dispatch(updateWaypointsAC(waypoints))
        }
    }
}

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default LoginFormContainer