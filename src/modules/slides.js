//import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';



function getTotalSlidesNum(){
    return axios.get('http://localhost:3001/slides/total');
}

function getSlides(limit, offset, orderby, range){
    var url = 'http://localhost:3001/slides/get/' + limit + '/' + offset+ '/' + orderby + '/' + range;
    console.log(url);
    return axios.get(url);
}

const RETRIEVE_PENDING = 'slide/RETRIEVE_PENDING';
const RETRIEVE_SUCCESS = 'slide/RETRIEVE_SUCCESS';
const RETRIEVE_FAILURE = 'slide/RETRIEVE_FAILURE';

const TOTALNUM_PENDING = 'slide/TOTALNUM_PENDING';
const TOTALNUM_SUCCESS = 'slide/TOTALNUM_SUCCESS';
const TOTALNUM_FAILURE = 'slide/TOTALNUM_FAILURE';


export const retrieveTable = (limit, offset, orderby, range) => dispatch => {
    dispatch({type : RETRIEVE_PENDING});
    console.log(limit, offset, orderby, range );
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

export const getTotalNum = () => dispatch => {
    dispatch({type: RETRIEVE_PENDING});

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

const initialState = {
    totalNum : 0,
    slides: [],
    pendding : false,
}




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
            pendding : false
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