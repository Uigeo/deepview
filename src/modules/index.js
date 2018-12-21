import { combineReducers } from 'redux';

import base from './base';
import slides from './slides';
import modal from './modal';

export default combineReducers({
    base,
    slides,
    modal
});