import { combineReducers } from 'redux';

import base from './base';
import slide from './slides';
import modal from './modal';
import user from './user';

export default combineReducers({
    base,
    slide,
    modal,
    user
});