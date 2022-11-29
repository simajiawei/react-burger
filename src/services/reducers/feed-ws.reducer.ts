import {
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_GET_MESSAGE
} from '../actions/feed-ws.actions';
import { FeedWsActions } from '../actions/feed-ws.actions.interface';
import { WsStateInterface } from './ws.state.interface';

const initialState: WsStateInterface = {
  wsConnected: false,
  orders: null
};

export const feedWsReducer = (state = initialState, action: FeedWsActions) => {
  switch (action.type) {
    case FEED_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case FEED_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case FEED_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case FEED_WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload
      };

    default:
      return state;
  }
};
