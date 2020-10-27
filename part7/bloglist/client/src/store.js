import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notification from './reducers/notificationReducer';
import user from './reducers/userReducer';

const reducer = combineReducers({ notification, user });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
