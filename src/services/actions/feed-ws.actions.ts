import { ActionCreator } from 'redux';
import {
  FeedWsConnectionDisconnectInterface,
  FeedWsConnectionStartInterface,
  FeedWsConnectionSuccessInterface,
  FeedWsConnectionErrorInterface,
  FeedWsConnectionClosedInterface,
  FeedWsGetMessageInterface
} from './feed-ws.actions.interface';

export const FEED_WS_CONNECTION_START = 'FEED_WS_CONNECTION_START';
export const FEED_WS_CONNECTION_SUCCESS = 'FEED_WS_CONNECTION_SUCCESS';
export const FEED_WS_CONNECTION_ERROR = 'FEED_WS_CONNECTION_ERROR';
export const FEED_WS_CONNECTION_CLOSED = 'FEED_WS_CONNECTION_CLOSED';
export const FEED_WS_GET_MESSAGE = 'FEED_WS_GET_MESSAGE';
export const FEED_WS_DISCONNECT = 'FEED_WS_DISCONNECT';

export const feedWsConnectionDisconnect: ActionCreator<FeedWsConnectionDisconnectInterface> = () => {
  return {
    type: FEED_WS_DISCONNECT
  };
};

export const feedWsConnectionStart: ActionCreator<FeedWsConnectionStartInterface> = (url: string) => {
  return {
    type: FEED_WS_CONNECTION_START,
    url
  };
};

export const feedWsConnectionSuccess: ActionCreator<FeedWsConnectionSuccessInterface> = () => {
  return {
    type: FEED_WS_CONNECTION_SUCCESS
  };
};

export const feedWsConnectionError: ActionCreator<FeedWsConnectionErrorInterface> = () => {
  return {
    type: FEED_WS_CONNECTION_ERROR
  };
};

export const feedWsConnectionClosed: ActionCreator<FeedWsConnectionClosedInterface> = () => {
  return {
    type: FEED_WS_CONNECTION_CLOSED
  };
};

export const feedWsGetMessage: ActionCreator<FeedWsGetMessageInterface> = (message: string) => {
  return {
    type: FEED_WS_GET_MESSAGE,
    payload: JSON.parse(message)
  };
};
