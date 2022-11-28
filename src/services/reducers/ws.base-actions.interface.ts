import { ActionCreator } from 'redux';

export interface WsBaseActionsInterface {
  connectionStart: string;
  disconnect: string;
  connectionClosed: ActionCreator<any>;
  connectionError: ActionCreator<any>;
  connectionSuccess: ActionCreator<any>;
  getMessage: ActionCreator<any>;
}
