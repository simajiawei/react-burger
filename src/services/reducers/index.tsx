import { combineReducers } from 'redux';
import { burgerReducer } from './burger.reducer';
import { StoreInterface } from '../store.interface';
import { authReducer } from './auth.reducer';
import { feedWsReducer } from './feed-ws.reducer';
import { historyWsReducer } from './history-ws.reducer';

export const rootReducer = combineReducers<StoreInterface>({
  burger: burgerReducer,
  auth: authReducer,
  wsFeed: feedWsReducer,
  wsHistory: historyWsReducer
});
