import thunk, { ThunkAction } from 'redux-thunk';
import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from '../middleware/socket-middleware';
import { WsActions } from './actions/ws.actions.interface';
import {
  WS_CONNECTION_START,
  WS_DISCONNECT,
  wsConnectionClosed,
  wsConnectionDisconnect,
  wsConnectionError,
  wsConnectionStart,
  wsConnectionSuccess,
  wsGetMessage
} from './actions/ws.actions';
import { WsBaseActionsInterface } from './reducers/ws.base-actions.interface';

const wsActions: WsBaseActionsInterface = {
  connectionStart: WS_CONNECTION_START,
  disconnect: WS_DISCONNECT,
  connectionClosed: wsConnectionClosed,
  connectionError: wsConnectionError,
  connectionSuccess: wsConnectionSuccess,
  getMessage: wsGetMessage
};

const enhancer = applyMiddleware(thunk, socketMiddleware(wsActions));

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [enhancer]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
