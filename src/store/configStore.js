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
import { GetProductsReducer } from './reducer/GetProducetsReducer';
import { getSearchHistoryReducer } from './reducer/getSearchHistoryReducer';
import { GetProductByCategoryReducer } from './reducer/GetProductByCategoryReducer';
import { GetSinglProductReduer } from './reducer/getSinglPorductReducer';

const rootReducer = combineReducers({
    login: AutReducer,
    confirmCode: ConfirmCodeReducer,
    static: StaticReducer,
    getUser: GetUserReducer,
    updateUser: UpdateUserInfoReducer,
    updatePhoto: UpdatePhotoReducer,
    getStoryes: GetStoryesReducer,
    getBaner: GetBanersReducer,
    getProducets: GetProductsReducer,
    getSearchHistory: getSearchHistoryReducer,
    getPorductByCategoy: GetProductByCategoryReducer,
    getSinglProduct: GetSinglProductReduer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
