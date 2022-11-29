import { Action } from 'redux';
import { OrdersResponseInterface } from '../../interfaces/responses/orders-response.interface';
import {
  HISTORY_WS_CONNECTION_CLOSED,
  HISTORY_WS_CONNECTION_ERROR,
  HISTORY_WS_CONNECTION_START,
  HISTORY_WS_CONNECTION_SUCCESS,
  HISTORY_WS_DISCONNECT,
  HISTORY_WS_GET_MESSAGE
} from './history-ws.actions';

export interface HistoryWsGetMessageInterface extends Action<typeof HISTORY_WS_GET_MESSAGE> {
  payload: OrdersResponseInterface;
}
export interface HistoryWsConnectionClosedInterface extends Action<typeof HISTORY_WS_CONNECTION_CLOSED> {}
export interface HistoryWsConnectionSuccessInterface extends Action<typeof HISTORY_WS_CONNECTION_SUCCESS> {}
export interface HistoryWsConnectionErrorInterface extends Action<typeof HISTORY_WS_CONNECTION_ERROR> {}
export interface HistoryWsConnectionStartInterface extends Action<typeof HISTORY_WS_CONNECTION_START> {
  url: string;
}
export interface HistoryWsConnectionDisconnectInterface extends Action<typeof HISTORY_WS_DISCONNECT> {}
export type HistoryWsActions =
  | HistoryWsConnectionSuccessInterface
  | HistoryWsConnectionClosedInterface
  | HistoryWsConnectionErrorInterface
  | HistoryWsConnectionStartInterface
  | HistoryWsGetMessageInterface
  | HistoryWsConnectionDisconnectInterface;
