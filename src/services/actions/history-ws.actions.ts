import { ActionCreator } from 'redux';
import {
  HistoryWsConnectionClosedInterface,
  HistoryWsConnectionDisconnectInterface,
  HistoryWsConnectionErrorInterface,
  HistoryWsConnectionStartInterface,
  HistoryWsConnectionSuccessInterface,
  HistoryWsGetMessageInterface
} from './history-ws.actions.interface';

export const HISTORY_WS_CONNECTION_START = 'HISTORY_WS_CONNECTION_START';
export const HISTORY_WS_CONNECTION_SUCCESS = 'HISTORY_WS_CONNECTION_SUCCESS';
export const HISTORY_WS_CONNECTION_ERROR = 'HISTORY_WS_CONNECTION_ERROR';
export const HISTORY_WS_CONNECTION_CLOSED = 'HISTORY_WS_CONNECTION_CLOSED';
export const HISTORY_WS_GET_MESSAGE = 'HISTORY_WS_GET_MESSAGE';
export const HISTORY_WS_DISCONNECT = 'HISTORY_WS_DISCONNECT';

export const historyWsConnectionDisconnect: ActionCreator<HistoryWsConnectionDisconnectInterface> = () => {
  return {
    type: HISTORY_WS_DISCONNECT
  };
};

export const historyWsConnectionStart: ActionCreator<HistoryWsConnectionStartInterface> = (url: string) => {
  return {
    type: HISTORY_WS_CONNECTION_START,
    url
  };
};

export const historyWsConnectionSuccess: ActionCreator<HistoryWsConnectionSuccessInterface> = () => {
  return {
    type: HISTORY_WS_CONNECTION_SUCCESS
  };
};

export const historyWsConnectionError: ActionCreator<HistoryWsConnectionErrorInterface> = () => {
  return {
    type: HISTORY_WS_CONNECTION_ERROR
  };
};

export const historyWsConnectionClosed: ActionCreator<HistoryWsConnectionClosedInterface> = () => {
  return {
    type: HISTORY_WS_CONNECTION_CLOSED
  };
};

export const historyWsGetMessage: ActionCreator<HistoryWsGetMessageInterface> = (message: string) => {
  return {
    type: HISTORY_WS_GET_MESSAGE,
    payload: JSON.parse(message)
  };
};
