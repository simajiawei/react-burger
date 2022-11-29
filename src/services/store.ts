import thunk, { ThunkAction } from 'redux-thunk';
import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from '../middleware/socket-middleware';

import { WsBaseActionsInterface } from './reducers/ws.base-actions.interface';
import {
  FEED_WS_CONNECTION_START,
  FEED_WS_DISCONNECT,
  feedWsConnectionClosed,
  feedWsConnectionError,
  feedWsConnectionSuccess,
  feedWsGetMessage
} from './actions/feed-ws.actions';
import {
  HISTORY_WS_CONNECTION_START,
  HISTORY_WS_DISCONNECT,
  historyWsConnectionClosed,
  historyWsConnectionError,
  historyWsConnectionSuccess,
  historyWsGetMessage
} from './actions/history-ws.actions';

const wsFeedActions: WsBaseActionsInterface = {
  connectionStart: FEED_WS_CONNECTION_START,
  disconnect: FEED_WS_DISCONNECT,
  connectionClosed: feedWsConnectionClosed,
  connectionError: feedWsConnectionError,
  connectionSuccess: feedWsConnectionSuccess,
  getMessage: feedWsGetMessage
};

const wsHistoryActions: WsBaseActionsInterface = {
  connectionStart: HISTORY_WS_CONNECTION_START,
  disconnect: HISTORY_WS_DISCONNECT,
  connectionClosed: historyWsConnectionClosed,
  connectionError: historyWsConnectionError,
  connectionSuccess: historyWsConnectionSuccess,
  getMessage: historyWsGetMessage
};

const enhancer = applyMiddleware(thunk, socketMiddleware(wsFeedActions), socketMiddleware(wsHistoryActions));

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [enhancer]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
