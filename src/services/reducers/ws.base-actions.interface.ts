import { ActionCreator } from 'redux';

export interface WsBaseActionsInterface {
  connectionStart: 'WS_CONNECTION_START';
  disconnect: 'WS_DISCONNECT';
  connectionClosed: ActionCreator<any>;
  connectionError: ActionCreator<any>;
  connectionSuccess: ActionCreator<any>;
  getMessage: ActionCreator<any>;
}
