//import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';



function getTotalSlidesNum(){
    return axios.get('http://localhost:3001/slides/total');
}

function getSlides(limit, offset){
    return axios.get('http://localhost:3001/' + limit + '/' + offset);
}

const RETRIEVE_PENDING = 'slide/RETRIEVE_PENDING';
const RETRIEVE_SUCCESS = 'slide/RETRIEVE_SUCCESS';
const RETRIEVE_FAILURE = 'slide/RETRIEVE_FAILURE';

const TOTALNUM_PENDING = 'slide/TOTALNUM_PENDING';
const TOTALNUM_SUCCESS = 'slide/TOTALNUM_SUCCESS';
const TOTALNUM_FAILURE = 'slide/TOTALNUM_FAILURE';


export const retrieveTable = (limit, offset) => dispatch => {
    dispatch({type : RETRIEVE_PENDING});

    return getSlides(limit, offset).then(
        (response)=> {
            dispatch({
                type: RETRIEVE_SUCCESS,
                payload : response.data.slides
            });
        }
    ).catch( error=> {
        dispatch({
            type : RETRIEVE_FAILURE,
            payload: error
        });
    });
}

export const getTotalNum = () => dispatch => {
    dispatch({type: RETRIEVE_PENDING});

    return getTotalSlidesNum().then(
        (response)=> {
            dispatch({
                type : TOTALNUM_SUCCESS,
                payload : response.data.totalNum
            });
        }
    ).catch( error => {
            dispatch({
                type : TOTALNUM_FAILURE
            });
        }
    )
}

const initialState = {
    totalNum : 0,
    slides: [],
    pendding : false,
}



// List([
//     Map({
//         "sname": 'AS-DOV12-2018',
//         "upload": Date(2018,11,12),
//         "hospital": "AS",
//         "diagnosis": 4,
//         "dying": 'A'
//     }),
//     Map({
//         "sname": 'HY-AUG13-2016',
//         "upload": Date(2016,8,13),
//         "hospital": "HY",
//         "diagnosis": 2,
//         "dying": 'B'
//     }),
//     Map({
//         "sname": 'KK-JUN13-2017',
//         "upload": Date(2017,6,13),
//         "hospital": "KK",
//         "diagnosis": 4,
//         "dying": 'D'
//     }),
//     Map({
//         "sname": 'SS-SEP10-2016',
//         "upload": Date(2016,9,10),
//         "hospital": "SS",
//         "diagnosis": 4,
//         "dying": 'C'
//     }),
//     Map({
//         "sname": 'KR-JAN23-2016',
//         "upload": Date(2016,1,23),
//         "hospital": "KR",
//         "diagnosis": 5,
//         "dying": 'B'
//     }),
//     Map({
//         "sname": 'KR-FEB23-2017',
//         "upload": Date(2017,2,23),
//         "hospital": "KR",
//         "diagnosis": 4,
//         "dying": 'B'
//     }),
//     Map({
//         "sname": 'KK-DEC25-2016',
//         "upload": Date(2016,12,25),
//         "hospital": "KR",
//         "diagnosis": 3,
//         "dying": 'A'
//     }),
//     Map({
//         "sname": 'YS-FEB11-2018',
//         "upload": Date(2018,2,11),
//         "hospital": "KR",
//         "diagnosis": 2,
//         "dying": 'E'
//     }),
// ]);




export default handleActions({
    [RETRIEVE_PENDING] : (state, action) => {
        return {
            ...state,
            pendding : true
        }
    },
    [RETRIEVE_SUCCESS] : (state, action) => {
        return {
            ...state,
            slides : action.payload,
            pendding : false
        }
    },
    [RETRIEVE_FAILURE] : (state, action) => {
        return {
            ...state,
            pendding : false
        }
    },
    [TOTALNUM_PENDING] : (state, action)=> {
        return {
            ...state,
            pendding : true
        }
    },
    [TOTALNUM_SUCCESS] : (state, action) => {
        return {
            ...state,
            totalNum : action.payload,
            pending : false
        }
    },
    [TOTALNUM_FAILURE] : (state, action) => {
        return {
            ...state,
            pendding : false
        }
    }

    // [CREATE]: (state, action) => {
    //     return state.push(Map(action.payload));
    // },
    // [MODIFY]: (state, action) => {
    //     const index = state.findIndex(contact => contact.get('id') === action.payload.id);

    //     return state.mergeIn([index], action.payload.contact);
    // },
    // [REMOVE]: (state, action) => {
    //     const index = state.findIndex(contact => contact.get('id') === action.payload);

    //     return state.delete(index);
    // },

}, initialState)