import { combineReducers } from 'redux';
import { burgerReducer } from './burger.reducer';
import { StoreInterface } from '../store.interface';
import { authReducer } from './auth.reducer';
import { wsReducer } from './ws.reducer';

export const rootReducer = combineReducers<StoreInterface>({
  burger: burgerReducer,
  auth: authReducer,
  ws: wsReducer
});
