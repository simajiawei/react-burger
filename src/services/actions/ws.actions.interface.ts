import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from './ws.actions';
import { Action } from 'redux';
import { OrdersResponseInterface } from '../../interfaces/responses/orders-response.interface';

export interface WsGetMessageInterface extends Action<typeof WS_GET_MESSAGE> {
  payload: OrdersResponseInterface;
}
export interface WsConnectionClosedInterface extends Action<typeof WS_CONNECTION_CLOSED> {}
export interface WsConnectionSuccessInterface extends Action<typeof WS_CONNECTION_SUCCESS> {}
export interface WsConnectionErrorInterface extends Action<typeof WS_CONNECTION_ERROR> {}
export interface WsConnectionStartInterface extends Action<typeof WS_CONNECTION_START> {
  url: string;
}

export type WsActions =
  | WsConnectionSuccessInterface
  | WsConnectionClosedInterface
  | WsConnectionErrorInterface
  | WsConnectionStartInterface
  | WsGetMessageInterface;
