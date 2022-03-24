import { createStore } from 'redux'

const CHANGE_POINT_TEXT = 'CHANGE-POINT-TEXT'
const ADD_WAYPOINT = 'ADD-WAYPOINT'
const UPDATE_MAP = 'UPDATE-MAP'
const SAVE_YMAPS_OBJ = 'SAVE-YMAPS-OBJ'
const ENABLE_MAP = 'ENABLE-MAP'
const UPDATE_DISTANCE_MATRIX = 'UPDATE-DISTANCE-MATRIX'
const LOADING_ON = 'LOADING-ON'
const LOADING_OFF = 'LOADING-OFF'
const UPDATE_BEST_ROUTE_POINTS_ID_ARR = 'UPDATE-BEST-ROUTE-POINTS-ID-ARR'
const CHANGE_CURRENT_INDEX = 'CHANGE-CURRENT-INDEX'
const UPDATE_WAYPOINTS = 'UPDATE-WAYPOINTS'


const initialState = {
    waypoints: [
        { title: "каштановая 1 могилев беларусь", isEdit: false },
        { title: "каштановая 10 могилев беларусь", isEdit: false },
        { title: "каштановая 20 могилев беларусь", isEdit: false },
        { title: "каштановая 30 могилев беларусь", isEdit: false },
        { title: "каштановая 34 могилев беларусь", isEdit: false },
    ],
    newWaypointText: '',
    map: null,
    ymaps: null,
    isMapVisible: false,
    distanceMatrix: null,
    isLoading: false,
    bestRoutePointsIdArr: null,
    currentIndex: 0
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
                waypoints: [...state.waypoints, { title: state.newWaypointText, isEdit: false }],
                newWaypointText: ''
            }
        case 'UPDATE-WAYPOINTS':
            return {
                ...state,
                waypoints: action.waypoints
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
        case 'LOADING-ON':
            return {
                ...state,
                isLoading: true
            }
        case 'LOADING-OFF':
            return {
                ...state,
                isLoading: false
            }
        case 'UPDATE-BEST-ROUTE-POINTS-ID-ARR':
            return {
                ...state,
                bestRoutePointsIdArr: action.arr
            }
        case 'CHANGE-CURRENT-INDEX':
            return {
                ...state,
                currentIndex: action.currentIndex
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

export const updateWaypointsAC = (waypoints) => {
    return {
        type: UPDATE_WAYPOINTS,
        waypoints: waypoints
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
export const loadingOnAC = () => {
    return {
        type: LOADING_ON,
    }
}
export const loadingOffAC = () => {
    return {
        type: LOADING_OFF,
    }
}
export const updateBestRoutePointsIdArrAC = (arr) => {
    return {
        type: UPDATE_BEST_ROUTE_POINTS_ID_ARR,
        arr: arr
    }
}
export const changeCurrentIndexAC = (currentIndex) => {
    return {
        type: CHANGE_CURRENT_INDEX,
        currentIndex: currentIndex
    }
}

let store = createStore(mainPageReducer)
window.store = store
export default store
