import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import { AutReducer } from './reducer/LoginReducer';
import { ConfirmCodeReducer } from './reducer/ConfirmCodeReducer';
import { StaticReducer } from './reducer/staticReducer';
import { GetUserReducer } from './reducer/getUserReducer';

const rootReducer = combineReducers({
    login: AutReducer,
    confirmCode: ConfirmCodeReducer,
    static: StaticReducer,
    getUser: GetUserReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
