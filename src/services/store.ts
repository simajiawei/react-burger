import thunk, { ThunkAction } from 'redux-thunk';
import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from '../middleware/socket-middleware';

const enhancer = applyMiddleware(thunk, socketMiddleware());

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [enhancer]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
