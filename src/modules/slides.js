import { Map, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const CREATE = 'contact/CREATE';
const MODIFY = 'contact/MODIFY';
const REMOVE = 'contact/REMOVE';
const TOGGLE_FAVORITE = 'contact/TOGGLE_FAVORITE';

export const create = createAction(CREATE); 
export const modify = createAction(MODIFY); 
export const remove = createAction(REMOVE); 
export const toggleFavorite = createAction(TOGGLE_FAVORITE); 

const initialState = List([
    Map({
        "sname": 'AS-DOV12-2018',
        "upload": Date(2018,11,12),
        "hospital": "AS",
        "diagnosis": 4,
        "dying": 'A'
    }),
    Map({
        "sname": 'HY-AUG13-2016',
        "upload": Date(2016,8,13),
        "hospital": "HY",
        "diagnosis": 2,
        "dying": 'B'
    }),
    Map({
        "sname": 'KK-JUN13-2017',
        "upload": Date(2017,6,13),
        "hospital": "KK",
        "diagnosis": 4,
        "dying": 'D'
    }),
    Map({
        "sname": 'SS-SEP10-2016',
        "upload": Date(2016,9,10),
        "hospital": "SS",
        "diagnosis": 4,
        "dying": 'C'
    }),
    Map({
        "sname": 'KR-JAN23-2016',
        "upload": Date(2016,1,23),
        "hospital": "KR",
        "diagnosis": 5,
        "dying": 'B'
    }),
    Map({
        "sname": 'KR-FEB23-2017',
        "upload": Date(2017,2,23),
        "hospital": "KR",
        "diagnosis": 4,
        "dying": 'B'
    }),
    Map({
        "sname": 'KK-DEC25-2016',
        "upload": Date(2016,12,25),
        "hospital": "KR",
        "diagnosis": 3,
        "dying": 'A'
    }),
    Map({
        "sname": 'YS-FEB11-2018',
        "upload": Date(2018,2,11),
        "hospital": "KR",
        "diagnosis": 2,
        "dying": 'E'
    }),
]);




export default handleActions({
    [CREATE]: (state, action) => {
        return state.push(Map(action.payload));
    },
    [MODIFY]: (state, action) => {
        const index = state.findIndex(contact => contact.get('id') === action.payload.id);

        return state.mergeIn([index], action.payload.contact);
    },
    [REMOVE]: (state, action) => {
        const index = state.findIndex(contact => contact.get('id') === action.payload);

        return state.delete(index);
    },
    [TOGGLE_FAVORITE]: (state, action) => {
        const index = state.findIndex(contact => contact.get('id') === action.payload);
        return state.update(index, contact => contact.set('favorite', !contact.get('favorite')));
    }
}, initialState)