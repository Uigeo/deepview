import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

function getUser(input_id, input_pw){
    return axios.post('http://localhost:3001/users/login', {id : input_id, pw: input_pw});
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
    dispatch({
        tpye : LOGOUT
    });
}



const initialState = {
        "name": null,
        "userid": null,
        "pending" : false
};
   


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
        return {
            "name" : null,
            "userid" : null,
            "pending" : false
        }
    }
}, initialState)