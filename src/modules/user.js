
import {  handleActions } from 'redux-actions';
import axios from 'axios';
import {defineState, resetState} from 'redux-localstore';



function getUser(input_id, input_pw){
    axios.defaults.withCredentials =true;
    return axios.post('/users/login', {id : input_id, pw: input_pw});
}

function logoutUser(){
    return axios.get('/users/logout');
}

const LOGIN_PENDING = 'user/LOGIN_PENDING';
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
const LOGOUT = 'user/LOGOUT';


export const login = (id, pw) => dispatch => {
    dispatch({type : LOGIN_PENDING});
    return getUser(id, pw).then(
        (response)=> {
            console.log(response.data.user);
            if(response.data.user !== null){
                setTimeout( ()=> {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload : response.data.user})
                    }, 1000
                );
                
            }else {
                setTimeout( ()=>{
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload : { user : response.data.user , wrong : response.data.wrong  }
                    })
                } , 1000 );
                
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
    "pending" : false,
    "wrong" : 0
}

const initialState = defineState(defaultState)('user');
   


export default handleActions({
    [LOGIN_PENDING] : (state, action) => {
        return {
            ...state,
            "pending" : true,
        }
    },
    [LOGIN_SUCCESS] : (state, action) => {
        return {
            "name" : action.payload.name,
            "userid" : action.payload.userid,
            "pending" : false,
            "wrong" : 0
        }
    },
    [LOGIN_FAILURE] : (state, action) => {
        return {
            "name" : null,
            "userid" : null,
            "pending" : false,
            "wrong" : action.payload.wrong
        }
    },
    [LOGOUT] : (state, action) => {
        console.log('reducer');
        return {
            "name" : null,
            "userid" : null,
            "pending" : false,
            "wrong" : 0
        }
    }
}, initialState)