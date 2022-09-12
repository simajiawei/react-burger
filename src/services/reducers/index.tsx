import { combineReducers } from 'redux';
import { burgerReducer, StoreInterface } from './burger.reducer';

export const rootReducer = combineReducers<StoreInterface>({
  burger: burgerReducer
});
