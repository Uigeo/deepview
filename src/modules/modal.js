import { createAction, handleActions } from "redux-actions";


const SHOW = "modal/SHOW";
const HIDE = "modal/HIDE";
const CHANGE = "modal/CHANGE";

export const show = createAction(SHOW); // { mode, contact: {[id], name, phone, color} }
export const hide = createAction(HIDE);
export const change = slide => dispatch => {
  dispatch({
    type: CHANGE,
    payload: slide
  });
}; // { name, value }

const initialState = {
  visible: false,
  slide: {
    slideid: "",
    upload: null,
    hostpital: "",
    diagnosis: null,
    stain: "",
    imgpath: ""
  }
};

export default handleActions(
  {
    [SHOW]: (state, action) => {
      return {
        ...state,
        visible: true
      };
    },
    [HIDE]: (state, action) => {
      return {
        ...state,
        visible: false
      };
    },
    [CHANGE]: (state, action) => {
      return {
        ...state,
        slide: action.payload
      };
    }
  },
  initialState
);
