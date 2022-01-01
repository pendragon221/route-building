import React from 'react';
import { connect } from 'react-redux';
import { addWaypointAC, changePointTextAC, updateMapAC, saveYmapsObjAC, enableMapAC, updateDistanceMatrixAC } from '../redux/store';
import MainPage from './MainPage';

const mapStateToProps = (state) => {
    return {
        waypoints: state.waypoints,
        waypointText: state.newWaypointText,
        map: state.map,
        ymaps: state.ymaps,
        isMapVisible: state.isMapVisible,
        distanceMatrix: state.distanceMatrix
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
        updateMap: (map) => {
            dispatch(updateMapAC(map))
        },
        saveYmapsObj: (ymaps) => {
            dispatch(saveYmapsObjAC(ymaps))
        },
        enableMap: () => {
            dispatch(enableMapAC())
        },
        updateDistanceMatrix: () => {
            dispatch(updateDistanceMatrixAC())
        }
    }
}

const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPage)
export default MainPageContainer