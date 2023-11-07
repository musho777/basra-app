import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import { AutReducer } from './reducer/LoginReducer';
import { ConfirmCodeReducer } from './reducer/ConfirmCodeReducer';
import { StaticReducer } from './reducer/staticReducer';
import { GetUserReducer } from './reducer/getUserReducer';
import { UpdateUserInfoReducer } from './reducer/UpdateUserInfoReducer';
import { UpdatePhotoReducer } from './reducer/UpdatePhotoReducer';
import { GetStoryesReducer } from './reducer/getStoryesReducer';
import { GetBanersReducer } from './reducer/getBanersReducer';

const rootReducer = combineReducers({
    login: AutReducer,
    confirmCode: ConfirmCodeReducer,
    static: StaticReducer,
    getUser: GetUserReducer,
    updateUser: UpdateUserInfoReducer,
    updatePhoto: UpdatePhotoReducer,
    getStoryes: GetStoryesReducer,
    getBaner: GetBanersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
