//import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const host = 'http://localhost:';
const port = '3001';


function getTotalSlidesNum(){
    return axios.get(host + port  + '/slides/total');
}

function getSlides(limit, offset, orderby, range){
    var url = host + port  + '/slides/get/' + limit + '/' + offset+ '/' + orderby + '/' + range;
    console.log(url);
    return axios.get(url);
}

function getChart(chart){
    var url = host + port  + '/slides/chart/'+ chart;
    return axios.get(url);
}


const RETRIEVE_PENDING = 'slide/RETRIEVE_PENDING';
const RETRIEVE_SUCCESS = 'slide/RETRIEVE_SUCCESS';
const RETRIEVE_FAILURE = 'slide/RETRIEVE_FAILURE';

const TOTALNUM_PENDING = 'slide/TOTALNUM_PENDING';
const TOTALNUM_SUCCESS = 'slide/TOTALNUM_SUCCESS';
const TOTALNUM_FAILURE = 'slide/TOTALNUM_FAILURE';

const RETRIEVE_CHART_PENDING = {
    SPY : 'slide/RETRIEVE_SPY_PENDING',
    SPD : 'slide/RETRIEVE_SPD_PENDING',
    SPH : 'slide/RETRIEVE_SPH_PENDING',
    SPYS : 'slide/RETRIEVE_SPYS_PENDING',
    SPDS : 'slide/RETRIEVE_SPDS_PENDING'
}; 
const RETRIEVE_CHART_SUCCESS = {
    SPY : 'slide/RETRIEVE_SPY_SUCCESS',
    SPD : 'slide/RETRIEVE_SPD_SUCCESS',
    SPH : 'slide/RETIREVE_SPH_SUCCESS',
    SPYS : 'slide/RETRIEVE_SPYS_SUCCESS',
    SPDS : 'slide/RETRIEVE_SPDS_SUCCESS'
};
const RETRIEVE_CHART_FAILURE = {
    SPY : 'slide/RETRIEVE_SPY_FAILURE',
    SPD : 'slide/RETRIEVE_SPD_FAILURE',
    SPH : 'slide/RETRIEVE_SPH_FAILURE',
    SPYS : 'slide/RETRIEVE_SPYS_FAILURE',
    SPDS : 'slide/RETRIEVE_SPDS_FAILURE'
};

export const retrieveTable = (limit, offset, orderby, range) => dispatch => {
    dispatch({type : RETRIEVE_PENDING});
    return getSlides(limit, offset, orderby, range).then(
        (response)=> {
            dispatch({
                type: RETRIEVE_SUCCESS,
                payload : response.data
            });
        }
    ).catch( error=> {
        dispatch({
            type : RETRIEVE_FAILURE,
            payload: error
        });
    });
}

export const retrieveTotalNum = () => dispatch => {
    dispatch({type: TOTALNUM_PENDING});

    return getTotalSlidesNum().then(
        (response)=> {
            console.log(response.data);
            dispatch({
                type : TOTALNUM_SUCCESS,
                payload : response.data
            });
        }
    ).catch( error => {
            dispatch({
                type : TOTALNUM_FAILURE
            });
        }
    )
}

export const retrieveChart = (chart) => dispatch => {
    dispatch({type: RETRIEVE_CHART_PENDING[chart]});

    return getChart(chart).then(
        (response)=> {
            console.log(response.data);
            dispatch({
                type : RETRIEVE_CHART_SUCCESS[chart],
                payload : response.data
            });
        }
    )
    .catch( error => {
        dispatch({
            type : RETRIEVE_CHART_FAILURE[chart]
        })
    });
}


const initialState = {
    totalNum : 0,
    totalPending : false,
    slides: [],
    slidePending : false,
    spy : [],
    spyPending : false,
    sph : [],
    sphPending : false,
    spd : [],
    spdPending : false,
    spds : [],
    spdsPending : false,
    spys : [],
    spyspending : false
}

export default handleActions({
    [RETRIEVE_PENDING] : (state, action) => {
        return {
            ...state,
            slidePending : true
        }
    },
    [RETRIEVE_SUCCESS] : (state, action) => {
        return {
            ...state,
            slides : action.payload,
            slidePending : false
        }
    },
    [RETRIEVE_FAILURE] : (state, action) => {
        return {
            ...state,
            slidePending : false
        }
    },
    [TOTALNUM_PENDING] : (state, action)=> {
        return {
            ...state,
            totalPending : true
        }
    },
    [TOTALNUM_SUCCESS] : (state, action) => {
        return {
            ...state,
            totalNum : action.payload,
            totalPending : false
        }
    },
    [TOTALNUM_FAILURE] : (state, action) => {
        return {
            ...state,
            totalPending : false
        }
    },
    [RETRIEVE_CHART_PENDING['SPY']] : (state, action) => {
        return {
            ...state,
            spyPending : true
        }
    },
    [RETRIEVE_CHART_SUCCESS['SPY']] : (state, action) => {
        return {
            ...state,
            spy : action.payload,
            spyPending : false
        }
    },
    [RETRIEVE_CHART_FAILURE['SPY']] : (state, action) => {
        return {
            ...state,
            spyPending : false
        }
    },
    [RETRIEVE_CHART_PENDING['SPH']] : (state, action) => {
        return {
            ...state,
            sphPending : true
        }
    },
    [RETRIEVE_CHART_SUCCESS['SPH']] : (state, action) => {
        return {
            ...state,
            sph : action.payload,
            sphPending : false
        }
    },
    [RETRIEVE_CHART_FAILURE['SPH']] : (state, action) => {
        return {
            ...state,
            sphPending : false
        }
    },
    [RETRIEVE_CHART_PENDING['SPD']] : (state, action) => {
        return {
            ...state,
            spdPending : true
        }
    },
    [RETRIEVE_CHART_SUCCESS['SPD']] : (state, action) => {
        return {
            ...state,
            spd : action.payload,
            spdPending : false
        }
    },
    [RETRIEVE_CHART_FAILURE['SPD']] : (state, action) => {
        return {
            ...state,
            spdPending : false
        }
    },
    [RETRIEVE_CHART_PENDING['SPDS']] : (state, action) => {
        return {
            ...state,
            spdsPending : true
        }
    },
    [RETRIEVE_CHART_SUCCESS['SPDS']] : (state, action) => {
        return {
            ...state,
            spds : action.payload,
            spdsPending : false
        }
    },
    [RETRIEVE_CHART_FAILURE['SPDS']] : (state, action) => {
        return {
            ...state,
            spdsPending : false
        }
    },
    [RETRIEVE_CHART_PENDING['SPYS']] : (state, action) => {
        return {
            ...state,
            spysPending : true
        }
    },
    [RETRIEVE_CHART_SUCCESS['SPYS']] : (state, action) => {
        return {
            ...state,
            spys : action.payload,
            spysPending : false
        }
    },
    [RETRIEVE_CHART_FAILURE['SPYS']] : (state, action) => {
        return {
            ...state,
            spysPending : false
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