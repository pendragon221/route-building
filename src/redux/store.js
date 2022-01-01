import { createStore } from 'redux'

const CHANGE_POINT_TEXT = 'CHANGE-POINT-TEXT'
const ADD_WAYPOINT = 'ADD-WAYPOINT'
const UPDATE_MAP = 'UPDATE-MAP'
const SAVE_YMAPS_OBJ = 'SAVE-YMAPS-OBJ'
const ENABLE_MAP = 'ENABLE-MAP'
const UPDATE_DISTANCE_MATRIX = 'UPDATE-DISTANCE-MATRIX'


const initialState = {
    waypoints: [],
    newWaypointText: '',
    map: null,
    ymaps: null,
    isMapVisible: false,
    distanceMatrix: null
}

function mainPageReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE-POINT-TEXT':
            return {
                ...state,
                newWaypointText: action.newText
            }
        case 'ADD-WAYPOINT':
            return {
                ...state,
                waypoints: [...state.waypoints, { id: action.id, pointName: state.newWaypointText }],
                newWaypointText: ''
            }
        case 'UPDATE-MAP':
            return {
                ...state,
                map: action.map
            }
        case 'SAVE-YMAPS-OBJ':
            return {
                ...state,
                ymaps: action.ymaps
            }
        case 'ENABLE-MAP':
            return {
                ...state,
                isMapVisible: true
            }
        case 'UPDATE-DISTANCE-MATRIX':
            return {
                ...state,
                distanceMatrix: action.matrix
            }
        default:
            return state
    }
}


export const changePointTextAC = (text) => {
    return {
        type: CHANGE_POINT_TEXT,
        newText: text
    }
}

export const addWaypointAC = (id) => {
    return {
        type: ADD_WAYPOINT,
        id: id
    }
}
export const updateMapAC = (map) => {
    return {
        type: UPDATE_MAP,
        map: map
    }
}
export const saveYmapsObjAC = (ymaps) => {
    return {
        type: SAVE_YMAPS_OBJ,
        ymaps: ymaps
    }
}
export const enableMapAC = () => {
    return {
        type: ENABLE_MAP
    }
}
export const updateDistanceMatrixAC = (matrix) => {
    return {
        type: UPDATE_DISTANCE_MATRIX,
        matrix: matrix
    }
}

let store = createStore(mainPageReducer)
export default store
