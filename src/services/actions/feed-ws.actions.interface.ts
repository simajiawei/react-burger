import {
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_DISCONNECT,
  FEED_WS_GET_MESSAGE
} from './feed-ws.actions';
import { Action } from 'redux';
import { OrdersResponseInterface } from '../../interfaces/responses/orders-response.interface';

export interface FeedWsGetMessageInterface extends Action<typeof FEED_WS_GET_MESSAGE> {
  payload: OrdersResponseInterface;
}
export interface FeedWsConnectionClosedInterface extends Action<typeof FEED_WS_CONNECTION_CLOSED> {}
export interface FeedWsConnectionSuccessInterface extends Action<typeof FEED_WS_CONNECTION_SUCCESS> {}
export interface FeedWsConnectionErrorInterface extends Action<typeof FEED_WS_CONNECTION_ERROR> {}
export interface FeedWsConnectionStartInterface extends Action<typeof FEED_WS_CONNECTION_START> {
  url: string;
}
export interface FeedWsConnectionDisconnectInterface extends Action<typeof FEED_WS_DISCONNECT> {}
export type FeedWsActions =
  | FeedWsConnectionSuccessInterface
  | FeedWsConnectionClosedInterface
  | FeedWsConnectionErrorInterface
  | FeedWsConnectionStartInterface
  | FeedWsGetMessageInterface
  | FeedWsConnectionDisconnectInterface;
