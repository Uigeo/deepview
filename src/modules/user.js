import { handleActions } from "redux-actions";
import axios from "axios";
import { defineState, resetState } from "redux-localstore";

const host = "http://localhost:3001";

function getUser(input_id, input_pw) {
  axios.defaults.withCredentials = true;
  return axios.post(host + "/users/login", { id: input_id, pw: input_pw });
}

export const newUser = (input_id, input_pw, input_name) => {
  return axios.post(host + "/users/signup", {
    id: input_id,
    pw: input_pw,
    name: input_name
  });
};

function logoutUser() {
  return axios.get(host + "/users/logout");
}

const LOGIN_PENDING = "user/LOGIN_PENDING";
const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
const LOGIN_FAILURE = "user/LOGIN_FAILURE";
const SIGNUP_PENDING = "user/SIGNUP_PENDING";
const SIGNUP_SUCCESS = "user/SIGNUP_SUCCESS";
const SIGNUP_FAILURE = "user/SIGNUP_FAILURE";
const RESET_STATE = "user/RESET";
const LOGOUT = "user/LOGOUT";

export const signup = (id, pw, name) => dispatch => {
  dispatch({ type: SIGNUP_PENDING });
  return newUser(id, pw, name).then(response => {
    console.log(response.data);
    if (response.data.result === "success") {
      setTimeout(() => {
        dispatch({
          type: SIGNUP_SUCCESS
        });
      }, 1000);
    } else if (response.data.result === "fail") {
      dispatch({
        type: SIGNUP_FAILURE
      });
    }
  });
};

export const login = (id, pw) => dispatch => {
  dispatch({ type: LOGIN_PENDING });
  return getUser(id, pw)
    .then(response => {
      if (response.data.user !== null) {
        setTimeout(() => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.user
          });
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch({
            type: LOGIN_FAILURE,
            payload: { user: response.data.user, wrong: response.data.wrong }
          });
        }, 1000);
      }
    })
    .catch(error => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error
      });
    });
};

export const logout = () => dispatch => {
  logoutUser()
    .then(response => {
      console.log(response);
      resetState();
      dispatch({
        type: LOGOUT
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const stateReset = () => dispatch => {
  dispatch({
    type: RESET_STATE
  });
  resetState();
};

const defaultState = {
  name: null,
  userid: null,
  pending: false,
  wrong: 0,
  signupPedning: false,
  signupFail: false,
  signupSuccess: false
};

const initialState = defineState(defaultState)("user");

export default handleActions(
  {
    [LOGIN_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true
      };
    },
    [LOGIN_SUCCESS]: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        userid: action.payload.userid,
        pending: false,
        wrong: 0
      };
    },
    [LOGIN_FAILURE]: (state, action) => {
      return {
        ...state,
        name: null,
        userid: null,
        pending: false,
        wrong: action.payload.wrong
      };
    },
    [SIGNUP_PENDING]: (state, action) => {
      return {
        ...state,
        signupPending: true
      };
    },
    [SIGNUP_FAILURE]: (state, action) => {
      return {
        ...state,
        signupFail: true,
        signupPending: false
      };
    },
    [SIGNUP_SUCCESS]: (state, action) => {
      return {
        ...state,
        signupSuccess: true,
        signupPending: false
      };
    },
    [LOGOUT]: (state, action) => {
      return {
        ...state,
        name: null,
        userid: null,
        pending: false,
        wrong: 0
      };
    },
    [RESET_STATE]: (state, action) => {
      return defaultState;
    }
  },
  initialState
);
