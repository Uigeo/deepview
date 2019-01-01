import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import {defineState, resetState} from 'redux-localstore';

function getUser(input_id, input_pw){
    return axios.post('http://localhost:3001/users/login', {id : input_id, pw: input_pw});
}

function logoutUser(){
    return axios.get('http://localhost:3001/users/logout');
}

const LOGIN_PENDING = 'user/LOGIN_PENDING';
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
const LOGOUT = 'user/LOGOUT';


export const login = (id, pw) => dispatch => {
    dispatch({type : LOGIN_PENDING});
    return getUser(id, pw).then(
        (response)=> {
            console.log(response.data.users);
            if(response.data.users.length !=0){
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload : response.data.users[0]
                });
            }else {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload : response.data.users[0]
                })
            }
        }
    ).catch( error=> {
        dispatch({
            type : LOGIN_FAILURE,
            payload: error
        });
    });
}

export const logout = () => dispatch => {
    console.log('Hello');
    logoutUser().then(
        response => {
            console.log(response);
            resetState();
            dispatch({
                type : LOGOUT
            });
        }
    ).catch(
        error => {
            console.log(error);
        }
    );
}

const defaultState = {
    "name": null,
    "userid": null,
    "pending" : false
}

const initialState = defineState(defaultState)('user');
   


export default handleActions({
    [LOGIN_PENDING] : (state, action) => {
        return {
            ...state,
            "pending" : true
        }
    },
    [LOGIN_SUCCESS] : (state, action) => {
        return {
            "name" : action.payload.name,
            "userid" : action.payload.userid,
            "pending" : false
        }
    },
    [LOGIN_FAILURE] : (state, action) => {
        return {
            "name" : null,
            "userid" : null,
            "pending" : false
        }
    },
    [LOGOUT] : (state, action) => {
        console.log('reducer');
        return {
            "name" : null,
            "userid" : null,
            "pending" : false
        }
    }
}, initialState)