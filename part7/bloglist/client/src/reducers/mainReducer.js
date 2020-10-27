import { combineReducers } from 'redux';

import notificationReducer from './notificationReducer';

const mainReducer = combineReducers({ notificationReducer });

export default mainReducer;
