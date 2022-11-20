import { ActionCreator } from 'redux';
import {
  WsConnectionClosedInterface,
  WsConnectionDisconnectInterface,
  WsConnectionErrorInterface,
  WsConnectionStartInterface,
  WsConnectionSuccessInterface,
  WsGetMessageInterface
} from './ws.actions.interface';

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_DISCONNECT = 'WS_DISCONNECT';

export const wsConnectionDisconnect: ActionCreator<WsConnectionDisconnectInterface> = () => {
  return {
    type: WS_DISCONNECT
  };
};

export const wsConnectionStart: ActionCreator<WsConnectionStartInterface> = (url: string) => {
  return {
    type: WS_CONNECTION_START,
    url
  };
};

export const wsConnectionSuccess: ActionCreator<WsConnectionSuccessInterface> = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError: ActionCreator<WsConnectionErrorInterface> = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed: ActionCreator<WsConnectionClosedInterface> = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage: ActionCreator<WsGetMessageInterface> = (message: string) => {
  return {
    type: WS_GET_MESSAGE,
    payload: JSON.parse(message)
  };
};
